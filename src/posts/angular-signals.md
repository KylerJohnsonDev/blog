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

You've probably seen or heard the assertion that Angular needed a reactive primitive. But what does that actually mean? It means Angular needed an _Angular native_ building block capable of tracking and notifying its consumers of change. Angular's Signal implementation accomplishes this by using an [Undirected Acyclic Graph (DAG)](https://www.geeksforgeeks.org/directed-acyclic-graph-in-compiler-design-with-examples/), in which each node is the computed output of its predecessor. When the output of a node changes, all of its descendents are recalculated. While this explanation teeters on the edge of over-simplification, it is enough for us

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

https://github.com/angular/angular/tree/main/packages/core/primitives/signals

https://dev.to/this-is-learning/making-the-case-for-signals-in-javascript-4c7i
