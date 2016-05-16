# Rough

A well-tested, boilerplate for developing new internet projects --> http://rough.surge.sh

![Pablo Picasso, 1969 — Homme et femme- bustes](http://i.imgur.com/nSxXkO5.jpg)

![](https://travis-ci.org/oskarrough/rough.svg) ![](https://david-dm.org/oskarrough/rough.svg)

## Getting started

Make sure your `node -v` is at least 5. Then do:

```bash
curl -sL https://github.com/oskarrough/rough/archive/master.zip | tar xz
cd rough-master
npm install
npm start
```

That's it. Check the features listed below or dive directly into the `package.json` and `gulpfile.js` to see what scripts and tasks are available.

## Features

1. `npm start` starts a local server, everything will compile and live-reload on changes
2. `npm run build` moves everything to `/dist` — compiled, minified and optimized. Ready for deployment
3. `npm test`lints your styles and scripts and runs tests (by default there's a test to ensure your project compiles and builds)

Below the hood the following tasks are used. You can always call them directly, although it shouldn't be necessary.

- `gulp templates` with Handlebars (and handlebars-layouts)
- `gulp styles` with Sass (and libsass, autoprefixer & sourcemaps + easy imports from npm modules)
- `gulp scripts` with Browserify, Rollup and next-gen JavaScript with Babel
- `gulp critical` is used by build to inline critical-path CSS
