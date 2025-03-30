---
title: A Practical Approach to Angular Attribute Directives
imageUrl: '/post_images/attribute-directives/roadsigns.webp'
imageAlt: 'Road Signs'
date: '2019-03-03'
description: 'Learn what attribute directives are and how you can use them'
published: true
tags: ['angular']
ogType: 'article'
---

![Road Signs](/post_images/attribute-directives/roadsigns.webp)

```text
Angular version: 8.x
Node Version: 10.9 or later
```

You’re working on an Angular app trying to add an interactive UI element like a simple dropdown menu. You have twenty browser tabs open and you’re trying to learn the “Angular way” of doing it. You want to follow best practices, but your frustration level is rising and you find yourself thinking why is it so difficult to do something that would have taken 10 minutes with Jquery and Bootstrap. Sound familiar? If it does, you’ve come to the right place.

Don’t sweat it— you’ve got this! It’s actually the perfect use case for a custom attribute directive and I will cover everything you need to know in order to implement your own in minutes. Let’s dive in!

## What It Is

Attribute directives change the appearance or behavior of an element, component, or another directive. Essentially, it is a class annotated with the Directive decorator where you specify what change you want to occur and what CSS event (if any) you want to trigger that change. `ngClass`, `ngStyle`, and `ngModel` are examples of attribute directives built-in to the Angular framework.

## When to Use It

You would use an attribute directive anytime you want logic or events to change the appearance or behavior of the view. Dropdowns, accordions, and tabs are just a few common use cases for custom attribute directives. When you have a UI element that will be common throughout your app, you can implement an attribute directive and share it across components and modules to avoid repeating the code for the same functionality.

## Getting Started

Before I get into how attribute directives work, I need to explain a few things. In order for attribute directives to accomplish what we want them to accomplish, they need to be able to access and modify DOM elements. There are three ways to accomplish this in an Angular directive:

1. ElementRef
2. Renderer
3. HostBinding (This should be your default)

I will show you examples of a dropdown menu that uses each one of these methods as I explain how they work. The HTML and CSS in each example will be exactly the same. Only the code in the Dropdown class will change from example to example.

The HTML:

```html
<div class="wrapper">
	<button appDropdown class="dropdown-btn" type="button">Menu</button>

	<div class="dropdown">
		<a href="https://medium.com/@kylerjohnsondev" class="dropdown-item">Find me on Medium</a>
		<a href="https://twitter.com/KylerJohnsondev" class="dropdown-item">Find me on Twitter</a>
		<a href="https://github.com/KylerJohnsondev" class="dropdown-item">Find me on Github</a>
	</div>
</div>
```

The CSS:

```css
.dropdown-btn {
	background: #0288d1;
	border: 1px solid #0288d1;
	border-radius: 0.25em;
	color: white;
	cursor: pointer;
	font-size: 1.5em;
	outline: 0;
}

.dropdown {
	background-color: #0288d1;
	border: none;
	border-radius: 0 0.25em 0.25em 0.25em;
	display: none;
	width: 40%;
}

.dropdown-item {
	color: white;
	border-bottom: 1px solid white;
	display: block;
	padding: 0.5em 0;
	text-align: center;
	text-decoration: none;
}

.dropdown-item:first-child {
	border-top: 1px solid white;
	border-radius: 0 0.25em 0 0;
}

.dropdown-item:last-child {
	border-radius: 0 0 0.25em 0.25em;
}

.dropdown-item:hover {
	background-color: magenta;
}

/*
 Below is the only CSS necessary to make this example work. The dropdown directive will add or remove the .open class when the click event is emitted.

 Note: By default, the display property of an element with the .dropdown class is set to none. When the dropdown directive applies the .open class to the dropdown button, the below CSS will set the display property of the sibling div with a class of .dropdown to block, making it visible.
*/

.open {
	border-radius: 0.25em 0.25em 0 0;
}

.open + .dropdown {
	display: block;
}
```

The dropdown directive will add or remove the open class to the button element when the click event is emitted. The button class has a sibling div containing the dropdown links with a class of `dropdown`. By default, the display property of the dropdown div is set to none. When the dropdown directive applies the `open` class to the dropdown button, the `display` property of the dropdown div is set to `block` further down in the cascade, making it visible. With this setup, adding and removing the `open` class will be how we display or hide the dropdown list.

## Attribute Directive using ElementRef

In this section, we will look at a dropdown directive implementation using ElementRef. You can find the example to which I will refer on Stackblitz [here](https://stackblitz.com/edit/ng-attribute-directive-elementref-feb-2019).

In this example, this is how our dropdown directive looks:

```typescript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {
	constructor(private elRef: ElementRef) {}

	@HostListener('click') toggleDropdown() {
		const buttonEl = this.elRef.nativeElement;
		const isOpen = buttonEl.classList.contains('open');
		buttonEl.classList.toggle('open', !isOpen);
	}
}
```

We have an attribute directive, `aDropdownDirective` class annotated with the `Directive` decorator. Generally, decorators in Angular contain metadata the compiler needs to understand how a class should be processed, instantiated, and used at runtime. The only property required by a directive is the `selector` property.

## How to use the Dropdown Directive

First, we need to import it into our module by adding it to the declarations array. Then we use the dropdown directive by placing the value of the `selector` property on the desired HTML element as if it were an attribute. In our case, it is `appDropdown`.

You can set the `selector` property to whatever you want, but by convention, it is the name of your class prefixed with something relevant to your project. The reason for the prefix is to help avoid collisions with standard HTML attributes and other directives used by any 3rd-party libraries you may be importing.

## How it Works

When the template parser reaches the button element on which we placed our `appDropdown` directive, the Angular compiler searches for a directive with a selector set to `appDropdown` and instantiates the class associated with it: The `DropdownDirective` class.

In order to add and remove the `open` class and make our directive function, we need to access the button element on which we placed our directive. We can accomplish that by passing an object of type `ElementRef` into the constructor of our directive. The Angular compiler understands that we want a reference to the host element injected into our directive and assigned to the `elRef` property. In this example, the host element is the button element because it is the element on which our dropdown directive is placed.

The `HostListener` decorator allows us to specify what CSS event we want to listen for on the host element (our button element) and the function we want to execute when that event is emitted. In this example, the `toggleDropdown` function will be executed when a user clicks on the button element.

In terms of Jquery, think of the `HostListener` as the event method (think `.click()`) and the `toggleDropdown` function as the callback you want to execute when the event is triggered.

You might be thinking _The HostListener is weird. Can’t I just attach an event listener manually?_ The short answer is _Not Safely_. The `HostListener` decorator solves some really important problems for you. In the [Angular Docs](https://angular.io/guide/attribute-directives), you will find the following excerpt:

> Of course you could reach into the DOM with standard JavaScript and attach
> event listeners manually. There are at least three problems with that approach:
>
> 1. You have to write listeners correctly.
>
> 2. The code must detach the the listener when the directive is destroyed to avoid
>    memory leaks.
>
> 3. Talking to DOM API directly isn't a best practice

Now, let’s take a look at what is happening inside of the `toggleClass` function. We get the DOM representation of the button element from the `nativeElement` property the same as if we were to use a Jquery element selector. If the `classList` DOM property contains the `open` class, `isOpen` is true and the `toggle` method removes the `open` class and closes the dropdown. Likewise, if the open class is not found in the `classList`, `isOpen` is false and the toggle method adds the `open` class and opens the dropdown.

Remember when we we decided earlier that we should use the `HostListener` decorator because it is not a good idea to access the DOM directly? Using `ElementRef` to access the DOM and manipulate it is doing just that. Permitting direct access to the DOM like this can make your app more vulnerable to XSS attacks. For information, check out the [Angular security guide](https://angular.io/guide/security).

In addition, this method of manipulating the DOM tightly couples the DOM and the rendering layer. This is problematic if you ever want to use web/service workers, as they cannot directly access the DOM. Luckily, there is an alternative method out there which leads me to the second way to implement the dropdown attribute directive.

## Attribute Directive using Renderer2

The [Renderer2](https://angular.io/api/core/Renderer2) API offers a way to bypass Angular’s templating and make custom UI changes that can’t be expressed declaratively. That means that web and service workers can safely use this method. You can find this example on Stackblitz [here](https://stackblitz.com/edit/ng-attribute-directive-renderer2-feb-2019).

Let’s take a look at what our `dropdown.directive.ts` file looks like now.

```typescript
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {
	constructor(private elRef: ElementRef, private renderer: Renderer2) {}

	@HostListener('click') toggleDropdown() {
		const buttonEl = this.elRef.nativeElement;
		const isOpen = buttonEl.classList.contains('open');

		if (isOpen) {
			this.renderer.removeClass(buttonEl, 'open');
		} else {
			this.renderer.addClass(buttonEl, 'open');
		}
	}
}
```

Note that we still inject the `ElementRef` to get the reference to the host element; however, we inject the `Renderer2` in order to make changes to the view.

Like in the previous example, we get the `isOpen` boolean value by checking to see if the `classList` property contains the `open` class. If true, the dropdown is open and we use the `removeClass` method on the Renderer2 API to remove the `open` class and close the dropdown. Inversely, if `isOpen` is false, we call the `addClass` method on the Renderer2 API to add the `open` class and open the dropdown.

By using the Renderer2 API, we intercept calls to the renderer and modify the template rather than making changes to the DOM directly. This decouples the rendering layers and the DOM, making the use of web/service workers possible.

As we discussed earlier, because we’re still injecting the `ElementRef` there is still the the possibility that we are introducing a security vulnerability into our application. We can solve this problem with the `HostBinding` decorator, which leads me to the third way to implement an attribute directive.

## Attribute Directive with HostBinding

The `HostingBinding` decorator allows us to mark a DOM property as a host-binding property. In other words, we can bind a DOM property on the host element to local property on our `DropdownDirective` class by passing the DOM property into the `Hostbinding` decorator. You can find this example on Stackblitz [here](https://stackblitz.com/edit/ng-attribute-directive-hostbinding-feb-2019?file=src%2Fapp%2Fdropdown.directive.ts).

Let’s take a look at our `dropdown.directive.ts` file now.

```typescript
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {
	constructor() {}

	@HostBinding('class.open') isOpen = false;

	@HostListener('click') toggleDropdown() {
		this.isOpen = !this.isOpen;
	}
}
```

Notice that we’re not injecting anything into our `DropdownDirective` class. This is because we don’t really need access to the element. We just need to bind the `isOpen` property to whether or not the open class is applied to the host element. We can do that by passing a CSS selector prefixed with `class`. into the `HostBinding` decorator. If the open class is set on the host element, it will return true. Otherwise, it will return false.

Note: You can bind to as many properties on the host element as needed. In our case, we only need one.

In the `toggleDropdown` function, we can add/remove the `open` class from the host element by setting the `isOpen` property to the opposite boolean value. When the function annotated by the `HostListener` decorator changes a property on the directive class bound to the DOM property, we do not have to manually change the it with an `ElementRef` or the `Renderer`. Instead, Angular automatically checks host property bindings during change detection, and if a binding changes it updates the host element of the directive using a version of the Renderer.

The benefits of using this method include:

- Our DOM is decouple from the rendering layer
- Avoid vulnerability to XSS attacks by referencing the DOM directly
- Easier to test and improves the readability

## Conclusion

Avoid accessing and manipulating the DOM directly. Instead, use the `Hostbinding` and `HostListener` decorators to avoid any vulnerabilities, decouple the rendering layer from the DOM, and improve testability.
