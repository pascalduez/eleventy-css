## JS template

```
.
├── .eleventy.js
├── _includes
│   └── base.njk
├── index.md
├── main.11ty.js
├── package.json
├── postcss.config.js
└── styles
    └── index.css
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
module.exports = config => {
  config.addWatchTarget('styles/');
};
```

#### `_includes/base.njk`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/styles/main.css" />
  </head>
  <body>
    {{ content | safe }}
  </body>
</html>
```

#### `main.11ty.js`

```js
const { readFile } = require('fs').promises;
const postcssrc = require('postcss-load-config');
const postcss = require('postcss');

module.exports = class {
  data() {
    return {
      permalink: 'styles/main.css',
    };
  }

  async render() {
    let { plugins, options } = await postcssrc();
    let content = await readFile('styles/index.css');
    let result = await postcss(plugins).process(content, options);

    return result.css;
  }
};
```

#### `index.md`

```html
---
layout: base
---

<h1>11ty stylesheets</h1>
```

### Cons

- Triggers a full website build on every css change
- **Might** triggers a full page reload (depending on setup)

### Pros

- No extra dependencies / builders etc.
- Fit for a large CSS codebase
- CSS processing gets run only once
- Extensible
