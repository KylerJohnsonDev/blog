import { c as create_ssr_component } from "./index2.js";
const metadata = {
  "title": "Supercharge TS development with prettier and ESLint",
  "date": "2023-01-07",
  "description": 'Learn how to set VS Code up to leverage prettier and ESLint to autoformat TypeScript code, auto-fix "fixable" problems, and auto-organize imports on file save.',
  "published": true,
  "tags": ["VS Code", "TypeScript", "Prettier", "ESLint"]
};
const Super_charge_ts_dev_with_prettier_and_eslint = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p>In this article, I walk you through how to set VS Code up to leverage prettier and ESLint to autoformat TypeScript code, auto-fix “fixable” problems, and auto-organize imports on file save (including auto-removal of unused imports).</p>
<p><em>Note: This article assumes you’re already working inside of a TypeScript project. If you already have Prettier and ESLint installed, skip to step 3.</em></p>
<ol><li><p>Install Prettier as a dev dependency with <code>npm i -D --save-exact prettier</code></p></li>
<li><p>Install ESLint as a dev dependency and configure it with <code>npm init @eslint/config</code></p>
<ul><li>You will be prompted to answer some questions:<ul><li>How would you like to use ESLint? Select <code>To check syntax and find problems</code>.</li>
<li>What type of modules does your project use? Select <code>JavaScript Modules (import/export)</code></li>
<li>Which framework does your project use? Select appropriate response for your project.</li>
<li>Does your project use TypeScript? Select <code>Yes</code></li>
<li>Where does your code run? Select appropriate response for your project</li>
<li>What format do you want your conf file to be in? Select <code>JavaScript</code></li>
<li>You will be prompted to install some ESLint plugins for TypeScript. Select <code>Yes</code> to install them.</li>
<li>Which package manager do you wan to use? We’re using NPM for this article, so select <code>npm</code>.</li></ul></li></ul></li>
<li><p>Inside of VS Code, press <code>ctrl + shift + p</code> (<code>cmd + shift + p</code>) to open the command palette, type <code>user settings</code> and from the drop down list select <code>Preferences: Open User Settings (JSON)</code>. This allows you to specify your settings via JSON in one convenient location.</p></li>
<li><p>Inside of the brackets, paste the following:</p></li></ol>
<pre class="${"language-json"}"><!-- HTML_TAG_START -->${`<code class="language-json"><span class="token property">"editor.formatOnSave"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token property">"[typescript]"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
  <span class="token property">"editor.defaultFormatter"</span><span class="token operator">:</span> <span class="token string">"esbenp.prettier-vscode"</span>
<span class="token punctuation">&#125;</span>
<span class="token property">"editor.codeActionsOnSave"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
  <span class="token property">"source.fixAll"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"source.organizeImports"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">,</span></code>`}<!-- HTML_TAG_END --></pre>
<p>Let’s break it down.</p>
<p>First, we tell it with the <code>editor.formatOnSave</code> setting that we want it to run the specified default formatter when a file is saved. Next, we specify that we want Prettier to be the default formatter for TypeScript files.</p>
<p>Finally, we want to execute a couple of code actions when the file is saved. These actions are powered by ESLint. The <code>fixAll</code> setting will auto-fix any ESLint “fixable” problems. The <code>organizeImports</code> setting will organize your imports starting with framework imports, then node module imports, then imports from your project files. My favorite thing about this setting, though, is that it will auto-remove any unused imports when the file is saved (which is a massive help if your TypeScript build is configured to fail when you have unused imports).</p>`;
});
export {
  Super_charge_ts_dev_with_prettier_and_eslint as default,
  metadata
};
