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

This rough boilerplate is very similar to [yeoman/generator-webapp](https://github.com/yeoman/generator-webapp) in being a gulp workflow based on three scripts:

1. `npm start` starts a local server, everything will compile and live-reload on changes
2. `npm run build` moves everything to `/dist` — compiled, minified and optimized. Ready for deployment
3. `npm test`lints your styles and scripts and runs tests (by default there's a test to ensure your project compiles and builds)

Below the hood the following tasks are used. You can always call them directly, although it shouldn't be necessary.

- `gulp templates` with Handlebars (and handlebars-layouts)
- `gulp styles` with Sass (and libsass, autoprefixer & sourcemaps + easy imports from npm modules)
- `gulp scripts` with Browserify, Rollup and next-gen JavaScript with Babel
- `gulp icons` with Grunticon for SVG icons
- `gulp images` optimizes images and generates SVG icons with `icons`
- `gulp critical` is used by build to inline critical-path CSS
- `gulp rev` to revision static assets for better caching
- `gulp serve:dist` to test what you just build locally

## Structure

- app/images
- app/images/icons (svg icons)
- app/images/favicons (moved to root on build)
- app/styles
- app/scripts
- app/scripts/vendor (for modules not available through npm)
- app/fonts (webfonts)

## Extras

It also contains a few *optional* features:

- Custom select styles
- Grids using Susy for the math
- Lazy loading and responsive images using lazysizes and picturefill
- Modernizr (use the link in the top of the file to customize it)

And base styles to cover many edge-cases.

- SUIT CSS base (extends normalize.css)
- Component based styles structure
- Useful mixins/utilities for calculating rem/em etc.

## Styles

Stylesheets are compiled from SCSS and divided into:

- Base
- Utilities
- Components
- Layout

**Base** styles are not allowed to use class selectors. The base is for styling default elements and configuration as colors, layout measures etc.

**Utilities** are helpers to build your project. Could be for alignment, spacing or clearfixing etc.

**Components** are the parts that make up your project. They are based on the 'base', build with 'utilities' and placed into 'layout'. Components can also contain layout. Most components are unique to a project.

**Layout** is your main layout and grid systems. Keep this as small as possible because it is not reusable. Attempt to (re)use components and utilities instead.

## Naming convention

We closely follow [SUIT's naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md).

## Icons

We are using grunticon-cli to handle icons and svg sprites. There's a `gulp icons` task that compiles all .svg (and png) icons that you place in `app/images/icons`. Grunticon will merge them into a single CSS file that is then loaded async. It automatically runs as you  `gulp serve` or `gulp build`. Grunticon includes a `grunticon.loader.js` which is referenced in the head of your `index.html`. It will load the appropriate sprite method depending on your browser. Don't worry, it works.

For example, to use a `example-icon.svg` icon, you could the element `<i class="icon-example-icon"></i>`.

The `app/styles/base/_icons.scss` file contains a few base styles to make styling icons easier.

## Trouble in paradise?

Are you on node >5? Please try the the nuclear method: `rm -rf node_modules; npm cache clean; npm install`
