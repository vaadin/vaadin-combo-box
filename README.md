# &lt;vaadin-combo-box&gt;

> ⚠️ Starting from Vaadin 20, the source code and issues for this component are migrated to the [`vaadin/web-components`](https://github.com/vaadin/web-components/tree/master/packages/vaadin-combo-box) monorepository.
> This repository contains the source code and releases of `<vaadin-combo-box>` for the Vaadin versions 10 to 19.

[&lt;vaadin-combo-box&gt;](https://vaadin.com/components/vaadin-combo-box) is a Web Component combining a dropdown list with an input field for filtering the list of items, part of the [Vaadin components](https://vaadin.com/components).

[Live Demo ↗](https://vaadin.com/components/vaadin-combo-box/html-examples)
|
[API documentation ↗](https://vaadin.com/components/vaadin-combo-box/html-api)

[![npm latest version](https://badgen.net/npm/v/@vaadin/vaadin-combo-box/latest)](https://www.npmjs.com/package/@vaadin/vaadin-combo-box)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-combo-box)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-combo-box)
[![Discord](https://img.shields.io/discord/732335336448852018?label=discord)](https://discord.gg/PHmkCKC)

<!--
```
<custom-element-demo height="300">
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="vaadin-combo-box.html">
    <custom-style>
      <style>
        vaadin-combo-box {
          width: 300px;
        }
      </style>
    </custom-style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<vaadin-combo-box label="User" placeholder="Please select" item-value-path="email" item-label-path="email"></vaadin-combo-box>

<script>
  const comboBox = document.querySelector('vaadin-combo-box');

  fetch('https://randomuser.me/api?results=100&inc=name,email')
    .then(res => res.json())
    .then(json => comboBox.items = json.results);
</script>
```

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-combo-box/master/screenshot.png" width="208" alt="Screenshot of vaadin-combo-box" />](https://vaadin.com/components/vaadin-combo-box)

## Installation

The Vaadin components are distributed as Bower and npm packages.
Please note that the version range is the same, as the API has not changed.
You should not mix Bower and npm versions in the same application, though.

Unlike the official Polymer Elements, the converted Polymer 3 compatible Vaadin components
are only published on npm, not pushed to GitHub repositories.

### Polymer 2 and HTML Imports Compatible Version

Install `vaadin-combo-box`:

```sh
bower i vaadin/vaadin-combo-box --save
```

Once installed, import it in your application:

```html
<link rel="import" href="bower_components/vaadin-combo-box/vaadin-combo-box.html">
```
### Polymer 3 and ES Modules Compatible Version

Install `vaadin-combo-box`:

```sh
npm i @vaadin/vaadin-combo-box --save
```

Once installed, import it in your application:

```js
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
```

## Getting Started

Vaadin components use the Lumo theme by default.

To use the Material theme, import the correspondent file from the `theme/material` folder.

## Entry points

- The components with the Lumo theme:

  `theme/lumo/vaadin-combo-box.html`
  `theme/lumo/vaadin-combo-box-light.html`

- The components with the Material theme:

  `theme/material/vaadin-combo-box.html`
  `theme/material/vaadin-combo-box-light.html`

- Alias for `theme/lumo/vaadin-combo-box.html`
  `theme/lumo/vaadin-combo-box-light.html`

  `vaadin-combo-box.html`
  `vaadin-combo-box-light.html`


## Running demos and tests in a browser

1. Fork the `vaadin-combo-box` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) and [Bower](https://bower.io) installed.

1. When in the `vaadin-combo-box` directory, run `npm install` and then `bower install` to install dependencies.

1. Run `npm start`, browser will automatically open the component API documentation.

1. You can also open demo or in-browser tests by adding **demo** or **test** to the URL, for example:

  - http://127.0.0.1:3000/components/vaadin-combo-box/demo
  - http://127.0.0.1:3000/components/vaadin-combo-box/test


## Running tests from the command line

1. When in the `vaadin-combo-box` directory, run `polymer test`


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `npm run lint`, which will automatically lint all `.js` files as well as JavaScript snippets inside `.html` files.


## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com).


## Contributing

  To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.


## License

Apache License 2.0

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
