import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "A Practical Approach to Angular Attribute Directives",
  "imageUrl": "/static/roadsigns.webp",
  "imageAlt": "Road Signs",
  "date": "2019-03-03",
  "description": "Learn what attribute directives are and how you can use them",
  "published": true,
  "tags": ["angular"]
};
const Attribute_directives = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p><img src="${"/static/images/attribute-directives/roadsigns.webp"}" alt="${"Road Signs"}"></p>
<pre class="${"language-text"}"><!-- HTML_TAG_START -->${`<code class="language-text">Angular version: 8.x
Node Version: 10.9 or later</code>`}<!-- HTML_TAG_END --></pre>
<p>You’re working on an Angular app trying to add an interactive UI element like a simple dropdown menu. You have twenty browser tabs open and you’re trying to learn the “Angular way” of doing it. You want to follow best practices, but your frustration level is rising and you find yourself thinking why is it so difficult to do something that would have taken 10 minutes with Jquery and Bootstrap. Sound familiar? If it does, you’ve come to the right place.</p>
<p>Don’t sweat it— you’ve got this! It’s actually the perfect use case for a custom attribute directive and I will cover everything you need to know in order to implement your own in minutes. Let’s dive in!</p>
<h2 id="${"what-it-is"}">What It Is</h2><a href="${"#what-it-is"}"><span class="${"icon icon-link"}"></span></a>
<p>Attribute directives change the appearance or behavior of an element, component, or another directive. Essentially, it is a class annotated with the Directive decorator where you specify what change you want to occur and what CSS event (if any) you want to trigger that change. <code>ngClass</code>, <code>ngStyle</code>, and <code>ngModel</code> are examples of attribute directives built-in to the Angular framework.</p>
<h2 id="${"when-to-use-it"}">When to Use It</h2><a href="${"#when-to-use-it"}"><span class="${"icon icon-link"}"></span></a>
<p>You would use an attribute directive anytime you want logic or events to change the appearance or behavior of the view. Dropdowns, accordions, and tabs are just a few common use cases for custom attribute directives. When you have a UI element that will be common throughout your app, you can implement an attribute directive and share it across components and modules to avoid repeating the code for the same functionality.</p>
<h2 id="${"getting-started"}">Getting Started</h2><a href="${"#getting-started"}"><span class="${"icon icon-link"}"></span></a>
<p>Before I get into how attribute directives work, I need to explain a few things. In order for attribute directives to accomplish what we want them to accomplish, they need to be able to access and modify DOM elements. There are three ways to accomplish this in an Angular directive:</p>
<ol><li>ElementRef</li>
<li>Renderer</li>
<li>HostBinding (This should be your default)</li></ol>
<p>I will show you examples of a dropdown menu that uses each one of these methods as I explain how they work. The HTML and CSS in each example will be exactly the same. Only the code in the Dropdown class will change from example to example.</p>
<p>The HTML:</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">appDropdown</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dropdown-btn<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Menu<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dropdown<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://medium.com/@kylerjohnsondev<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dropdown-item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Find me on Medium<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://twitter.com/KylerJohnsondev<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dropdown-item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Find me on Twitter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://github.com/KylerJohnsondev<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dropdown-item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Find me on Github<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>The CSS:</p>
<pre class="${"language-css"}"><!-- HTML_TAG_START -->${`<code class="language-css"><span class="token selector">.dropdown-btn</span> <span class="token punctuation">&#123;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #0288d1<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #0288d1<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 0.25em<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
  <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 1.5em<span class="token punctuation">;</span>
  <span class="token property">outline</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.dropdown</span> <span class="token punctuation">&#123;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #0288d1<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 0 0.25em 0.25em 0.25em<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 40%<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.dropdown-item</span> <span class="token punctuation">&#123;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
  <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid white<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0.5em 0<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.dropdown-item:first-child</span> <span class="token punctuation">&#123;</span>
  <span class="token property">border-top</span><span class="token punctuation">:</span> 1px solid white<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 0 0.25em 0 0<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.dropdown-item:last-child</span> <span class="token punctuation">&#123;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 0 0 0.25em 0.25em<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.dropdown-item:hover</span> <span class="token punctuation">&#123;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> magenta<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/*
 Below is the only CSS necessary to make this example work. The dropdown directive will add or remove the .open class when the click event is emitted.

 Note: By default, the display property of an element with the .dropdown class is set to none. When the dropdown directive applies the .open class to the dropdown button, the below CSS will set the display property of the sibling div with a class of .dropdown to block, making it visible.
*/</span>

<span class="token selector">.open</span> <span class="token punctuation">&#123;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 0.25em 0.25em 0 0<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token selector">.open + .dropdown</span> <span class="token punctuation">&#123;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>The dropdown directive will add or remove the open class to the button element when the click event is emitted. The button class has a sibling div containing the dropdown links with a class of <code>dropdown</code>. By default, the display property of the dropdown div is set to none. When the dropdown directive applies the <code>open</code> class to the dropdown button, the <code>display</code> property of the dropdown div is set to <code>block</code> further down in the cascade, making it visible. With this setup, adding and removing the <code>open</code> class will be how we display or hide the dropdown list.</p>
<h2 id="${"attribute-directive-using-elementref"}">Attribute Directive using ElementRef</h2><a href="${"#attribute-directive-using-elementref"}"><span class="${"icon icon-link"}"></span></a>
<p>In this section, we will look at a dropdown directive implementation using ElementRef. You can find the example to which I will refer on Stackblitz <a href="${"https://stackblitz.com/edit/ng-attribute-directive-elementref-feb-2019"}" rel="${"nofollow"}">here</a>.</p>
<p>In this example, this is how our dropdown directive looks:</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Directive<span class="token punctuation">,</span> ElementRef<span class="token punctuation">,</span> HostListener <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'[appDropdown]'</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">DropdownDirective</span> <span class="token punctuation">&#123;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> elRef<span class="token operator">:</span> ElementRef<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">HostListener</span></span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">)</span> <span class="token function">toggleDropdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> buttonEl <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>elRef<span class="token punctuation">.</span>nativeElement
    <span class="token keyword">const</span> isOpen <span class="token operator">=</span> buttonEl<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">'open'</span><span class="token punctuation">)</span>
    buttonEl<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">toggle</span><span class="token punctuation">(</span><span class="token string">'open'</span><span class="token punctuation">,</span> <span class="token operator">!</span>isOpen<span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>We have an attribute directive, <code>aDropdownDirective</code> class annotated with the <code>Directive</code> decorator. Generally, decorators in Angular contain metadata the compiler needs to understand how a class should be processed, instantiated, and used at runtime. The only property required by a directive is the <code>selector</code> property.</p>
<h2 id="${"how-to-use-the-dropdown-directive"}">How to use the Dropdown Directive</h2><a href="${"#how-to-use-the-dropdown-directive"}"><span class="${"icon icon-link"}"></span></a>
<p>First, we need to import it into our module by adding it to the declarations array. Then we use the dropdown directive by placing the value of the <code>selector</code> property on the desired HTML element as if it were an attribute. In our case, it is <code>appDropdown</code>.</p>
<p>You can set the <code>selector</code> property to whatever you want, but by convention, it is the name of your class prefixed with something relevant to your project. The reason for the prefix is to help avoid collisions with standard HTML attributes and other directives used by any 3rd-party libraries you may be importing.</p>
<h2 id="${"how-it-works"}">How it Works</h2><a href="${"#how-it-works"}"><span class="${"icon icon-link"}"></span></a>
<p>When the template parser reaches the button element on which we placed our <code>appDropdown</code> directive, the Angular compiler searches for a directive with a selector set to <code>appDropdown</code> and instantiates the class associated with it: The <code>DropdownDirective</code> class.</p>
<p>In order to add and remove the <code>open</code> class and make our directive function, we need to access the button element on which we placed our directive. We can accomplish that by passing an object of type <code>ElementRef</code> into the constructor of our directive. The Angular compiler understands that we want a reference to the host element injected into our directive and assigned to the <code>elRef</code> property. In this example, the host element is the button element because it is the element on which our dropdown directive is placed.</p>
<p>The <code>HostListener</code> decorator allows us to specify what CSS event we want to listen for on the host element (our button element) and the function we want to execute when that event is emitted. In this example, the <code>toggleDropdown</code> function will be executed when a user clicks on the button element.</p>
<p>In terms of Jquery, think of the <code>HostListener</code> as the event method (think <code>.click()</code>) and the <code>toggleDropdown</code> function as the callback you want to execute when the event is triggered.</p>
<p>You might be thinking <em>The HostListener is weird. Can’t I just attach an event listener manually?</em> The short answer is <em>Not Safely</em>. The <code>HostListener</code> decorator solves some really important problems for you. In the <a href="${"https://angular.io/guide/attribute-directives"}" rel="${"nofollow"}">Angular Docs</a>, you will find the following excerpt:</p>
<blockquote><p>Of course you could reach into the DOM with standard JavaScript and attach
event listeners manually. There are at least three problems with that approach:</p>
<ol><li><p>You have to write listeners correctly.</p></li>
<li><p>The code must detach the the listener when the directive is destroyed to avoid
memory leaks.</p></li>
<li><p>Talking to DOM API directly isn’t a best practice</p></li></ol></blockquote>
<p>Now, let’s take a look at what is happening inside of the <code>toggleClass</code> function. We get the DOM representation of the button element from the <code>nativeElement</code> property the same as if we were to use a Jquery element selector. If the <code>classList</code> DOM property contains the <code>open</code> class, <code>isOpen</code> is true and the <code>toggle</code> method removes the <code>open</code> class and closes the dropdown. Likewise, if the open class is not found in the <code>classList</code>, <code>isOpen</code> is false and the toggle method adds the <code>open</code> class and opens the dropdown.</p>
<p>Remember when we we decided earlier that we should use the <code>HostListener</code> decorator because it is not a good idea to access the DOM directly? Using <code>ElementRef</code> to access the DOM and manipulate it is doing just that. Permitting direct access to the DOM like this can make your app more vulnerable to XSS attacks. For information, check out the <a href="${"https://angular.io/guide/security"}" rel="${"nofollow"}">Angular security guide</a>.</p>
<p>In addition, this method of manipulating the DOM tightly couples the DOM and the rendering layer. This is problematic if you ever want to use web/service workers, as they cannot directly access the DOM. Luckily, there is an alternative method out there which leads me to the second way to implement the dropdown attribute directive.</p>
<h2 id="${"attribute-directive-using-renderer2"}">Attribute Directive using Renderer2</h2><a href="${"#attribute-directive-using-renderer2"}"><span class="${"icon icon-link"}"></span></a>
<p>The <a href="${"https://angular.io/api/core/Renderer2"}" rel="${"nofollow"}">Renderer2</a> API offers a way to bypass Angular’s templating and make custom UI changes that can’t be expressed declaratively. That means that web and service workers can safely use this method. You can find this example on Stackblitz <a href="${"https://stackblitz.com/edit/ng-attribute-directive-renderer2-feb-2019"}" rel="${"nofollow"}">here</a>.</p>
<p>Let’s take a look at what our <code>dropdown.directive.ts</code> file looks like now.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Directive<span class="token punctuation">,</span> HostListener<span class="token punctuation">,</span> ElementRef<span class="token punctuation">,</span> Renderer2 <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'[appDropdown]'</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">DropdownDirective</span> <span class="token punctuation">&#123;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> elRef<span class="token operator">:</span> ElementRef<span class="token punctuation">,</span> <span class="token keyword">private</span> renderer<span class="token operator">:</span> Renderer2<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">HostListener</span></span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">)</span> <span class="token function">toggleDropdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> buttonEl <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>elRef<span class="token punctuation">.</span>nativeElement
    <span class="token keyword">const</span> isOpen <span class="token operator">=</span> buttonEl<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">'open'</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>isOpen<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>renderer<span class="token punctuation">.</span><span class="token function">removeClass</span><span class="token punctuation">(</span>buttonEl<span class="token punctuation">,</span> <span class="token string">'open'</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>renderer<span class="token punctuation">.</span><span class="token function">addClass</span><span class="token punctuation">(</span>buttonEl<span class="token punctuation">,</span> <span class="token string">'open'</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Note that we still inject the <code>ElementRef</code> to get the reference to the host element; however, we inject the <code>Renderer2</code> in order to make changes to the view.</p>
<p>Like in the previous example, we get the <code>isOpen</code> boolean value by checking to see if the <code>classList</code> property contains the <code>open</code> class. If true, the dropdown is open and we use the <code>removeClass</code> method on the Renderer2 API to remove the <code>open</code> class and close the dropdown. Inversely, if <code>isOpen</code> is false, we call the <code>addClass</code> method on the Renderer2 API to add the <code>open</code> class and open the dropdown.</p>
<p>By using the Renderer2 API, we intercept calls to the renderer and modify the template rather than making changes to the DOM directly. This decouples the rendering layers and the DOM, making the use of web/service workers possible.</p>
<p>As we discussed earlier, because we’re still injecting the <code>ElementRef</code> there is still the the possibility that we are introducing a security vulnerability into our application. We can solve this problem with the <code>HostBinding</code> decorator, which leads me to the third way to implement an attribute directive.</p>
<h2 id="${"attribute-directive-with-hostbinding"}">Attribute Directive with HostBinding</h2><a href="${"#attribute-directive-with-hostbinding"}"><span class="${"icon icon-link"}"></span></a>
<p>The <code>HostingBinding</code> decorator allows us to mark a DOM property as a host-binding property. In other words, we can bind a DOM property on the host element to local property on our <code>DropdownDirective</code> class by passing the DOM property into the <code>Hostbinding</code> decorator. You can find this example on Stackblitz <a href="${"https://stackblitz.com/edit/ng-attribute-directive-hostbinding-feb-2019?file=src%2Fapp%2Fdropdown.directive.ts"}" rel="${"nofollow"}">here</a>.</p>
<p>Let’s take a look at our <code>dropdown.directive.ts</code> file now.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Directive<span class="token punctuation">,</span> HostBinding<span class="token punctuation">,</span> HostListener <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'[appDropdown]'</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">DropdownDirective</span> <span class="token punctuation">&#123;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">HostBinding</span></span><span class="token punctuation">(</span><span class="token string">'class.open'</span><span class="token punctuation">)</span> isOpen <span class="token operator">=</span> <span class="token boolean">false</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">HostListener</span></span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">)</span> <span class="token function">toggleDropdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isOpen <span class="token operator">=</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>isOpen
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Notice that we’re not injecting anything into our <code>DropdownDirective</code> class. This is because we don’t really need access to the element. We just need to bind the <code>isOpen</code> property to whether or not the open class is applied to the host element. We can do that by passing a CSS selector prefixed with <code>class</code>. into the <code>HostBinding</code> decorator. If the open class is set on the host element, it will return true. Otherwise, it will return false.</p>
<p>Note: You can bind to as many properties on the host element as needed. In our case, we only need one.</p>
<p>In the <code>toggleDropdown</code> function, we can add/remove the <code>open</code> class from the host element by setting the <code>isOpen</code> property to the opposite boolean value. When the function annotated by the <code>HostListener</code> decorator changes a property on the directive class bound to the DOM property, we do not have to manually change the it with an <code>ElementRef</code> or the <code>Renderer</code>. Instead, Angular automatically checks host property bindings during change detection, and if a binding changes it updates the host element of the directive using a version of the Renderer.</p>
<p>The benefits of using this method include:</p>
<ul><li>Our DOM is decouple from the rendering layer</li>
<li>Avoid vulnerability to XSS attacks by referencing the DOM directly</li>
<li>Easier to test and improves the readability</li></ul>
<h2 id="${"conclusion"}">Conclusion</h2><a href="${"#conclusion"}"><span class="${"icon icon-link"}"></span></a>
<p>Avoid accessing and manipulating the DOM directly. Instead, use the <code>Hostbinding</code> and <code>HostListener</code> decorators to avoid any vulnerabilities, decouple the rendering layer from the DOM, and improve testability.</p>`;
});
export {
  Attribute_directives as default,
  metadata
};
