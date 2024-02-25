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

Reactive nodes are the backbone of Angular's signal implementation. They can act as producers, consumers, or both depending on the context. For example, consider the following:

```typescript
@Component({...})
export class UserComponent {
  // reactive node as producer only
  user = signal<User>(undefined);
  // reactive node as a consumer and producer
  fullname = computed(() => {
    if(!user()) return '';
    return `${user().firstName} ${user().lastName}`;
  })
  constructor() {
    // an effect is a reactive node as a consumer only
    effect(() => {
      console.log('user', this.user())
    })
  }
}
```

Reactive nodes are linked through a bidirected graph so that dependencies are tracked. For example, in the snippet above, both `fullname` and the effect depend on `user`. Assuming `user` and `fullname` signals are referenced in the component template, Angular's Logical View (or LView) will be represented in the dependency graph as a consumer-only reactive node.

[diagram here]

### Signals and Change Detection

Signals in Angular are an absolute game changer because of what they enable with change detection.

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
