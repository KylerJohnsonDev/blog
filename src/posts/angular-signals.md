---
title: 'Signals in Angular are a Game Changer'
image: ''
imageAlt: ''
date: '2024-02-18'
description: 'Signals in Angular are about more than reactivity. They are a total game changer for change detection and are already enabling things that were not possible before. Find out what and how here.'
published: false
tags: ['angular', 'signals', 'change detection']
---

`Angular v17.2`

### Why Signals

You've probably seen or heard the assertion that Angular needed a reactive primitive. But what does that actually mean? It means Angular needed an _Angular native_ implementation for reactivity that could track dependencies, provide synchronous access to the model, and notify Angular about model changes affecting individual components. It turns out, signals were the answer. Let's explore how they work in Angular.

### How Signals Work

Reactive nodes are the backbone of Angular's signal implementation. They can act as producers, consumers, or both depending on the context. To explore this concept, consider the following snippet:

```typescript
@Component({
  ...
  template: `
    @if(product()) {
      <h1>{{ product.name() }}</h1>
      <p>Total price: {{ product().price }}</p>
      <p>Adjusted total after discount: {{ discountedPrice() }} </p>
    } @else {
      Please select a product
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedProductComponent {
  // reactive node as producer only
  product = input.Required<Product>();
  // reactive node as a producer only
  discountMultiplier = input<number>(0) // ex. .15
  // reactive node as a consumer and producer
  discountedPrice = computed(() => {
    return (product().price * discountMultiplier()).toFixed();
  })

  constructor() {
    // an effect is a reactive node as a consumer only
    // its only use here is to log the value of the user signal when it changes
    effect(() => {
      console.log('product', this.product())
    })
  }
}
```

Reactive nodes are linked in a bidirected graph referred to as the dependency graph (or signal graph). This is how Angular knows what should be re-rendered when a signal is updated. For example, in the snippet above, `product` and `discountMultiplier` are producers, `discountedPrice` is a producer and a consumer, and `effect` is a consumer. Both `discountedPrice` and the effect depend on `product` and `discountedPrice` depends on both `product` and `discountMultiplier`. But there is another consumer that isn't explicity in the component and that's Angular's `Lview`, or "Logical View", which is part of the ivy rendering engine. It's responsible for holding references to the data the component needs in order to render the template. Because both `product` and `discountedPrice` signals are referenced in the template, the `LView` becomes a consumer on the graph.

See the diagram below for a visual representation of the depdendency graph:

[diagram here]

### Signals and Change Detection

Signals in Angular are an absolute game changer because of what they enable with change detection. In the example above, the `Lview` of the `SelectedProductComponent` is acting as a consumer, which means Angular knows precisely which components need to be rerendered when a signal is updated.

You might be thinking _'this seems logical. So What's the big deal?'_, right? To answer that question, we need take a look at how change detection worked (at least at a high level) in Angular prior to Signals. 

Before signals, Angular had no way of tracking which components needed to be updated as a result of a data change. Angular's change detection algorithm would "dirty check" the entire component tree looking for any components containing properties that have new references in memory. Any such components would be marked as "dirty" and would get rerendered on the next cycle. The `OnPush` change detection strategy improved that model by only checking input bindings, but Angular still has to dirty check the entire component tree. Even still, when an `OnPush` component is marked "dirty", every component above it in the component tree is marked "dirty" because Angular doesn't know which components depended on the data that changed.

Signals are the reactive primitive Angular needed to change all of that. With the `LView` of any components depending on signals tracked on the dependency graph, Angular knows exactly which components need to be rerendered. Future versions of Angular will not have to dirty check the entire component tree!

So that's great for future Angular versions, but why is everyone so hyped about signals right now? Excellent question. Let's explore. 

Earlier, I explained that even when an `OnPush` component is rerendered, every component above it in the component tree is rerendered. Signals change that. When the value of a signal changes, only components whose template depends on it are rerendered. This solves what I like to call The Smart Widget Problem.

- show screenshots of Jean Meche's CD demo
  [https://jeanmeche.github.io/angular-change-detection](Angular Change Detection Demo)

### The smart widget problem

Let's say we have a complex dashboard with many widgets containing graphs, charts, and other things of that nature. From a architecture/maintainability perspective, it makes sense for each widget to maintain its own state; however, this has always come with a performance cost in Angular. This is because even when all of those widgets and their sub-components use the `OnPush` change detection strategy, when any of them are marked dirty, all components above them in that branch of the component tree are marked dirty, which leads to unnecessary rerenders. If you have a complex, data-heavy UI, the performance hit could be significant.

In order to keep this architecture and optimize for change detection, we have two options:

1. Turn off automatic change detection in all of our widget components by injecting`ChangeDetectorRef` and calling `detach()` in the constructor. Then manually trigger change detection when needed. This has the potential to allow for granular change detection, but at a cost. This is obviously a lot of work, it can be tedious, and if you're not careful, you can end up with less optimal change detection than when you'd have by default. 

2. Keep automatic change detection, but have a massive top-level component responsive for managing the state for all of the widgets on the screen. In this architecture, all widget components and sub-components use the `OnPush` change detection strategy so they only rerender when their input bindings change. In my opinion, this is better than the first option, but its not without its own disadvantages. The top-level component often grows quite large and untenable, differentiating between similar types of state for each widget (like loading states) can be confusing, this approach often results in "prop drilling" (or passing state down multiple levels), and state/fetch logic living outside of the widget that depends on it just makes maintenance, onboarding, and consumption more difficult to grok.

### Signals Solve the Smart Widget Problem



### The Future of Signals in Angular

- show screeenshots from X conversations with Alex and Minko

### Signals vs RxJS is a false Dichotomy

### Sources

https://github.com/angular/angular/tree/main/packages/core/primitives/signals

https://github.com/angular/angular/blob/main/packages/core/src/render3/reactive_lview_consumer.ts

https://blog.angular.io/ivys-internal-data-structures-f410509c7480

https://github.com/angular/angular/discussions/49684

https://dev.to/this-is-learning/making-the-case-for-signals-in-javascript-4c7i
