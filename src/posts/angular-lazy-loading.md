---
title: Why & How to Lazy Load in Angular
imageUrl: '/static/tiger.webp'
imageAlt: 'Lazy Tiger'
date: '2019-02-10'
description: 'From why we need it to how we do it - Lazy Loading in Angular 8+'
published: true
tags: ['Angular']
---

![Lazy Tiger](/static/images/lazy-loading/tiger.webp)

```
Angular version: 8.x
Node Version: 10.9 or later
```

Picture it. You have to find the perfect last minute gift so you open a new tab and do a quick Google search. You get the results and you pick the first promising link on the page. 1…2…3 seconds go by and the web page is just loading so what do you do? You click the “back” button on your browser and select the next promising link. Well, you’re not alone. Your first impression of the website was that it was slow and first impressions matter.

In [Google’s Site Performance for Webmasters video](https://www.youtube.com/watch?v=OpMfx_Zie2g&feature=youtu.be) way back in 2010, Maile Ohye says, “2 seconds is the threshold for e-commerce website acceptability.” In other words that’s when web users start clicking the “back” button just like you did. What if you are “on the go” and you were using your mobile phone? Statistics show that more than half of the web traffic in 2018 was from a mobile device, after all. According to [research](https://think.storage.googleapis.com/docs/mobile-page-speed-new-industry-benchmarks.pdf) from Google, 53% of mobile site visitors leave a page that takes longer than three seconds to load.

So you're probably like, "Kyler, that's cool and all, but what does it have to with lazy-loading?" Well, lazy-loading can help eliminate these concerns.

## What is it?

Now that we know why lazy loading is important, what exactly is it? In the context of Angular, lazy loading is a design pattern used to defer the initialization of modules until they are needed. It is a great strategy to reduce the time to interactive (TTI) of a single page application (SPA) and thereby provide a better user experience. TTI is a metric developed by Google that measures the amount of time between the point at which the page elements have loaded and the point at which those elements become interactive (usable).

## How it Works

When a user navigates to a webpage that implements lazy loading, a request is made to the host server and all of the packets, or chunks, are sent in response and stored in the browser cache, lazy loaded modules included. Then, with the exception of the lazy loaded modules, the packets are assembled, parsed, and loaded, rendering the page. When lazy loaded content is needed to render the page, the browser makes a request to the browser cache for the necessary module and loads it.

## How to Implement it

So how do you implement it? At a high level, you configure a parent route pointing to each feature module in your root module. Then, inside of each lazy loaded feature module, you associate child routes with components you want to render when the module is loaded. When one of them is needed, the Angular router loads it. To stay on track, I am only going to talk about the Angular router as it applies to lazy loading, but if you want to learn more about how it works, here’s a great [post](https://blog.angularindepth.com/the-three-pillars-of-angular-routing-angular-router-series-introduction-fb34e4e8758e) from Nate Lapinski, a writer for [Angular In Depth](https://indepth.dev/angular/).

## Sample Project with Eager-loaded Modules

You can find the code I will be referencing in the [ng-lazy-loading-demo](https://github.com/KylerJohnsonDev/ng-lazy-loading-demo) repo on Github. In the master branch, you will find a CLI generated Angular app with a few added components. If you install the dependencies and run it, you will find a basic home page with some nav links at the top for a “Products” view and “Profile” view. Lazy loading has not been implemented yet, but let’s take a closer look so we can see how the architecture changes when it is implemented.

First, let’s take a look at the file structure. As you will see in the image below, three modules have been generated in the app folder, a core module and two feature modules. The core module contains two components, the nav component and the home component, while the profile module contains the profile component and the product module contains the product component. All three modules are exporting the components they contain.

```
src/
└── app/
    ├── core/
    ├── product/
    ├── profile/
    ├── app-routing.module.ts
    ├── app.component.css
    ├── app.component.html
    ├── app.component.spec.ts
    ├── app.component.ts
    └── app.module.ts
```

Next, let’s take a look at the app.module.ts file to find out how our components are loaded. By convention, the core module is imported into the root module, but as we can see in the gist below, the `ProfileModule` and the `ProductModule` are, too, which means that they will all be loaded when the app initializes. In other words, they are all eager loaded — the opposite of lazy loaded.

```typescript
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ProfileModule } from './profile/profile.module'
import { ProductModule } from './product/product.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ProfileModule,
    ProductModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Let’s also take a look at the app-routing.module.ts file so that we understand how the router state is defined based on the path, determining which component is rendered. As shown in the gist below, we have three URLs defined — these make up the router state configuration. This is how the Angular router is able to associate a URL with a component. When navigation occurs, the Angular router compares the URL with the path defined in the router state configuration. When it finds a matching URL, it renders the component associated with it. For example, navigating to `http://localhost:4200/product` renders the product component.

## Sample Project with Lazy-loaded Modules

Now, if we checkout the `feature/lazy_loaded branch`, run it, open the network tab of the Chrome Dev Tools, and refresh the page we will see the same number of requests to load the page. Because the product module is lazy loaded, we can observe in the GIF below that the product-product-module.js packet is loaded in response to another request when we navigate to the products page. The same occurs when navigating to the profile page.

![Snapshot of Dev tools loading a module](/static/images/lazy-loading/lazy-loaded-module-in-dev-tools.gif)

So what changes were made to our app in the `feature/lazy_loaded branch` to lazy load the product and profile modules?

First, let’s take a look at the `app.module.ts` file below. Notice that the `ProductComponent` and the `ProfileComponent` are no longer imported into the root module or included in the `declarations` array. This is because we do not want our app to load them until it needs them. If they were imported here, the product and profile modules and their components and services would be loaded when our app initializes no mater what we do.

```typescript
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Next, let’s take a look at the app-routing.module.ts file below. You will find that the route configurations have changed. Instead of associating the URL with a component to render, the URL is associated with a module to load.

```typescript
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './core/home/home.component'

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

The route configurations in the gist above are generally referred to as parent routes. As previously mentioned, the Angular router looks for a route configuration that matches the URL, then loads the associated feature module. Each feature module will have its own route configurations, which are referred to as child routes, and are generally defined in a file named `[module-name]-routing.module.ts` by convention.

Let’s look at an example. If we run the app and navigate to `http://localhost:4200/profile`, the Angular router will search for matches in the app-routing.module.ts file and find the following route configuration, associating it with the profile module.

```typescript
{
  path: 'profile',
  loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
},
```

When the profile module is loaded, the router will compare the URL with the child route configurations defined in the `profile-routing.module.ts` file. It understands that these are child routes because when the instance of the `RouterModule` is created and imported, it passes the `routes` array into the `.forChild()` method. As you can see in the gist below, there is only one route configuration, but we could define as many as needed here.

```typescript
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [{ path: '', component: ProfileComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
```

Since there is nothing in the URL after ‘profile’, the router matches it with the empty child route in the gist above. This route configuration may look much more familiar to you, as the URL is associated with the `ProfileComponent`, which will be rendered when the module is finished loading.

## Conclusion

In conclusion, lazy loading is one way for developers to decrease the TTI, improve the user experience, and reduce the bounce rate of their applications. There are 3 things I hope you can take away from this post:

1. As Deborah Kurata so concisely articulated it in her [talk](https://www.youtube.com/watch?v=ntJ-P-Cvo7o) from Ng-Conf 2017, there are three things you need to do in order to implement lazy loading in your application: use feature modules, group routes under a single parent, and do not import the feature modules into any other module.

2. Lazy loading does not decrease the overall size of your app; it decreases the number of packets, or chunks, that must be loaded before the initial page becomes usable.

3. Your entire application is still retrieved from the server before it is initially rendered and stored in the browser cache; however, Lazy loaded modules are not loaded initially. When they are needed, the browser makes a request to the browser cache to retrieve them.
