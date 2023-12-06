import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "Functional Interceptors in Angular 15",
  "date": "2022-11-16",
  "description": "Angular v15 brings with it a new, functional way to write interceptors and register them in your standalone Angular application. This brief article shows you how.",
  "published": true,
  "tags": ["angular"]
};
const Functional_interceptors_angular_15 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h2 id="${"functional-interceptors-in-angular-15"}">Functional Interceptors in Angular 15</h2><a href="${"#functional-interceptors-in-angular-15"}"><span class="${"icon icon-link"}"></span></a>
<p>With the v15 release of Angular expected in mid-November, the <a href="${"https://angular.io/guide/standalone-components"}" rel="${"nofollow"}">standalone component API</a> will finally be considered stable. There will not be any breaking changes, as you can use standalone components, directives, and pipes in your module-based apps. No need to go and refactor all of your existing code.</p>
<p>However, if you choose to go with a standalone angular application (meaning you bootstrap your app without an AppModule), there will be some differences. You will need to use the new <code>provideHttpClient</code> API to register the <code>HttpClient</code> provider. To use interceptors with this setup, you will need to pass in the <code>withInterceptors</code> option including any interceptors.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token comment">// main.ts</span>

<span class="token function">bootstrapApplication</span><span class="token punctuation">(</span>AppComponent<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">provideRouter</span><span class="token punctuation">(</span>routes<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">provideHttpClient</span><span class="token punctuation">(</span><span class="token function">withInterceptors</span><span class="token punctuation">(</span><span class="token punctuation">[</span>sportsApiInterceptor<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Great! So now that you know how to register your interceptors in a standalone Angular application, it’s probably time to mention that the class-based interceptors you’re accustomed to will not work here. Instead, we need to define functional interceptors like so:</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token comment">// interceptors.ts</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> sportsApiInterceptor<span class="token operator">:</span> <span class="token function-variable function">HttpInterceptorFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>url<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">'api.sportsdata.io'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>req<span class="token punctuation">.</span>url<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">?key=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token constant">API_KEY</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span>
    <span class="token keyword">const</span> newReq <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span> url <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">next</span><span class="token punctuation">(</span>newReq<span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span>
  <span class="token keyword">return</span> <span class="token function">next</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>`;
});
export {
  Functional_interceptors_angular_15 as default,
  metadata
};
