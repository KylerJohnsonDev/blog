import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "Why & How to Lazy Load in Angular",
  "imageUrl": "/static/tiger.webp",
  "imageAlt": "Lazy Tiger",
  "date": "2019-02-10",
  "description": "From why we need it to how we do it - Lazy Loading in Angular 8+",
  "published": true,
  "tags": ["Angular"]
};
const Angular_lazy_loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p><img src="${"/static/images/lazy-loading/tiger.webp"}" alt="${"Lazy Tiger"}"></p>
<pre class="${"language-undefined"}"><!-- HTML_TAG_START -->${`<code class="language-undefined">Angular version: 8.x
Node Version: 10.9 or later</code>`}<!-- HTML_TAG_END --></pre>
<p>Picture it. You have to find the perfect last minute gift so you open a new tab and do a quick Google search. You get the results and you pick the first promising link on the page. 1…2…3 seconds go by and the web page is just loading so what do you do? You click the “back” button on your browser and select the next promising link. Well, you’re not alone. Your first impression of the website was that it was slow and first impressions matter.</p>
<p>In <a href="${"https://www.youtube.com/watch?v=OpMfx_Zie2g&feature=youtu.be"}" rel="${"nofollow"}">Google’s Site Performance for Webmasters video</a> way back in 2010, Maile Ohye says, “2 seconds is the threshold for e-commerce website acceptability.” In other words that’s when web users start clicking the “back” button just like you did. What if you are “on the go” and you were using your mobile phone? Statistics show that more than half of the web traffic in 2018 was from a mobile device, after all. According to <a href="${"https://think.storage.googleapis.com/docs/mobile-page-speed-new-industry-benchmarks.pdf"}" rel="${"nofollow"}">research</a> from Google, 53% of mobile site visitors leave a page that takes longer than three seconds to load.</p>
<p>So you’re probably like, “Kyler, that’s cool and all, but what does it have to with lazy-loading?” Well, lazy-loading can help eliminate these concerns.</p>
<h2 id="${"what-is-it"}">What is it?</h2><a href="${"#what-is-it"}"><span class="${"icon icon-link"}"></span></a>
<p>Now that we know why lazy loading is important, what exactly is it? In the context of Angular, lazy loading is a design pattern used to defer the initialization of modules until they are needed. It is a great strategy to reduce the time to interactive (TTI) of a single page application (SPA) and thereby provide a better user experience. TTI is a metric developed by Google that measures the amount of time between the point at which the page elements have loaded and the point at which those elements become interactive (usable).</p>
<h2 id="${"how-it-works"}">How it Works</h2><a href="${"#how-it-works"}"><span class="${"icon icon-link"}"></span></a>
<p>When a user navigates to a webpage that implements lazy loading, a request is made to the host server and all of the packets, or chunks, are sent in response and stored in the browser cache, lazy loaded modules included. Then, with the exception of the lazy loaded modules, the packets are assembled, parsed, and loaded, rendering the page. When lazy loaded content is needed to render the page, the browser makes a request to the browser cache for the necessary module and loads it.</p>
<h2 id="${"how-to-implement-it"}">How to Implement it</h2><a href="${"#how-to-implement-it"}"><span class="${"icon icon-link"}"></span></a>
<p>So how do you implement it? At a high level, you configure a parent route pointing to each feature module in your root module. Then, inside of each lazy loaded feature module, you associate child routes with components you want to render when the module is loaded. When one of them is needed, the Angular router loads it. To stay on track, I am only going to talk about the Angular router as it applies to lazy loading, but if you want to learn more about how it works, here’s a great <a href="${"https://blog.angularindepth.com/the-three-pillars-of-angular-routing-angular-router-series-introduction-fb34e4e8758e"}" rel="${"nofollow"}">post</a> from Nate Lapinski, a writer for <a href="${"https://indepth.dev/angular/"}" rel="${"nofollow"}">Angular In Depth</a>.</p>
<h2 id="${"sample-project-with-eager-loaded-modules"}">Sample Project with Eager-loaded Modules</h2><a href="${"#sample-project-with-eager-loaded-modules"}"><span class="${"icon icon-link"}"></span></a>
<p>You can find the code I will be referencing in the <a href="${"https://github.com/KylerJohnsonDev/ng-lazy-loading-demo"}" rel="${"nofollow"}">ng-lazy-loading-demo</a> repo on Github. In the master branch, you will find a CLI generated Angular app with a few added components. If you install the dependencies and run it, you will find a basic home page with some nav links at the top for a “Products” view and “Profile” view. Lazy loading has not been implemented yet, but let’s take a closer look so we can see how the architecture changes when it is implemented.</p>
<p>First, let’s take a look at the file structure. As you will see in the image below, three modules have been generated in the app folder, a core module and two feature modules. The core module contains two components, the nav component and the home component, while the profile module contains the profile component and the product module contains the product component. All three modules are exporting the components they contain.</p>
<pre class="${"language-undefined"}"><!-- HTML_TAG_START -->${`<code class="language-undefined">src/
└── app/
    ├── core/
    ├── product/
    ├── profile/
    ├── app-routing.module.ts
    ├── app.component.css
    ├── app.component.html
    ├── app.component.spec.ts
    ├── app.component.ts
    └── app.module.ts</code>`}<!-- HTML_TAG_END --></pre>
<p>Next, let’s take a look at the app.module.ts file to find out how our components are loaded. By convention, the core module is imported into the root module, but as we can see in the gist below, the <code>ProfileModule</code> and the <code>ProductModule</code> are, too, which means that they will all be loaded when the app initializes. In other words, they are all eager loaded — the opposite of lazy loaded.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> BrowserModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/platform-browser'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> NgModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> AppRoutingModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./app-routing.module'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> AppComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./app.component'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> CoreModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./core/core.module'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> BrowserAnimationsModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/platform-browser/animations'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ProfileModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./profile/profile.module'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ProductModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./product/product.module'</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">NgModule</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  declarations<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>
    BrowserModule<span class="token punctuation">,</span>
    AppRoutingModule<span class="token punctuation">,</span>
    CoreModule<span class="token punctuation">,</span>
    ProfileModule<span class="token punctuation">,</span>
    ProductModule<span class="token punctuation">,</span>
    BrowserAnimationsModule<span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  bootstrap<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Let’s also take a look at the app-routing.module.ts file so that we understand how the router state is defined based on the path, determining which component is rendered. As shown in the gist below, we have three URLs defined — these make up the router state configuration. This is how the Angular router is able to associate a URL with a component. When navigation occurs, the Angular router compares the URL with the path defined in the router state configuration. When it finds a matching URL, it renders the component associated with it. For example, navigating to <code>http://localhost:4200/product</code> renders the product component.</p>
<h2 id="${"sample-project-with-lazy-loaded-modules"}">Sample Project with Lazy-loaded Modules</h2><a href="${"#sample-project-with-lazy-loaded-modules"}"><span class="${"icon icon-link"}"></span></a>
<p>Now, if we checkout the <code>feature/lazy_loaded branch</code>, run it, open the network tab of the Chrome Dev Tools, and refresh the page we will see the same number of requests to load the page. Because the product module is lazy loaded, we can observe in the GIF below that the product-product-module.js packet is loaded in response to another request when we navigate to the products page. The same occurs when navigating to the profile page.</p>
<p><img src="${"/static/images/lazy-loading/lazy-loaded-module-in-dev-tools.gif"}" alt="${"Snapshot of Dev tools loading a module"}"></p>
<p>So what changes were made to our app in the <code>feature/lazy_loaded branch</code> to lazy load the product and profile modules?</p>
<p>First, let’s take a look at the <code>app.module.ts</code> file below. Notice that the <code>ProductComponent</code> and the <code>ProfileComponent</code> are no longer imported into the root module or included in the <code>declarations</code> array. This is because we do not want our app to load them until it needs them. If they were imported here, the product and profile modules and their components and services would be loaded when our app initializes no mater what we do.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> BrowserModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/platform-browser'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> NgModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span>

<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> AppRoutingModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./app-routing.module'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> AppComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./app.component'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> CoreModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./core/core.module'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> BrowserAnimationsModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/platform-browser/animations'</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">NgModule</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  declarations<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>BrowserModule<span class="token punctuation">,</span> AppRoutingModule<span class="token punctuation">,</span> CoreModule<span class="token punctuation">,</span> BrowserAnimationsModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  bootstrap<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Next, let’s take a look at the app-routing.module.ts file below. You will find that the route configurations have changed. Instead of associating the URL with a component to render, the URL is associated with a module to load.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> NgModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Routes<span class="token punctuation">,</span> RouterModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> HomeComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./core/home/home.component'</span>

<span class="token keyword">const</span> routes<span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token string">'profile'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">loadChildren</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./profile/profile.module'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token operator">=></span> m<span class="token punctuation">.</span>ProfileModule<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token string">'product'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">loadChildren</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./product/product.module'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token operator">=></span> m<span class="token punctuation">.</span>ProductModule<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span> component<span class="token operator">:</span> HomeComponent<span class="token punctuation">,</span> pathMatch<span class="token operator">:</span> <span class="token string">'full'</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">NgModule</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>RouterModule<span class="token punctuation">.</span><span class="token function">forRoot</span><span class="token punctuation">(</span>routes<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  exports<span class="token operator">:</span> <span class="token punctuation">[</span>RouterModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppRoutingModule</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>The route configurations in the gist above are generally referred to as parent routes. As previously mentioned, the Angular router looks for a route configuration that matches the URL, then loads the associated feature module. Each feature module will have its own route configurations, which are referred to as child routes, and are generally defined in a file named <code>[module-name]-routing.module.ts</code> by convention.</p>
<p>Let’s look at an example. If we run the app and navigate to <code>http://localhost:4200/profile</code>, the Angular router will search for matches in the app-routing.module.ts file and find the following route configuration, associating it with the profile module.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token punctuation">&#123;</span>
  path<span class="token operator">:</span> <span class="token string">'profile'</span><span class="token punctuation">,</span>
  <span class="token function-variable function">loadChildren</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./profile/profile.module'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>ProfileModule<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">,</span></code>`}<!-- HTML_TAG_END --></pre>
<p>When the profile module is loaded, the router will compare the URL with the child route configurations defined in the <code>profile-routing.module.ts</code> file. It understands that these are child routes because when the instance of the <code>RouterModule</code> is created and imported, it passes the <code>routes</code> array into the <code>.forChild()</code> method. As you can see in the gist below, there is only one route configuration, but we could define as many as needed here.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> NgModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Routes<span class="token punctuation">,</span> RouterModule <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ProfileComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./profile/profile.component'</span>

<span class="token keyword">const</span> routes<span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span> component<span class="token operator">:</span> ProfileComponent <span class="token punctuation">&#125;</span><span class="token punctuation">]</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">NgModule</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>RouterModule<span class="token punctuation">.</span><span class="token function">forChild</span><span class="token punctuation">(</span>routes<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  exports<span class="token operator">:</span> <span class="token punctuation">[</span>RouterModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ProfileRoutingModule</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Since there is nothing in the URL after ‘profile’, the router matches it with the empty child route in the gist above. This route configuration may look much more familiar to you, as the URL is associated with the <code>ProfileComponent</code>, which will be rendered when the module is finished loading.</p>
<h2 id="${"conclusion"}">Conclusion</h2><a href="${"#conclusion"}"><span class="${"icon icon-link"}"></span></a>
<p>In conclusion, lazy loading is one way for developers to decrease the TTI, improve the user experience, and reduce the bounce rate of their applications. There are 3 things I hope you can take away from this post:</p>
<ol><li><p>As Deborah Kurata so concisely articulated it in her <a href="${"https://www.youtube.com/watch?v=ntJ-P-Cvo7o"}" rel="${"nofollow"}">talk</a> from Ng-Conf 2017, there are three things you need to do in order to implement lazy loading in your application: use feature modules, group routes under a single parent, and do not import the feature modules into any other module.</p></li>
<li><p>Lazy loading does not decrease the overall size of your app; it decreases the number of packets, or chunks, that must be loaded before the initial page becomes usable.</p></li>
<li><p>Your entire application is still retrieved from the server before it is initially rendered and stored in the browser cache; however, Lazy loaded modules are not loaded initially. When they are needed, the browser makes a request to the browser cache to retrieve them.</p></li></ol>`;
});
export {
  Angular_lazy_loading as default,
  metadata
};
