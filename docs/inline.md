## Inline

```
.
├── .eleventy.js
├── package.json
├── postcss.config.js
├── _includes
│   ├── base.njk
│   └── index.css
└── index.md

```

#### `package.json`

```json
"scripts": {
  "serve": "NODE_ENV=development eleventy --serve",
  "build": "NODE_ENV=production eleventy",
},
"devDependencies": {
  "@11ty/eleventy": "^0.10.0",
  "cssnano": "^4.1.10",
  "postcss": "^7.0.27",
  "postcss-load-config": "^2.1.0",
  "postcss-preset-env": "^6.7.0",
}
```

#### `postcss.config.js`

```js
module.exports = ({ env }) => ({
  plugins: {
    'postcss-preset-env': {},
    ...(env === 'production' && { cssnano: {} }),
  },
});
```

#### `.eleventy.js`

```js
const postcss = require('postcss');
const postcssrc = require('postcss-load-config');

module.exports = config => {
  config.addNunjucksAsyncFilter('postcss', async (content, callback) => {
    let { plugins, options } = await postcssrc();
    let result = await postcss(plugins).process(content, options);
    callback(null, result.css);
  });
};
```

#### `_includes/base.njk`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    {% set css %} {% include "index.css" %} {% endset %}
    <style>
      {{ css | postcss | safe }}
    </style>
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```

#### `index.md`

```html
---
layout: base
---

<h1>11ty stylesheets</h1>
```

### Cons

- No fit for a large CSS codebase
- Triggers a full website build on every css change
- CSS processing get re-run for every output html file
- Triggers a full page reload

### Pros

- No extra dependencies / builders etc.
- No extra HTTP request
- Might be handy for critical path CSS inlining
