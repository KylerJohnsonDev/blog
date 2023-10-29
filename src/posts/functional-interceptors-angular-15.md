---
title: 'Functional Interceptors in Angular 15'
date: '2022-11-16'
description: 'Angular v15 brings with it a new, functional way to write interceptors and register them in your standalone Angular application. This brief article shows you how.'
published: true
tags: ['angular']
---

## Functional Interceptors in Angular 15

With the v15 release of Angular expected in mid-November, the [standalone component API](https://angular.io/guide/standalone-components) will finally be considered stable. There will not be any breaking changes, as you can use standalone components, directives, and pipes in your module-based apps. No need to go and refactor all of your existing code.

However, if you choose to go with a standalone angular application (meaning you bootstrap your app without an AppModule), there will be some differences. You will need to use the new `provideHttpClient` API to register the `HttpClient` provider. To use interceptors with this setup, you will need to pass in the `withInterceptors` option including any interceptors.

```typescript
// main.ts

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([sportsApiInterceptor]))],
}).catch((err) => console.error(err))
```

Great! So now that you know how to register your interceptors in a standalone Angular application, it's probably time to mention that the class-based interceptors you're accustomed to will not work here. Instead, we need to define functional interceptors like so:

```typescript
// interceptors.ts

export const sportsApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api.sportsdata.io')) {
    const url = `${req.url}?key=${API_KEY}`
    const newReq = req.clone({ url })
    return next(newReq)
  }
  return next(req)
}
```
