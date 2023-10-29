---
title: 'Refactoring NgRx in 2022'
date: '2022-11-11'
description: "New APIs are availabe to make your NgRx implementation more readable with far less code. Let's refactor an existing feature store using these new APIs to see the difference!"
published: true
tags: ['angular', 'ngrx']
---

## Refactoring NgRx in 2022

NgRx version 14 introduced the [createActionGroup](https://ngrx.io/api/store/createActionGroup) API and a lot of people are excited about it. With this addition, NgRx actions are much easier to write and the format is far more readable. At a glance, you can see what actions affect a slice of state and their event sources.

While I've seen a ton of hype around `createActionGroup`, I haven't seen much about the [createFeature](https://ngrx.io/api/store/createFeature) API. First introduced in version 12, the `createFeature`API simplifies the creation and registration of your reducer, but it also generates selectors for your feature and every property on the state object. When these two APIs are used together, it makes for a cleaner, far more concise NgRx implementation.

### Why refactor?

You might ask why you should refactor working NgRx code. It's a fair question and the short answer is that you don't have to, of course. However, these new APIs improve readability and dramatically reduce the amount of code you have to write. In other words, your NgRx implementation becomes easier to understand and easier to maintain. I've refactored several feature stores now and the consensus among "codeowners" is that it was well worth the effort.

To see this in action, let's refactor a relatively simple feature store implemenation to take advantage of these new APIs.

```typescript
// ACTIONS
const loadBooks = createAction("[Books Page] fetch books");
const loadBooksSuccess = createAction(
  "[Books Page] fetch books success",
  props<{ books: Book[] }>()
);
const loadBooksError = createAction(
  "[Books Page] fetch books failure",
  props<{ errorMessage: string }>()
);

const loadBookById = createAction("[Books Details Panel] fetch book by id", props<{ id: string }>());
const loadBookByIdSuccess = createAction(
  "[Book Details Panel] fetch book by id success",
  props<{ books: Book }>()
);
const loadBookByIdError = createAction(
  "[Book Details Panel] fetch book by id failure",
  props<{ errorMessage: string }>()
);

const editBookDetails = createAction(
  "[Books Details Panel] edit book details",
  props<{ book: Book }>()
);
const editBookDetailsSuccess = createAction(
  "[Book Details Panel] edit book details success",
  props<{ update: Update<Book> }>()
);
const editBookDetailsError = createAction(
  "[Book Details Panel] edit book details error",
  props<{ errorMessage: string }>()
);

export const fromBooksActions = {
  loadBooks,
  loadBooksSuccess,
  loadBooksError,
  editBookDetails,
  editBookDetailsSuccess,
  editBookDetailsError,
};

// Reducers
export const BOOKS_FEATURE_KEY = `books`;

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

const initialState: BooksState = adapter.getInitialState({
  loading: false,
  error: null,
  selectedBookId: null;
});

export const booksReducer = createReducer(
  initialState,
  on(loadBooks, (state) => ({ ...state, loading: true })),
  on(loadBooksSuccess, (state, { books }) => {
    return adapter.setMany(books, { ...state, loading: false, error: null })
  }),
  on(loadBooksError, (state, { errorMessage }) => ({ ...state, loading: false, error: errorMessage })),
  on(loadBooksById, (state) => ({ ...state, loading: true })),
  on(loadBooksByIdSuccess, (state, { book }) => {
    return adapter.upsertOne(book, { ...state, loading: false, error: null })
  }),
  on(loadBooksByIdError, (state, { errorMessage }) => ({ ...state, loading: false, error: errorMessage })),
  on(editBookDetails, (state) => ({ ...state, loading: true })),
  on(editBookDetailsSuccess, (state, { update }) => {
    return adapter.updateOne(update, { ...state, loading: false, error: null })
  }),
  on(editBookDetailsError, (state, { errorMessage }) => ({ ...state, loading: false, error: errorMessage }))
);

// Selectors
const booksFeature = createFeatureSelector<BooksState>(BOOKS_FEATURE_KEY);
const selectLoading = createSelector(
  booksFeature,
  (state: BooksState) => state.loading
);
const selectError = createSelector(
  booksFeature,
  (state: BooksState) => state.error
);
const selectBooks = createSelector(
  booksFeature,
  (state: BooksState) => state.books
);
const selectSelectedBookId = createSelector(
  booksFeature,
  (state: BooksState) => state.selectedBookId
)

const { selectAll } = adapter.getSelectors();
export const fromBooksSelectors = {
  selectBooks: selectAll,
  selectLoading,
  selectError,
  selectBooks,
  selectSelectedBookId
};
```

While the helper functions `createAction`, `createReducer`, and `createSelector` helped a lot with reducing the verbosity of NgRx, it was clear that there was still a fair amount of work involved with setting it up.

Now let's take a look at what that looks like using the new APIs:

```typescript
// ACTIONS
const booksPageActions = createActionGroup({
  source: `Books Page`,
  events: {
    'load books': emptyProps(),
    'load books success': props<{ books: Book[] }>(),
    'load books error': props<{ errorMessage: string }>(),
  },
})

const bookDetailsPanelActions = createActionGroup({
  source: `Book Details Panel`,
  events: {
    'load book by id': props<{ id: string }>(),
    'load book by id success': props<{ book: Book }>(),
    'load book by id error': props<{ errorMessage: string }>(),
    'edit book details': props<{ book: Book }>(),
    'edit book details success': props<{ update: Update<Book> }>(),
    'edit book details error': props<{ errorMessage: string }>(),
  },
})

export const fromBooksActions = { ...booksPageActions, ...bookDetailsPanelActions };

// Reducers
export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

const initialState: BooksState = adapter.getInitialState({
  loading: false,
  error: null,
  selectedBookId: null;
});

export const booksFeature = createFeature({
  name: 'books',
  reducer: createReducer(
    initialState,
    on(loadBooks, (state) => ({ ...state, loading: true })),
    on(loadBooksSuccess, (state, { books }) => {
      return adapter.setMany(books, { ...state, loading: false, error: null })
    }),
    on(loadBooksError, (state, { errorMessage }) => ({ ...state, loading: false, error: errorMessage })),
    on(loadBooksById, (state) => ({ ...state, loading: true })),
    on(loadBooksByIdSuccess, (state, { book }) => {
      return adapter.upsertOne(book, { ...state, loading: false, error: null })
    }),
    on(loadBooksByIdError, (state, { errorMessage }) => ({ ...state, loading: false, error: errorMessage })),
    on(editBookDetails, (state) => ({ ...state, loading: true })),
    on(editBookDetailsSuccess, (state, { update }) => {
      return adapter.updateOne(update, { ...state, loading: false, error: null })
    }),
    on(editBookDetailsError, (state, { errorMessage }) => ({ ...state, loading: false, error: errorMessage }))
  ),
})

const { selectAll } = adapter.getSelectors();
const { selectIsLoading, selectError, selectSelectedBookId } = booksFeature;
export const fromBooksSelectors = {
  selectBooks: selectAll,
  selectIsLoading,
  selectError,
  selectSelectedBookId
}
```

The original implementation in the first snippet was 100 lines of code. The refactored implementation in the second snippet is only 62 lines of code, which is a 38% decrease in verbosity. I'm seeing similar (and in some cases even larger) differences in production code as well.

** Note: I realize that I could get access to the selectors in my feature components through the exported `booksFeature` object, but that would provide easy access to the reducer from the component and I don't want to do that. So I'm re-exporting the selectors wrapped in an object. **

### Conclusion

In my opinion, `createActionGroup` improves readability for action creation. With this in place, it's much easier to see quickly what actions are handled by a slice of state and what their event sources are.

For a more complete, deeper explanation of these new APIs and how to register them with the [Angular Standalone Components API](https://angular.io/guide/standalone-components), take a look at [You Should Take Advantage of the Improved NgRx APIs](https://timdeschryver.dev/blog/you-should-take-advantage-of-the-improved-ngrx-apis) from NgRx team member Tim Deschryver.
