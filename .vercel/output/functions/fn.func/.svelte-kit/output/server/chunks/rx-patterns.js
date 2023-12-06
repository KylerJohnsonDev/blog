import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "Basic Reactive Patterns in Angular",
  "date": "2020-05-14",
  "description": "Examples and explanations of basic reactive patterns with RxJS",
  "published": true,
  "tags": ["angular", "rxjs"],
  "imageUrl": "/static/rx-patterns-header-img.webp",
  "imageAlt": "Backlit keyboard - Reactive Patterns header"
};
const Rx_patterns = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p><img src="${"/static/images/basic-reactive-patterns/rx-patterns-header-img.webp"}" alt="${"Keyboard with Purple backlight"}"></p>
<pre class="${"language-text"}"><!-- HTML_TAG_START -->${`<code class="language-text">Angular version: 11 or later
RxJS versions: 7 or later
Node Version: 14 or later</code>`}<!-- HTML_TAG_END --></pre>
<p><em>Updated for modern Angular/RxJS versions</em></p>
<p>In order to write performant, maintainable Angular apps, RxJS knowledge is absolutely necessary. In this article, my goal is to help Angular developers leverage the reactive paradigm with RxJS in a clean, readable way by going over some common reactive patterns. This is not intended to be a comprehensive guide, but a foundation on which developers can continue to build their understanding.</p>
<p>We will take a look at the following real-world scenarios:</p>
<ul><li>Getting data from a service</li>
<li>Reading route parameters and using them to fetch data from a service</li>
<li>Managing multiple observable streams in a component</li></ul>
<h2 id="${"quick-note-about-subscribing"}">Quick Note about Subscribing</h2><a href="${"#quick-note-about-subscribing"}"><span class="${"icon icon-link"}"></span></a>
<p>Before we get into those scenarios, let’s talk briefly about how we are going to subscribe to our observables. In general, if we explicitly subscribe using the <code>subscribe</code> function, we would then have to properly manage our subscriptions ourselves, which involves knowing when we need to subscribe/unsubscribe and writing the code to do it. Another thing to keep in mind is that even if we know how to properly manage these subscriptions, every developer working on our project may not. Instead, we’re going to leverage the framework to do all of that for us by using the async pipe.</p>
<p><strong>Note</strong>: While I don’t recommend that you use inline templating in your Angular components, I’m going to do that here for the sake of brevity.</p>
<h2 id="${"getting-data-from-a-service"}">Getting Data from a Service</h2><a href="${"#getting-data-from-a-service"}"><span class="${"icon icon-link"}"></span></a>
<p>Here, we will take a look at how to fetch data from a server and display it on the screen. We have a <code>fetchCoffeeList</code> function in our service that uses Angular’s HttpClient to make a call to the server and wrap the response in an observable and returns it.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript">
<span class="token comment">// coffee.service.ts</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    <span class="token operator">...</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeService</span> <span class="token punctuation">&#123;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> httpClient<span class="token operator">:</span> HttpClient<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

    <span class="token function">fetchCoffeeList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span>Coffee<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">coffee.com/coffee/list</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>httpClient<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span>Coffee<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

<span class="token punctuation">&#125;</span>
</code>`}<!-- HTML_TAG_END --></pre>
<p>In the typescript file of our coffee component, we set our <code>coffees$</code> property equal to the result of our service call. Because we’re returning an observable, our service call doesn’t execute until it has a subscriber. When our <code>CoffeeComponent</code> initializes, the async pipe automatically subscribes to the <code>coffees$</code> observable. When the payload comes back from the server, the observable emits a new value containing the payload and our component renders the data. When the component is destroyed, the async pipe automatically unsubscribes from <code>coffees$</code>.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript">
<span class="token comment">// coffee.component.ts</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    selector<span class="token operator">:</span> <span class="token string">'app-coffee'</span><span class="token punctuation">,</span>
    template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
        &lt;ng-container *ngIf="coffees$ | async as coffees">
            &lt;ul>
                &lt;li *ngFor="let coffee of coffees">&#123;&#123; coffee.name &#125;&#125;&lt;/li>
            &lt;/ul>
        &lt;/ng-container>
    </span><span class="token template-punctuation string">&#96;</span></span>
    <span class="token operator">...</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeComponent</span> <span class="token punctuation">&#123;</span>

    coffees$<span class="token operator">:</span> Observable<span class="token operator">&lt;</span>Coffee<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>coffeeService<span class="token punctuation">.</span><span class="token function">fetchCoffeeList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
        <span class="token function">catchError</span><span class="token punctuation">(</span>err <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'/error'</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span>message<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">of</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>
        <span class="token keyword">private</span> coffeeService<span class="token operator">:</span> CoffeeService<span class="token punctuation">,</span>
        <span class="token keyword">private</span> router<span class="token operator">:</span> Router<span class="token punctuation">,</span>
        <span class="token keyword">private</span> logger<span class="token operator">:</span> Logger
    <span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
</code>`}<!-- HTML_TAG_END --></pre>
<p><em>Note:</em> <code>HttpClient</code> <em>request methods automatically complete for us when they get a response from the server so it wouldn’t actually cause a memory leak if we didn’t unsubscribe here; however, it’s a good idea to be consistent in the way we subscribe across our app.</em></p>
<h3 id="${"error-handling"}">Error Handling</h3><a href="${"#error-handling"}"><span class="${"icon icon-link"}"></span></a>
<p>In the snippet above, we are piping onto the observable we get back from the <code>fetchCoffeeList</code> method and inside of the pipe, we’re using the <code>catchError</code> operator from RxJS to catch any errors that are thrown. We can think of it as a try/catch for our observable stream. <code>catchError</code> will catch any error that is thrown from the source observable or inside of any other operators in the pipe. For this example and the others, we’re just going to log the error and navigate to an error page, passing the error message as a route parameter. For more about error handling, take look at this <a href="${"https://blog.angular-university.io/rxjs-error-handling/"}" rel="${"nofollow"}">article</a> from Angular University.</p>
<h2 id="${"using-route-parameters-to-fetch-data"}">Using Route Parameters to Fetch Data</h2><a href="${"#using-route-parameters-to-fetch-data"}"><span class="${"icon icon-link"}"></span></a>
<p>First, let’s talk about the use case for this. Let’s say we have a list of coffees displayed on the screen and we want to click on one and go to a “detail” page that shows the ingredients and nutritional info for that coffee. In this scenario, when a coffee is clicked, we pass the id of that coffee in as a parameter. The route configuration for our “detail” page would be setup to accept a parameter of <code>coffeeId</code>. When our <code>CoffeeDetailsComponent</code> initializes, we need to get the route parameter and fetch the coffee details by coffee id in order to display them. In this section, we’re going to talk about how to do this reactively.</p>
<p>Following the pattern from the previous section, let’s look at the service method first. Here, we simply have a service method that makes an API call to get the coffee details.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript">
<span class="token comment">// coffee-details.service.ts</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    <span class="token operator">...</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeDetailsService</span> <span class="token punctuation">&#123;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> httpClient<span class="token operator">:</span> HttpClient<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

    <span class="token function">getByCoffeeId</span><span class="token punctuation">(</span>coffeeId<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span>CoffeeDetails<span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">'coffee.com/coffee/detail'</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'coffeeId'</span><span class="token punctuation">,</span> coffeeId<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>httpClient<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span>CoffeeDetails<span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> params <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

<span class="token punctuation">&#125;</span>
</code>`}<!-- HTML_TAG_END --></pre>
<p>When the <code>CoffeeDetailsComponent</code> intializes, we susbscribe to the the <code>coffeeDetails$</code> observable using the async pipe, which gets its value from the results of the RxJS <code>pipe</code> method. The <code>pipe</code> method takes one or more <a href="${"https://rxjs.dev/guide/v6/pipeable-operators"}" rel="${"nofollow"}">RxJS “pipeable operators”</a> in order to transform data. In our case, the <code>ParamMap</code> is passed by context into it and a <code>CoffeeDetails</code> object wrapped in an observable is the expected result.</p>
<p>So how can we start with a <code>ParamMap</code> and end up with an <code>Observable&lt;CoffeeDetails&gt;</code>? Well, we need a transformation to occur so we use a RxJS transformation operator called <a href="${"https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap"}" rel="${"nofollow"}">switchMap</a>. In the example below, we’re getting our <code>coffeeId</code> from the map object by key, parsing it to a number type, and passing it into the service method that fetches coffee details. The <code>switchMap</code> operator will susbscribe to our service method and return the result. Because we know that the return value of our service method is <code>Observalbe&lt;CoffeeDetails&gt;</code>, we know that the return value of the <code>switchMap</code> operator is going to be <code>Observable&lt;CoffeeDetails&gt;</code>, too.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    selector<span class="token operator">:</span> <span class="token string">'app-coffee-details'</span><span class="token punctuation">,</span>
    template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
        &lt;div *ngIf="coffeeDetails$ | async as details">
            &lt;section class="nutrition-info>
                &lt;p>&#123;&#123; details.nutrition.totalCalories &#125;&#125;&lt;p>
            &lt;/section>
            &lt;section class="ingredients">
                &lt;ul>
                    &lt;li *ngFor="let ingredient of details.ingredients">
                        &#123;&#123; ingredient &#125;&#125;
                    &lt;/li>
                &lt;/ul>
            &lt;/section>
        &lt;/div>
    </span><span class="token template-punctuation string">&#96;</span></span>
    <span class="token operator">...</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeDetailsComponent</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">&#123;</span>

    coffeeDetails$<span class="token operator">:</span> Observable<span class="token operator">&lt;</span>CoffeeDetails<span class="token operator">></span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>route<span class="token punctuation">.</span>paramMap<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
        <span class="token function">switchMap</span><span class="token punctuation">(</span><span class="token punctuation">(</span>params<span class="token operator">:</span> ParamMap<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">const</span> coffeeId <span class="token operator">=</span> <span class="token operator">+</span>params<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'coffeeId'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>coffeeDetailsService<span class="token punctuation">.</span><span class="token function">getByCoffeeId</span><span class="token punctuation">(</span>coffeeId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">catchError</span><span class="token punctuation">(</span>err <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'/error'</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span>message<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">of</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>
        <span class="token keyword">private</span> coffeeDetailsService<span class="token operator">:</span> CoffeeDetailsService<span class="token punctuation">,</span>
        <span class="token keyword">private</span> route<span class="token operator">:</span> ActivatedRoute<span class="token punctuation">,</span>
        <span class="token keyword">private</span> logger<span class="token operator">:</span> Logger
    <span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

<span class="token punctuation">&#125;</span>
</code>`}<!-- HTML_TAG_END --></pre>
<p><em>note: the</em> <code>switchMap</code> <em>operator manages only one subscription at a time. When the source observable emits a new value, it cancels the previous inner observable (even if an HTTP request is in-flight) and creates a new observable and subscribes to it. This works perfectly for this use case because if the user clicks on another coffee before the detail view of this one loads, the previous request gets cancelled and it re-executes with the new route parameter. This can cause unexpected issues if used in certain situations, though. We don’t want requests to be cancelled when we’re doing things like database writes. For things like that concatMap would be a better choice.</em></p>
<h2 id="${"managing-multiple-observable-streams"}">Managing Multiple Observable Streams</h2><a href="${"#managing-multiple-observable-streams"}"><span class="${"icon icon-link"}"></span></a>
<p>So what about when our component has to manage multiple observable streams? Subscribing to each observable individually, even with the async pipe, can can significantly impact performance. This is because each time one of the observable streams emit a new value, change detection fires to update the UI. We can solve this problem by using the <a href="${"https://rxjs-dev.firebaseapp.com/api/index/function/combineLatest"}" rel="${"nofollow"}">combineLatest</a> operator to create a view model for our component template.</p>
<p><code>combineLatest</code> belongs to a category of <a href="${"https://rxjs-dev.firebaseapp.com/guide/operators"}" rel="${"nofollow"}">RxJS operators</a> known as the join creation operators, so-called because they take in mutiple source observables and create a single observable stream to output. You can think of single observable output as a view model for your component template. <code>combineLatest</code> is unique in that it doesn’t emit its first value until all of its source observables have emitted at least one value. In other words, when we use this to combine multiple observables in our component, we don’t attempt to render the UI until we have all the data it depends on. This means that change detection only has to fire once to initially render the component UI.</p>
<p>Let’s take a look at some code:</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript">
<span class="token comment">// coffee-sales.service.ts</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    <span class="token operator">...</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeSalesService</span> <span class="token punctuation">&#123;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> httpClient<span class="token operator">:</span> HttpClient<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

    <span class="token function">fetchYearToDateSales</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span>SalesMetrics<span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">coffee.com/sales/ytd</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>httpClient<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span>SalesMetrics<span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">fetchTodaysSales</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span>SalesMetrics<span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">coffee.com/sales/today</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>httpClient<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span>SalesMetrics<span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
</code>`}<!-- HTML_TAG_END --></pre>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript">
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    selector<span class="token operator">:</span> <span class="token string">'app-coffee-sales'</span><span class="token punctuation">,</span>
    template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
        &lt;div *ngIf="vm$ | async as vm">
            &lt;app-ytd-sales [yearToDateSales]="vm.yearToDateSales">&lt;/app-ytd-sales>
            &lt;app-daily-sales [todaysSales]="vm.todaysSales">&lt;/app-daily-sales>
        &lt;/div>
    </span><span class="token template-punctuation string">&#96;</span></span>
    <span class="token operator">...</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeSalesComponent</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">&#123;</span>

    vm$<span class="token operator">:</span> Observable<span class="token operator">&lt;</span>CoffeeSalesViewModel<span class="token operator">></span> <span class="token operator">=</span> <span class="token function">combineLatest</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
        yearToDateSales<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>salesService<span class="token punctuation">.</span><span class="token function">fetchYearToDateSales</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        todaysSales<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>salesService<span class="token punctuation">.</span><span class="token function">fetchTodaysSales</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
        <span class="token function">catchError</span><span class="token punctuation">(</span>err <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'/error'</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span>message<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">of</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span>
        <span class="token keyword">private</span> salesService<span class="token operator">:</span> CoffeeSalesService<span class="token punctuation">,</span>
        <span class="token keyword">private</span> logger<span class="token operator">:</span> Logger
    <span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

<span class="token punctuation">&#125;</span>
</code>`}<!-- HTML_TAG_END --></pre>
<p><em>Note: combineLatest takes in an array of observables and outputs a single observable containing an array of the latest emitted values of the source observables. Handling an array in the UI wouldn’t be very readable so we use object destructuring to map that array to an object servicing as our view model.</em></p>
<p>So when our component initializes, we subscribe to our <code>vm$</code> property using the async pipe and <code>combineLatest</code> is executed. It takes an array of observables and outputs an observable containing an array of values. The first value in the array is the latest value from the first observable in the array of observables we passed into it (orderQueue) while the second value in the array corresponds to the second observable (todaysSales). Then, we pipe onto the result and use the RxJS <code>map</code> operator to transform our array into a view model object using <a href="${"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring"}" rel="${"nofollow"}">object destructuring</a> syntax.</p>
<p>Think about the file containing the component class (ex. coffee-sales.component.ts) as a “controller” class. Its sole responsibilty is to build the data structure the UI needs. Any data transformations/manipulations should happen here.</p>
<h2 id="${"conclusion"}">Conclusion</h2><a href="${"#conclusion"}"><span class="${"icon icon-link"}"></span></a>
<p>My goal with this article is to provide a quick reference for some common reactive patterns to help Angular developers leverage the reactive paradigm and improve the performance and maintainability of their applications.</p>
<p>Key takeaways:</p>
<ul><li><p>Subscribe to your observables using the async pipe</p></li>
<li><p>Use the <code>switchMap</code> operator when you only care about the action completing based on the latest value of the source observable</p></li>
<li><p>Minimize change detection cycles on component initialization by using <code>combineLatest</code></p></li>
<li><p>Make use of pipeable operators like <code>map</code> to do any data transformation/manipulations inside of your component class</p></li></ul>`;
});
export {
  Rx_patterns as default,
  metadata
};
