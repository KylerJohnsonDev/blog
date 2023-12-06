import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "Build your Angular App Once, Deploy Anywhere",
  "date": "2020-09-17",
  "description": "Want to build your Angular app once and deploy anywhere? Learn why compile-time configuration isn't enough and how we can load configuration at run-time.",
  "published": true,
  "tags": ["Angular"],
  "canonicalUrl": "https://indepth.dev/posts/1338/build-your-angular-app-once-deploy-anywhere"
};
const Build_once_deploy_anywhere = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p><img src="${"/static/images/build-once-deploy-anywhere/header-image.webp"}" alt="${"Worker with Toolbox"}"></p>
<p>Originally posted on InDepth Dev <a href="${"https://indepth.dev/posts/1338/build-your-angular-app-once-deploy-anywhere"}" rel="${"nofollow"}">here</a>. Header image by InDepth Dev.</p>
<p>We’re building an Angular application and when we merge new code into the master branch of our git repo, we want our build tool (like Jenkins) to grab the latest code and build our deployment package for us. With our deployment package built (A.K.A the dist folder), we want to head over to our deployment tool (like Octopus), select an environment to which we want to deploy our app, click a “deploy” button, and trust it to deploy our package, replacing our environment variables in a config file with values specific to the selected environment.</p>
<h2 id="${"what-we-need-to-achieve-this"}">What We Need to Achieve This</h2><a href="${"#what-we-need-to-achieve-this"}"><span class="${"icon icon-link"}"></span></a>
<p>We need a configuration file that we can access from our Angular code at runtime — which means it has to exist in the dist folder we intend to deploy. We need it there because we want to configure our deployment tool to replace the values of the environment variables within with values specific to the environment we deploy to.</p>
<h2 id="${"why-angulars-environment-files-are-not-the-solution"}">Why Angular’s Environment Files Are Not The Solution</h2><a href="${"#why-angulars-environment-files-are-not-the-solution"}"><span class="${"icon icon-link"}"></span></a>
<p>Let’s say we are using the environment files for our configuration as described <a href="${"https://angular.io/guide/build"}" rel="${"nofollow"}">here</a>. If we run ng build and look inside of the dist folder, we do not see any of the environment files there. Because this is a compile-time solution, the configuration settings in the environment files are pulled into the minified JS bundles in the dist folder. We cannot easily configure our build tool to edit our environment variables if we cannot point it toward a file to edit. In short, this does not work with the “build once, deploy anywhere” model. To do this, our app needs to resolve configuration data at runtime instead of compile time.</p>
<h2 id="${"how-to-get-it-done"}">How to Get it Done</h2><a href="${"#how-to-get-it-done"}"><span class="${"icon icon-link"}"></span></a>
<p>Luckily, there is a rather quick solution. All we have to do is:</p>
<ol><li><p>Add a JSON configuration file in the src folder</p></li>
<li><p>Update our angular/webpack configuration to include the file in our dist folder</p></li>
<li><p>Add a simple configuration service with a call to get our config data from our config file</p></li>
<li><p>Use APP_INITIALIZER to invoke the method retrieving our config data during the bootstrap process</p></li></ol>
<p><strong>Side note: Placing our configuration in a JSON file makes configuring our deployment tool easier because many of them (like Octopus) have native support for replacing values in JSON files.</strong></p>
<h2 id="${"adding-the-config-file"}">Adding the config file</h2><a href="${"#adding-the-config-file"}"><span class="${"icon icon-link"}"></span></a>
<p>There isn’t much to this step. We’re simply going to add a file named app-config.json and populate it with the following JSON.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token punctuation">&#123;</span>
    <span class="token string-property property">"api"</span> <span class="token operator">:</span> <span class="token string">"http://localhost:5000/"</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<h2 id="${"ensuring-the-config-file-is-copied-to-the-dist-folder"}">Ensuring the config file is copied to the dist folder</h2><a href="${"#ensuring-the-config-file-is-copied-to-the-dist-folder"}"><span class="${"icon icon-link"}"></span></a>
<p>To achieve this, we need to make an addition to the webpack configuration in the angular.json file. We need to add the path to our config file to the <code>assets</code> array in the webpack <code>build</code> configuration.</p>
<p><img src="${"/static/images/build-once-deploy-anywhere/angularjson.png"}" alt="${"angular.json"}"></p>
<h2 id="${"building-the-service"}">Building the service</h2><a href="${"#building-the-service"}"><span class="${"icon icon-link"}"></span></a>
<p>This is a simple service with a private property and two methods — one that sets the property and another that exposes the config data for the rest of your app. We can type the config object with an interface to help ensure we get what we expect from the JSON config file.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  providedIn<span class="token operator">:</span> <span class="token string">'root'</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ConfigService</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> configuration<span class="token operator">:</span> AppConfig

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> httpClient<span class="token operator">:</span> HttpClient<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

  <span class="token function">setConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>AppConfig<span class="token operator">></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>httpClient
      <span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span>AppConfig<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">'./app-config.json'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">toPromise</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>configuration <span class="token operator">=</span> config<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">readConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> AppConfig <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>configuration
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Notice that the <code>setConfigData</code> method returns a promise? The initialization of our app will not complete until all promises are resolved so by returning a promise here, we’re ensuring that the config data will be available when the rest of our app loads up and needs to use it.</p>
<h2 id="${"lets-take-a-look"}">Let’s take a look</h2><a href="${"#lets-take-a-look"}"><span class="${"icon icon-link"}"></span></a>
<p>With that in place, let’s set up the <code>APP_INITIALIZER</code>. According to the docs, <code>APP_INITIALIZER</code> is an injection token that allows us to invoke functions during the bootstrapping process of our application. To do that, we add the <code>ConfigService</code> and <code>APP_INITIALIZER</code> token as providers in app.module.ts.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token keyword">const</span> <span class="token function-variable function">appInitializerFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>configService<span class="token operator">:</span> ConfigService<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> configService<span class="token punctuation">.</span><span class="token function">setConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">NgModule</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  declarations<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>BrowserModule<span class="token punctuation">,</span> AppRoutingModule<span class="token punctuation">,</span> HttpClientModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
    ConfigService<span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span>
      provide<span class="token operator">:</span> <span class="token constant">APP_INITIALIZER</span><span class="token punctuation">,</span>
      useFactory<span class="token operator">:</span> appInitializerFn<span class="token punctuation">,</span>
      multi<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      deps<span class="token operator">:</span> <span class="token punctuation">[</span>ConfigService<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  bootstrap<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Note that we need to use a factory function to create an instance of our <code>ConfigService</code> and call the <code>setConfig</code> method on it.</p>
<p>Now, to ensure that this worked as expected, we can inject our <code>ConfigService</code> into the <code>AppComponent</code> and call our <code>readConfig</code> method to get the config object.</p>
<pre class="${"language-typescript"}"><!-- HTML_TAG_START -->${`<code class="language-typescript"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
  templateUrl<span class="token operator">:</span> <span class="token string">'./app.component.html'</span><span class="token punctuation">,</span>
  styleUrls<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'./app.component.scss'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">&#123;</span>
  config<span class="token operator">:</span> AppConfig

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> configService<span class="token operator">:</span> ConfigService<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

  <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>config <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>configService<span class="token punctuation">.</span><span class="token function">readConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`}<!-- HTML_TAG_END --></pre>
<p>In our app.component.html file, we will just remove all of the default boilerplate HTML and add the following to display our config data.</p>
<p>If we run our app locally with <code>ng serve</code>, we will see our JSON configuration object rendered on the webpage.</p>
<pre class="${"language-html"}"><!-- HTML_TAG_START -->${`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>&#123;&#123; config | json &#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<p>To see a working example, take a look at the <a href="${"https://github.com/KylerJohnsonDev/ng-runtime-config"}" rel="${"nofollow"}">Github Repo</a>.</p>
<h2 id="${"drawbacks-to-this-approach"}">Drawbacks to this approach</h2><a href="${"#drawbacks-to-this-approach"}"><span class="${"icon icon-link"}"></span></a>
<p>There are a few drawbacks we should be aware of when taking this approach. Because we’re loading our configuration data as a provider in our <code>AppModule</code>, we do not have access to it until after our app is bootstrapped. In other words, our configuration data will be there for use in our application as we saw above, but it will not be available if we need it in order to load a module at startup. This is exactly the limitation <a href="${"https://indepth.dev/authors/1010/timdeschryver"}" rel="${"nofollow"}">Tim Deschryver</a> ran into when trying to load an <code>ApplicationInsightsModule</code> at startup that depended on configuration data. If this is your use case, read about how he solved it in his post, <a href="${"https://admin.indepth.dev/build-once-deploy-to-multiple-environments/"}" rel="${"nofollow"}">Build once deploy to multiple environments</a>.</p>
<p>Another potential drawback is that our <code>AppModule</code> cannot fully initialize until our configuration service returns a promise containing the configuration data. Depending on how long the network request takes, it could cause a noticeable delay in loading our web app for the end user. If you do not need configuration data during the bootstrapping process and you have a landing page that does not depend on any network calls, you can load configuration data when your landing page initializes to decrease initial load time.</p>
<h2 id="${"recap"}">Recap</h2><a href="${"#recap"}"><span class="${"icon icon-link"}"></span></a>
<p>To summarize, environment files are great for compile time configuration, but not for the run-time configuration necessary for the “build once, deploy anywhere” CI/CD model. To solve this, we added a JSON config file, ensured that it would be copied into the dist folder, added a service to retrieve the configuration data, and ensured that it would be fetched as our <code>AppModule</code> initializes.</p>
<p>This approach is easy to implement using what Angular provides out-of-the-box, but (as with anything) we always want to be aware of the drawbacks. The important thing to keep in mind here is that if you need to load a module at startup that depends on configuration data, this approach will not work for you. Happy coding!</p>`;
});
export {
  Build_once_deploy_anywhere as default,
  metadata
};
