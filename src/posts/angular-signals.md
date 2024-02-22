---
title: 'Angular Signals are about More than Reactivity'
image: ''
imageAlt: ''
date: '2024-02-18'
description: 'Signals in Angular are about more than reactivity. They are a total game changer for change detection and are already enabling things that were not possible before. Find out what and how here.'
published: false
tags: ['angular']
---

Note: As of Angular 17.2

### Why Signals

You've probably seen or heard the assertion that Angular needed a reactive primitive. But what does that actually mean? It means Angular needed an _Angular native_ building block capable of notifying the framework what to re-render and when. A Signal implementation accomplishes this by using a [Directed Acyclic Graph (DAG)](https://www.geeksforgeeks.org/directed-acyclic-graph-in-compiler-design-with-examples/), a tree-like data structure where each node is the computed output of its predecessor. When one value changes, its successors are recalculated. The DAG structure allows for efficient common subexpression elimination, meaning that duplicate outputs can be efficiently eliminated, resulting in faster computations and a smaller memory footprint. It's worth noting that this is an over-simplified explanation, but it's enough to help us establish a mental model for Signals.

### Signals and Change Detection

- should explain how change detection works

### Signals in Action

- show screenshots of Jean Meche's CD demo
  [https://jeanmeche.github.io/angular-change-detection](Angular Change Detection Demo)

### The smart widget problem

### The Future of Signals in Angular

- show screeenshots from X conversations with Alex and Minko

### Signals vs RxJS is a false Dichotomy

### Sources

https://dev.to/this-is-learning/making-the-case-for-signals-in-javascript-4c7i
