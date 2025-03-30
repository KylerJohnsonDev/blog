---
title: Supercharge TS development with prettier and ESLint
date: '2023-01-07'
description: 'Learn how to set VS Code up to leverage prettier and ESLint to autoformat TypeScript code, auto-fix "fixable" problems, and auto-organize imports on file save.'
published: true
tags: ['VS Code', 'TypeScript', 'Prettier', 'ESLint']
ogType: 'article'
---

In this article, I walk you through how to set VS Code up to leverage prettier and ESLint to autoformat TypeScript code, auto-fix "fixable" problems, and auto-organize imports on file save (including auto-removal of unused imports).

_Note: This article assumes you're already working inside of a TypeScript project. If you already have Prettier and ESLint installed, skip to step 3._

1. Install Prettier as a dev dependency with `npm i -D --save-exact prettier`

2. Install ESLint as a dev dependency and configure it with `npm init @eslint/config`

   - You will be prompted to answer some questions:
     - How would you like to use ESLint? Select `To check syntax and find problems`.
     - What type of modules does your project use? Select `JavaScript Modules (import/export)`
     - Which framework does your project use? Select appropriate response for your project.
     - Does your project use TypeScript? Select `Yes`
     - Where does your code run? Select appropriate response for your project
     - What format do you want your conf file to be in? Select `JavaScript`
     - You will be prompted to install some ESLint plugins for TypeScript. Select `Yes` to install them.
     - Which package manager do you wan to use? We're using NPM for this article, so select `npm`.

3. Inside of VS Code, press `ctrl + shift + p` (`cmd + shift + p`) to open the command palette, type `user settings` and from the drop down list select `Preferences: Open User Settings (JSON)`. This allows you to specify your settings via JSON in one convenient location.

4. Inside of the brackets, paste the following:

```json
"editor.formatOnSave": true,
"[typescript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
"editor.codeActionsOnSave": {
  "source.fixAll": true,
  "source.organizeImports": true
},
```

Let's break it down.

First, we tell it with the `editor.formatOnSave` setting that we want it to run the specified default formatter when a file is saved. Next, we specify that we want Prettier to be the default formatter for TypeScript files.

Finally, we want to execute a couple of code actions when the file is saved. These actions are powered by ESLint. The `fixAll` setting will auto-fix any ESLint "fixable" problems. The `organizeImports` setting will organize your imports starting with framework imports, then node module imports, then imports from your project files. My favorite thing about this setting, though, is that it will auto-remove any unused imports when the file is saved (which is a massive help if your TypeScript build is configured to fail when you have unused imports).
