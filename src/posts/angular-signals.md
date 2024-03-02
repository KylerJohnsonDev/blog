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

Reactive nodes are linked in a bidirected graph referred to as the dependency graph (or signal graph). This is how Angular knows what should be re-rendered when a signal is updated. For example, in the snippet above, `product` and `discountMultiplier` are producers, `discountedPrice` is a producer and a consumer, and `effect` is a consumer. Both `discountedPrice` and the effect depend on `product` and `discountedPrice` depends on both `product` and `discountMultiplier`. But there is another consumer that isn't explicity in the component and that's Angular's `Lview`, or "Logical View", which is part of the ivy rendering engine. It's responsible for holding the data the component needs in order to render the template. Because both `product` and `discountedPrice` signals are referenced in the template, the `LView` becomes a consumer.

See the diagram below for a visual representation of the depdendency graph:

[diagram here]

### Signals and Change Detection

Signals in Angular are an absolute game changer because of what they enable with change detection. In the example above, the `Lview` acting as a consumer means that Angular knows when the

### Signals in Action

- show screenshots of Jean Meche's CD demo
  [https://jeanmeche.github.io/angular-change-detection](Angular Change Detection Demo)

### The smart widget problem

### The Future of Signals in Angular

- show screeenshots from X conversations with Alex and Minko

### Signals vs RxJS is a false Dichotomy

### Sources

https://github.com/angular/angular/tree/main/packages/core/primitives/signals

https://github.com/angular/angular/blob/main/packages/core/src/render3/reactive_lview_consumer.ts

https://blog.angular.io/ivys-internal-data-structures-f410509c7480

https://github.com/angular/angular/discussions/49684

https://dev.to/this-is-learning/making-the-case-for-signals-in-javascript-4c7i
