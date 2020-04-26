## External build

```
.
├── .eleventy.js
├── _includes
│   └── base.njk
├── index.md
├── package.json
├── postcss.config.js
└── styles
    └── index.css
```

#### `package.json`

```json
"scripts": {
  "css:build": "postcss styles/index.css -o _site/styles/main.css --no-map --verbose",
  "11ty:serve": "eleventy --serve",
  "11ty:build": "eleventy",
  "serve": "NODE_ENV=development run-p 11ty:serve 'css:build --watch'",
  "build": "NODE_ENV=production run-p 11ty:build css:build"
},
"devDependencies": {
  "@11ty/eleventy": "^0.10.0",
  "cssnano": "^4.1.10",
  "npm-run-all": "^4.1.5",
  "postcss": "^7.0.27",
  "postcss-cli": "^7.1.0",
  "postcss-load-config": "^2.1.0",
  "postcss-preset-env": "^6.7.0"
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
  config.setBrowserSyncConfig({
    files: ['_site/styles'],
  });
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

#### `index.md`

```html
---
layout: base
---

<h1>11ty stylesheets</h1>
```

### Cons

- Adds a few building dependencies (postcss-cli, npm-run-all)

### Pros

- Extensible
- CSS processing gets run only once
- Fit for a large CSS codebase
- Don't triggers a full website build on every css change
- True hot reload
