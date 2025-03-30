---
title: Basic Reactive Patterns in Angular
date: '2020-05-14'
description: 'Examples and explanations of basic reactive patterns with RxJS'
published: true
tags: ['angular', 'rxjs']
imageUrl: '/post_images/basic-reactive-patterns/rx-patterns-header-img.webp'
imageAlt: 'Backlit keyboard - Reactive Patterns header'
ogType: 'article'
---

![Keyboard with Purple backlight](/post_images/basic-reactive-patterns/rx-patterns-header-img.webp)

```text
Angular version: 11 or later
RxJS versions: 7 or later
Node Version: 14 or later
```

_Updated for modern Angular/RxJS versions_

In order to write performant, maintainable Angular apps, RxJS knowledge is absolutely necessary. In this article, my goal is to help Angular developers leverage the reactive paradigm with RxJS in a clean, readable way by going over some common reactive patterns. This is not intended to be a comprehensive guide, but a foundation on which developers can continue to build their understanding.

We will take a look at the following real-world scenarios:

- Getting data from a service
- Reading route parameters and using them to fetch data from a service
- Managing multiple observable streams in a component

## Quick Note about Subscribing

Before we get into those scenarios, let's talk briefly about how we are going to subscribe to our observables. In general, if we explicitly subscribe using the `subscribe` function, we would then have to properly manage our subscriptions ourselves, which involves knowing when we need to subscribe/unsubscribe and writing the code to do it. Another thing to keep in mind is that even if we know how to properly manage these subscriptions, every developer working on our project may not. Instead, we're going to leverage the framework to do all of that for us by using the async pipe.

**Note**: While I don't recommend that you use inline templating in your Angular components, I'm going to do that here for the sake of brevity.

## Getting Data from a Service

Here, we will take a look at how to fetch data from a server and display it on the screen. We have a `fetchCoffeeList` function in our service that uses Angular's HttpClient to make a call to the server and wrap the response in an observable and returns it.

```typescript

// coffee.service.ts
@Injectable({
    ...
})
export default class CoffeeService {

    constructor(private httpClient: HttpClient) {}

    fetchCoffeeList(): Observable<Coffee[]> {
        const url = `coffee.com/coffee/list`;
        return this.httpClient.get<Coffee[]>(url);
    }

}

```

In the typescript file of our coffee component, we set our `coffees$` property equal to the result of our service call. Because we're returning an observable, our service call doesn't execute until it has a subscriber. When our `CoffeeComponent` initializes, the async pipe automatically subscribes to the `coffees$` observable. When the payload comes back from the server, the observable emits a new value containing the payload and our component renders the data. When the component is destroyed, the async pipe automatically unsubscribes from `coffees$`.

```typescript

// coffee.component.ts
@Component({
    selector: 'app-coffee',
    template: `
        <ng-container *ngIf="coffees$ | async as coffees">
            <ul>
                <li *ngFor="let coffee of coffees">{{ coffee.name }}</li>
            </ul>
        </ng-container>
    `
    ...
})
export default class CoffeeComponent {

    coffees$: Observable<Coffee[]> = this.coffeeService.fetchCoffeeList().pipe(
        catchError(err => {
            this.logger.error(err.message);
            this.router.navigate(['/error', err.message]);
            return of([]);
        })
    );

    constructor(
        private coffeeService: CoffeeService,
        private router: Router,
        private logger: Logger
    ) {}
}

```

_Note:_ `HttpClient` _request methods automatically complete for us when they get a response from the server so it wouldn't actually cause a memory leak if we didn't unsubscribe here; however, it's a good idea to be consistent in the way we subscribe across our app._

### Error Handling

In the snippet above, we are piping onto the observable we get back from the `fetchCoffeeList` method and inside of the pipe, we're using the `catchError` operator from RxJS to catch any errors that are thrown. We can think of it as a try/catch for our observable stream. `catchError` will catch any error that is thrown from the source observable or inside of any other operators in the pipe. For this example and the others, we're just going to log the error and navigate to an error page, passing the error message as a route parameter. For more about error handling, take look at this [article](https://blog.angular-university.io/rxjs-error-handling/) from Angular University.

## Using Route Parameters to Fetch Data

First, let's talk about the use case for this. Let's say we have a list of coffees displayed on the screen and we want to click on one and go to a "detail" page that shows the ingredients and nutritional info for that coffee. In this scenario, when a coffee is clicked, we pass the id of that coffee in as a parameter. The route configuration for our "detail" page would be setup to accept a parameter of `coffeeId`. When our `CoffeeDetailsComponent` initializes, we need to get the route parameter and fetch the coffee details by coffee id in order to display them. In this section, we're going to talk about how to do this reactively.

Following the pattern from the previous section, let's look at the service method first. Here, we simply have a service method that makes an API call to get the coffee details.

```typescript

// coffee-details.service.ts
@Injectable({
    ...
})
export default class CoffeeDetailsService {

    constructor(private httpClient: HttpClient) {}

    getByCoffeeId(coffeeId: number): Observable<CoffeeDetails> {
        const url = 'coffee.com/coffee/detail';
        const params = new HttpParams()
            .set('coffeeId', coffeeId.toString())

        return this.httpClient.get<CoffeeDetails>(url, { params });
    }

}

```

When the `CoffeeDetailsComponent` intializes, we susbscribe to the the `coffeeDetails$` observable using the async pipe, which gets its value from the results of the RxJS `pipe` method. The `pipe` method takes one or more [RxJS "pipeable operators"](https://rxjs.dev/guide/v6/pipeable-operators) in order to transform data. In our case, the `ParamMap` is passed by context into it and a `CoffeeDetails` object wrapped in an observable is the expected result.

So how can we start with a `ParamMap` and end up with an `Observable<CoffeeDetails>`? Well, we need a transformation to occur so we use a RxJS transformation operator called [switchMap](https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap). In the example below, we're getting our `coffeeId` from the map object by key, parsing it to a number type, and passing it into the service method that fetches coffee details. The `switchMap` operator will susbscribe to our service method and return the result. Because we know that the return value of our service method is `Observalbe<CoffeeDetails>`, we know that the return value of the `switchMap` operator is going to be `Observable<CoffeeDetails>`, too.

```typescript
@Component({
    selector: 'app-coffee-details',
    template: `
        <div *ngIf="coffeeDetails$ | async as details">
            <section class="nutrition-info>
                <p>{{ details.nutrition.totalCalories }}<p>
            </section>
            <section class="ingredients">
                <ul>
                    <li *ngFor="let ingredient of details.ingredients">
                        {{ ingredient }}
                    </li>
                </ul>
            </section>
        </div>
    `
    ...
})
export default class CoffeeDetailsComponent implements OnInit {

    coffeeDetails$: Observable<CoffeeDetails> = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
            const coffeeId = +params.get('coffeeId');
            return this.coffeeDetailsService.getByCoffeeId(coffeeId);
        }),
        catchError(err => {
            this.logger.error(err.message);
            this.router.navigate(['/error', err.message]);
            return of([]);
        })
    );

    constructor(
        private coffeeDetailsService: CoffeeDetailsService,
        private route: ActivatedRoute,
        private logger: Logger
    ) {}

}

```

_note: the_ `switchMap` _operator manages only one subscription at a time. When the source observable emits a new value, it cancels the previous inner observable (even if an HTTP request is in-flight) and creates a new observable and subscribes to it. This works perfectly for this use case because if the user clicks on another coffee before the detail view of this one loads, the previous request gets cancelled and it re-executes with the new route parameter. This can cause unexpected issues if used in certain situations, though. We don't want requests to be cancelled when we're doing things like database writes. For things like that concatMap would be a better choice._

## Managing Multiple Observable Streams

So what about when our component has to manage multiple observable streams? Subscribing to each observable individually, even with the async pipe, can can significantly impact performance. This is because each time one of the observable streams emit a new value, change detection fires to update the UI. We can solve this problem by using the [combineLatest](https://rxjs-dev.firebaseapp.com/api/index/function/combineLatest) operator to create a view model for our component template.

`combineLatest` belongs to a category of [RxJS operators](https://rxjs-dev.firebaseapp.com/guide/operators) known as the join creation operators, so-called because they take in mutiple source observables and create a single observable stream to output. You can think of single observable output as a view model for your component template. `combineLatest` is unique in that it doesn't emit its first value until all of its source observables have emitted at least one value. In other words, when we use this to combine multiple observables in our component, we don't attempt to render the UI until we have all the data it depends on. This means that change detection only has to fire once to initially render the component UI.

Let's take a look at some code:

```typescript

// coffee-sales.service.ts
@Injectable({
    ...
})
export default class CoffeeSalesService {

    constructor(private httpClient: HttpClient) {}

    fetchYearToDateSales(): Observable<SalesMetrics> {
        const url = `coffee.com/sales/ytd`;
        return this.httpClient.get<SalesMetrics>(url);
    }

    fetchTodaysSales(): Observable<SalesMetrics> {
        const url = `coffee.com/sales/today`;
        return this.httpClient.get<SalesMetrics>(url);
    }
}

```

```typescript

@Component({
    selector: 'app-coffee-sales',
    template: `
        <div *ngIf="vm$ | async as vm">
            <app-ytd-sales [yearToDateSales]="vm.yearToDateSales"></app-ytd-sales>
            <app-daily-sales [todaysSales]="vm.todaysSales"></app-daily-sales>
        </div>
    `
    ...
})
export default class CoffeeSalesComponent implements OnInit {

    vm$: Observable<CoffeeSalesViewModel> = combineLatest({
        yearToDateSales: this.salesService.fetchYearToDateSales(),
        todaysSales: this.salesService.fetchTodaysSales()
    }).pipe(
        catchError(err => {
            this.logger.error(err.message);
            this.router.navigate(['/error', err.message]);
            return of([]);
        })
    );

    constructor(
        private salesService: CoffeeSalesService,
        private logger: Logger
    ) {}

}

```

_Note: combineLatest takes in an array of observables and outputs a single observable containing an array of the latest emitted values of the source observables. Handling an array in the UI wouldn't be very readable so we use object destructuring to map that array to an object servicing as our view model._

So when our component initializes, we subscribe to our `vm$` property using the async pipe and `combineLatest` is executed. It takes an array of observables and outputs an observable containing an array of values. The first value in the array is the latest value from the first observable in the array of observables we passed into it (orderQueue) while the second value in the array corresponds to the second observable (todaysSales). Then, we pipe onto the result and use the RxJS `map` operator to transform our array into a view model object using [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) syntax.

Think about the file containing the component class (ex. coffee-sales.component.ts) as a "controller" class. Its sole responsibilty is to build the data structure the UI needs. Any data transformations/manipulations should happen here.

## Conclusion

My goal with this article is to provide a quick reference for some common reactive patterns to help Angular developers leverage the reactive paradigm and improve the performance and maintainability of their applications.

Key takeaways:

- Subscribe to your observables using the async pipe

- Use the `switchMap` operator when you only care about the action completing based on the latest value of the source observable

- Minimize change detection cycles on component initialization by using `combineLatest`

- Make use of pipeable operators like `map` to do any data transformation/manipulations inside of your component class
