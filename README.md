# Rough

A well-tested, boilerplate for developing new internet projects.

![Pablo Picasso, 1969 — Homme et femme- bustes](http://i.imgur.com/nSxXkO5.jpg)

![](https://travis-ci.org/oskarrough/rough.svg) ![](https://david-dm.org/oskarrough/rough.svg)

## Features

Rough at its core is a gulp workflow based on these two tasks:

- `serve` starts a local server, everything will compile and live-reload on changes
- `build` moves everything to `/dist` — compiled, minified and optimized. Ready for deployment
- `serve:dist` starts a server to test your build

Below the hood the following tasks are used. You can always call them directly, although it shouldn't be necessary.

- `templates` with Handlebars (and handlebars-layouts)
- `styles` with Sass (and libsass, autoprefixer & sourcemaps)
- `scripts` with Browserify and next-gen JavaScript with Babel
- `icons` with Grunticon for SVG icons
- `images` optimizes images and generates SVG icons with `icons`
- `critical` is used by build to inline critical-path CSS
- `rev` to revision static assets for better caching

See http://rough.surge.sh for a demo.

## Getting started

Make sure you have at least node > 5 installed. Check by doing `node -v`. To use it, [download it](https://github.com/oskarrough/rough/archive/master.zip) and run `npm install` inside the directory.

That's it. Check the features listed above or dive directly into the `gulpfile.js` to see what tasks are available.

## Structure

- app/images
- app/images/icons (svg icons)
- app/styles
- app/scripts
- app/scripts/vendor (for modules not available through npm)
- app/fonts (webfonts)

## Extras

It also contains a few *optional* features:

- Custom select styles
- Grids using Susy for the math
- Lazy loading and responsive images using lazysizes and picturefill
- Robust fluid grids combining Masonry and imagesLoaded
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
