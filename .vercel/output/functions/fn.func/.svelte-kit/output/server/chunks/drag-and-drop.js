import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "Drag & Drop w/ Angular Material/CDK",
  "date": "2019-02-07",
  "description": "Leverage Angular Material CDK to implement the drag & drop feature in your Angular app.",
  "published": true,
  "tags": ["angular"],
  "imageUrl": "/static/ng-drag-and-drop-header.webp",
  "imageAlt": "Drag and drop demo"
};
const Drag_and_drop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<pre class="${"language-text"}"><!-- HTML_TAG_START -->${`<code class="language-text">Angular version: 8.x
Angular Material: 8.2.3 or later
Node Version: 10.9 or later</code>`}<!-- HTML_TAG_END --></pre>
<p>Angular Material/CDK 7.1.1 came boasting some really exciting new features such as support for drag &amp; drop functionality. In this post, I explain how it works and I walk you through how to implement it in your own project.</p>
<p>We’re going to build a simple, responsive UI for a to-do application. We’ll have a “Todo” list and a “Completed” list and we’ll be able to drag and drop to-do items back and forth between them as well as reorder them. In the end, we’ll have something that looks like this:</p>
<p><img src="${"/static/images/drag-and-drop/dt-drag-drop.gif"}" alt="${"Drag and Drop"}"></p>
<p>There are two ways to approach my post:</p>
<ol><li>Clone my project from <a href="${"https://github.com/KylerJohnsonDev/ng-drag-and-drop"}" rel="${"nofollow"}">Github</a>, run it locally, and skip to the “Adding the Drag &amp; Drop Functionality” section.</li>
<li>Start below and I’ll walk you through how to set up your drag &amp; drop project from scratch</li></ol>
<h2 id="${"getting-started-from-scratch"}">Getting started from scratch</h2><a href="${"#getting-started-from-scratch"}"><span class="${"icon icon-link"}"></span></a>
<pre class="${"language-text"}"><!-- HTML_TAG_START -->${`<code class="language-text">Note: this section assumes that you have already installed Nodejs and the Angular CLI</code>`}<!-- HTML_TAG_END --></pre>
<p>Open up the terminal, navigate to your desired directory, and run <code>ng new your-project-name --style=scss</code> and follow the prompts. This generates a new Angular project that uses SCSS by default, which we will later use to style the app.</p>
<p>We also need to add <a href="${"https://material.angular.io/"}" rel="${"nofollow"}">Angular Material</a> to our project so navigate into your project directory and run <code>ng add @angular/material</code>. You will get the following prompts:</p>
<ol><li>Choose a theme — in this demo we don’t really use the built-in Material theme so choose whichever one you like.</li>
<li>Set up HammerJS for gesture recognition — choose yes. For more about HammerJS in Angular, check out this blog post from Angular In Depth.</li>
<li>Set up browser animations for Angular Material — choose yes. This will import the <code>BrowserAnimationsModule</code> and add it to the imports for <code>app.module.ts</code>.</li></ol>
<h2 id="${"the-basic-setup"}">The Basic Setup</h2><a href="${"#the-basic-setup"}"><span class="${"icon icon-link"}"></span></a>
<p>We need to do some quick setup here to get ready to add the drag and drop functionality. I’m going to place the to-do list and the completed list in Angular Material Cards so in <code>app.module.ts</code>, we need to import the <code>MatCardModule</code> from Angular Material and add it to the imports array in the <code>NgModule</code> decorator. At this point, your <code>app.module.ts</code> should look like this:</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> BrowserModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/platform-browser'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> NgModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> AppComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./app.component'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> BrowserAnimationsModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/platform-browser/animations'</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> MatCardModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/material/card'</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">NgModule</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  declarations<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>BrowserModule<span class="token punctuation">,</span> BrowserAnimationsModule<span class="token punctuation">,</span> MatCardModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  bootstrap<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Next, we’ll replace the boilerplate html in <code>app.component.html</code> with the following:</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pagewrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todos-section-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-header</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-title</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>To-dos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-title</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-header</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-content</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo-item<span class="token punctuation">"</span></span> <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>let todo of todos<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>&#123;&#123;todo&#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-content</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-header</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-title</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Completed<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-title</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-header</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-content</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo-item<span class="token punctuation">"</span></span> <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>let todo of completed<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>&#123;&#123;todo&#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-content</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>You will notice we have some errors when we do this and that’s because we have <code>*ngFor</code> structural directives referencing arrays we have not yet declared in <code>app.component.ts</code>. Let’s do that now by adding the following property declarations to our <code>app.component.ts</code> file:</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript">todos<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">'Get eggs from grocery store'</span><span class="token punctuation">,</span>
    <span class="token string">'Change the oil &amp; filter in car'</span><span class="token punctuation">,</span>
    <span class="token string">'Do the dishes'</span><span class="token punctuation">,</span>
    <span class="token string">'Pay the utility bill'</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  completed<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">'Wash the car'</span><span class="token punctuation">,</span>
    <span class="token string">'Respond to InMail'</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>At this point, if you run your app and look at it in the browser, you should have something like this:</p>
<p><img src="${"/static/images/drag-and-drop/drag-drop-1.png"}" alt="${"Basic Layout"}"></p>
<h2 id="${"adding-the-drag--drop-funcionality"}">Adding the Drag &amp; Drop Funcionality</h2><a href="${"#adding-the-drag--drop-funcionality"}"><span class="${"icon icon-link"}"></span></a>
<p>Now the real fun begins! Let’s make each to-do item draggable by adding the cdkDrag attribute to the divs containing our to-do items. (Don’t forget to do this for both the to-do section and the completed section). This will allow us to drag the to-do items wherever we want, but it allows us to drop it anywhere too - including on top of another to-do.</p>
<p><img src="${"/static/images/drag-and-drop/drag-drop-2.gif"}" alt="${"Draggable items"}"></p>
<p>We can fix this by adding the <code>cdkDropList</code> attribute to the divs containing our list of to-do items. Now, if we try to drag and drop them anywhere outside of the div or on top of another to-do like we did above, they will snap back into place.</p>
<p><img src="${"/static/images/drag-and-drop/drag-drop-3.gif"}" alt="${"Allow dropping of draggable item"}"></p>
<p>We still can’t re-order to-do items in the same list or drag to-do items over to the completed list and back, though, so we still have some work to do. Let’s focus on reordering the to-do items within the same list, first. We can do that by listening to the <code>cdkDropListDropped</code> event on the container. We’ll need to define our own function in <code>app.component.ts</code> to fire when this event is emitted and determine the new index of the to-do item. Our function should look like this:</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token function">drop</span><span class="token punctuation">(</span>event<span class="token operator">:</span> CdkDragDrop<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">moveItemInArray</span><span class="token punctuation">(</span>
      event<span class="token punctuation">.</span>container<span class="token punctuation">.</span>data<span class="token punctuation">,</span>
      event<span class="token punctuation">.</span>previousIndex<span class="token punctuation">,</span>
      event<span class="token punctuation">.</span>currentIndex
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>The function named <code>moveItemInArray</code> is a built-in function offered by the Angular CDK so we’ll need to import that as well as the CdkDragDrop event type from <code>@angular/cdk/drag-drop</code> at the top of our <code>app.component.ts</code> file.</p>
<p>If we test this in the browser, however, we’ll see that it doesn’t work and we’re still getting errors. This is because the container of our to-do items is firing the <code>cdkDropListDropped</code> event, but the container has no knowledge of our <code>todos</code> array. The container needs to be aware of our array so the <code>cdkDropListDropped</code> event contains information about the previous index and the new index of the to-do item we’re dragging and dropping. We can achieve that by attaching our <code>todos</code> array to the <code>cdkDropListData</code> property on the container element. Here’s what our <code>app.component.html</code> should like now:</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pagewrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todos-section-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-header</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-title</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>To-dos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-title</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-header</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-content</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span> <span class="token attr-name">cdkDropList</span> <span class="token attr-name">[cdkDropListData]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todos<span class="token punctuation">"</span></span> <span class="token attr-name">(cdkDropListDropped)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>drop($event)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo-item<span class="token punctuation">"</span></span> <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>let todo of todos<span class="token punctuation">"</span></span> <span class="token attr-name">cdkDrag</span><span class="token punctuation">></span></span>&#123;&#123;todo&#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-content</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-header</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-title</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Completed<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-title</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-header</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-content</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span>
          <span class="token attr-name">cdkDropList</span>
          <span class="token attr-name">[cdkDropListData]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>completed<span class="token punctuation">"</span></span>
          <span class="token attr-name">(cdkDropListDropped)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>drop($event)<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo-item<span class="token punctuation">"</span></span> <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>let todo of completed<span class="token punctuation">"</span></span> <span class="token attr-name">cdkDrag</span><span class="token punctuation">></span></span>&#123;&#123;todo&#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-content</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>If we save our changes and refresh the browser, we should now be able to reorder items within the same container.</p>
<p><img src="${"/static/images/drag-and-drop/drag-drop-4.gif"}" alt="${"Reorder items in a container"}"></p>
<p>It works! Unfortunately, we still can’t drag the items from one container to another. For example, we can’t drag a to-do item we’ve completed over to the completed container. Let’s take a look at how we can do that now.</p>
<p>Since each section is displaying the list of items in its respective array, to make the item we drop appear in the other section, we’ll need to push it into the array that section is displaying. We already have our <code>drop</code> function, which fires when an item is dropped so we just need to add logic to it to determine if we’re dropping the item within the same container or a different one. In order to do that, though, the event we pass into our <code>drop</code> function must contain information about the previous container as well as the new.</p>
<p>Since the event is emitted from our container elements, our container elements need to be aware of one another. We can accomplish this by setting the <code>cdkDropListConnectedTo</code> property equal to the other container element. We can reference the other container element in one of two ways:</p>
<ol><li>By the id property</li>
<li>By the template reference variable</li></ol>
<p>Since id properties are often used for other things such as e2e testing and may be changed, I try to avoid referencing them in my code. So I’m going to use a template reference variable. At this point, our app.component.html should look like this:</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pagewrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todos-section-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-header</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-title</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>To-dos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-title</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-header</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-content</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
          <span class="token attr-name">cdkDropList</span>
          <span class="token attr-name">#todoList</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cdkDropList<span class="token punctuation">"</span></span>
          <span class="token attr-name">[cdkDropListData]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todos<span class="token punctuation">"</span></span>
          <span class="token attr-name">[cdkDropListConnectedTo]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>[completedList]<span class="token punctuation">"</span></span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span>
          <span class="token attr-name">(cdkDropListDropped)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>drop($event)<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo-item<span class="token punctuation">"</span></span> <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>let todo of todos<span class="token punctuation">"</span></span> <span class="token attr-name">cdkDrag</span><span class="token punctuation">></span></span>&#123;&#123;todo&#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-content</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-header</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-title</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Completed<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-title</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-header</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mat-card-content</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>card-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
          <span class="token attr-name">cdkDropList</span>
          <span class="token attr-name">#completedList</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cdkDropList<span class="token punctuation">"</span></span>
          <span class="token attr-name">[cdkDropListData]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>completed<span class="token punctuation">"</span></span>
          <span class="token attr-name">[cdkDropListConnectedTo]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>[todoList]<span class="token punctuation">"</span></span>
          <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span>
          <span class="token attr-name">(cdkDropListDropped)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>drop($event)<span class="token punctuation">"</span></span>
        <span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo-item<span class="token punctuation">"</span></span> <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>let todo of completed<span class="token punctuation">"</span></span> <span class="token attr-name">cdkDrag</span><span class="token punctuation">></span></span>&#123;&#123;todo&#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card-content</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mat-card</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>Now that our container elements are aware of one another, we can take a look at adding the logic needed by our <code>drop</code> function to determine where an item should go when it is dropped. We saw before that he Angular CDK had the <code>moveItemInArray</code> function to help us reorder an array of items within the same container. Similarly, we are provided with the <code>transferArrayItem</code> function to help us move an item to a new array so we’ll make use of that here. At this point, our app.component.ts file should look like this:</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> CdkDragDrop<span class="token punctuation">,</span> moveItemInArray<span class="token punctuation">,</span> transferArrayItem <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/cdk/drag-drop'</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
  templateUrl<span class="token operator">:</span> <span class="token string">'./app.component.html'</span><span class="token punctuation">,</span>
  styleUrls<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'./app.component.scss'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">&#123;</span>
  todos<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">'Get eggs from grocery store'</span><span class="token punctuation">,</span>
    <span class="token string">'Change the oil &amp; filter in car'</span><span class="token punctuation">,</span>
    <span class="token string">'Do the dishes'</span><span class="token punctuation">,</span>
    <span class="token string">'Pay the utility bill'</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>

  completed<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'Wash the car'</span><span class="token punctuation">,</span> <span class="token string">'Respond to InMail'</span><span class="token punctuation">]</span>

  <span class="token function">drop</span><span class="token punctuation">(</span>event<span class="token operator">:</span> CdkDragDrop<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>previousContainer <span class="token operator">===</span> event<span class="token punctuation">.</span>container<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token function">moveItemInArray</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>container<span class="token punctuation">.</span>data<span class="token punctuation">,</span> event<span class="token punctuation">.</span>previousIndex<span class="token punctuation">,</span> event<span class="token punctuation">.</span>currentIndex<span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
      <span class="token function">transferArrayItem</span><span class="token punctuation">(</span>
        event<span class="token punctuation">.</span>previousContainer<span class="token punctuation">.</span>data<span class="token punctuation">,</span>
        event<span class="token punctuation">.</span>container<span class="token punctuation">.</span>data<span class="token punctuation">,</span>
        event<span class="token punctuation">.</span>previousIndex<span class="token punctuation">,</span>
        event<span class="token punctuation">.</span>currentIndex
      <span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Notice that we had to import the <code>transferArrayItem</code> function into our <code>app.component.ts</code>. If you save the file and refresh the browser, you’ll see that we can now drag and drop to-do items into the the Completed list and back to the To-do list. Our drop function checks to see if the new container is the same as the old one. If it is, it reorders the list based on the index values from the event passed in; however, if the new container is not equal to the old container, the item gets transferred to the array it is linked to by the <code>cdkDropListConnectedTo</code> property on the container.</p>
<p><img src="${"/static/images/drag-and-drop/drag-drop-5.gif"}" alt="${"Move items from list to list"}"></p>
<p>So now we can reorder our to-do items within the same container and drag them to another container and drop them. Everything works, right? Well… not quite. If you moved all of your to-do items to completed, then tried to move one back into the to-do container, you found that you can’t. The item just snaps back to the Completed container.</p>
<p><img src="${"/static/images/drag-and-drop/drag-drop-6.gif"}" alt="${"Fix collapsing empty div"}"></p>
<p>If you’re like me, your first instinct is to look to the browser console and see what the error is. In this case, you won’t find one and that’s because our issue is a frustratingly simple one. When you move all of the to-do items out of their container, the container element collapses making it impossible to drop anything back into it. So let’s go to our app.component.scss file and prevent this from happening by adding the following styles:</p>
<pre class="${"language-scss"}"><!-- HTML_TAG_START -->${`<code class="language-scss"><span class="token selector">#pagewrapper </span><span class="token punctuation">&#123;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>

  <span class="token selector">.todos-section-wrapper </span><span class="token punctuation">&#123;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>

    <span class="token selector">.card </span><span class="token punctuation">&#123;</span>
      <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
      <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
      <span class="token property">flex</span><span class="token punctuation">:</span> 1 1 50%<span class="token punctuation">;</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>

      <span class="token selector">.card-content </span><span class="token punctuation">&#123;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>

        <span class="token selector">.list </span><span class="token punctuation">&#123;</span>
          <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/********* MEDIA QUERIES ***********/</span>

<span class="token atrule"><span class="token rule">@media</span> screen <span class="token operator">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 768px<span class="token punctuation">)</span></span> <span class="token punctuation">&#123;</span>
  <span class="token selector">#pagewrapper </span><span class="token punctuation">&#123;</span>
    <span class="token selector">.todos-section-wrapper </span><span class="token punctuation">&#123;</span>
      <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
      <span class="token selector">.card </span><span class="token punctuation">&#123;</span>
        <span class="token property">flex</span><span class="token punctuation">:</span> 1 1 50%<span class="token punctuation">;</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>As you can see, I’m ensuring neither of our list containers collapse by setting our element with an id of <code>pagewrapper</code> and the element with a class of <code>todos-section-wrapper</code> to a height of 100%. I’m also using flexbox to set each card to 50% height for mobile or 50% width for larger viewport widths. If you’re not familiar with flexbox, <a href="${"https://css-tricks.com/snippets/css/a-guide-to-flexbox/"}" rel="${"nofollow"}">here</a> is an excellent article from CSS-Tricks I find immensely helpful. You’ll also find that I’ve ensured that the height of the element with a class of <code>card-content</code> is set to 100&amp;. Now that we’ve given our container (which has a class of <code>list</code>) some room, we can set the height of it to 100% to ensure that it won’t collapse even when there isn’t anything inside of it. If you save that and refresh the page, you’ll find that the problem is solved.</p>
<p>It does still look a little drab, though, so let’s add some additional styles to make it a bit more aesthetic. Keeping the rules we wrote to prevent our containers from collapsing, let’s update <code>app.component.scss</code> with this:</p>
<pre class="${"language-scss"}"><!-- HTML_TAG_START -->${`<code class="language-scss"><span class="token property"><span class="token variable">$primary</span></span><span class="token punctuation">:</span> #07889b<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$secondary</span></span><span class="token punctuation">:</span> #66b9bf<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$dragging</span></span><span class="token punctuation">:</span> #eeaa7b<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$text</span></span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$dt-background</span></span><span class="token punctuation">:</span> #e0e1d7<span class="token punctuation">;</span>

<span class="token selector">#pagewrapper </span><span class="token punctuation">&#123;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>

  <span class="token selector">.todos-section-wrapper </span><span class="token punctuation">&#123;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>

    <span class="token selector">.card </span><span class="token punctuation">&#123;</span>
      <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
      <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
      <span class="token property">flex</span><span class="token punctuation">:</span> 1 1 50%<span class="token punctuation">;</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>

      <span class="token selector">.card-header </span><span class="token punctuation">&#123;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$primary</span><span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$text</span><span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
        <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
        <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>

        <span class="token selector">.card-title </span><span class="token punctuation">&#123;</span>
          <span class="token property">font-size</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
          <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
      <span class="token punctuation">&#125;</span>

      <span class="token selector">.card-content </span><span class="token punctuation">&#123;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token property">padding</span><span class="token punctuation">:</span> 0.25em<span class="token punctuation">;</span>

        <span class="token selector">.list </span><span class="token punctuation">&#123;</span>
          <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
          <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
          <span class="token property">height</span><span class="token punctuation">:</span> 100% <span class="token important">!important</span><span class="token punctuation">;</span>

          <span class="token selector">.todo-item </span><span class="token punctuation">&#123;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$secondary</span><span class="token punctuation">;</span>
            <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid <span class="token variable">$text</span><span class="token punctuation">;</span>
            <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$text</span><span class="token punctuation">;</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 1.5em<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
          <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.cdk-drag-preview </span><span class="token punctuation">&#123;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$dragging</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$text</span><span class="token punctuation">;</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token property">box-shadow</span><span class="token punctuation">:</span> 0 5px 5px -3px <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.2<span class="token punctuation">)</span><span class="token punctuation">,</span> 0 8px 10px 1px <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.14<span class="token punctuation">)</span><span class="token punctuation">,</span>
    0 3px 14px 2px <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.12<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1.5em<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.cdk-drag-placeholder </span><span class="token punctuation">&#123;</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.cdk-drag-animating </span><span class="token punctuation">&#123;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> transform 250ms <span class="token function">cubic-bezier</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.2<span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

.cdk-drop-list-dragging .<span class="token property">todo-item</span><span class="token punctuation">:</span><span class="token function">not</span><span class="token punctuation">(</span>.cdk-drag-placeholder<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> transform 250ms <span class="token function">cubic-bezier</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.2<span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/********* MEDIA QUERIES ***********/</span>

<span class="token atrule"><span class="token rule">@media</span> screen <span class="token operator">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 768px<span class="token punctuation">)</span></span> <span class="token punctuation">&#123;</span>
  <span class="token selector">#pagewrapper </span><span class="token punctuation">&#123;</span>
    <span class="token selector">.todos-section-wrapper </span><span class="token punctuation">&#123;</span>
      <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
      <span class="token selector">.card </span><span class="token punctuation">&#123;</span>
        <span class="token property">flex</span><span class="token punctuation">:</span> 1 1 50%<span class="token punctuation">;</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token atrule"><span class="token rule">@media</span> screen <span class="token operator">and</span> <span class="token punctuation">(</span><span class="token property">min-width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">)</span></span> <span class="token punctuation">&#123;</span>
  <span class="token selector">#pagewrapper </span><span class="token punctuation">&#123;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$dt-background</span><span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span>
    <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 5em<span class="token punctuation">;</span>

    <span class="token selector">.todos-section-wrapper </span><span class="token punctuation">&#123;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 75%<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 75%<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Now, if you save that out and refresh the page in the browser, your app should look like the gifs in the overview section of this article. If you take look at the SCSS snippet above, you will see a few classes we don’t have in our markup. That’s because these are classes provided to us by the Angular CDK to give us full control over the styles of the drag and drop elements (even during their transition to another container). Those classes include:</p>
<ul><li>cdk-drag-preview</li>
<li>cdk-drag-placeholder</li>
<li>cdk-drag-animating</li>
<li>cdk-drop-list-dragging</li></ul>`;
});
export {
  Drag_and_drop as default,
  metadata
};
