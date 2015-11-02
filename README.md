# Rough  🌴

A well-tested, boilerplate for developing new internet projects.

![Pablo Picasso, 1969 — Homme et femme- bustes](http://i.imgur.com/nSxXkO5.jpg)

## Features

Rough at its core is a gulp workflow based on these three tasks:

- `serve` starts a server, everything will compile and live-reload on changes
- `build` moves everything to `/dist` — compiled, minified and optimized
- `serve:dist` starts a server to test your build

Below the hood the following tasks are used. You can always call them directly, although it shouldn't be necessary.

- `templates` with Handlebars (and handlebars-layouts)
- `styles` with Sass (and libsass, autoprefixer & sourcemaps)
- `scripts` with Browserify and next-gen JavaScript with Babel
- `icons` with Grunticon for SVG icons
- `images` optimizes images and generates SVG icons with `icons`
- `critical` is used by build to inline critical-path CSS

See http://rough.surge.sh for a demo.

## Getting started

You can either [download](https://github.com/oskarrough/rough/archive/master.zip) or clone the project:

```
git clone https://github.com/oskarrough/rough.git
```

If you clone it, remember to remove the .git history (unless you're looking to contribute, of course).

```
cd rough
rm -rf .git
git init
```

Finally install the dependencies:

```
npm install; bower install
```

That's it. Check the features listed above or dive directly into the `gulpfile.babel.js` to see what tasks are available.

## Structure

- bower_components
- app/images
- app/images/icons
- app/scripts (own scripts go here)
- app/scripts/vendor (third party scripts that are not available through a package manager (e.g. npm/bower) go here)
- app/styles

## Extras

It also contains a few, optional features:

- Custom select styles
- Grids using Susy for the math
- Lazy loading and responsive images using lazysizes and picturefill
- Robust fluid grids combining Masonry and imagesLoaded
- Modernizr (use the link in the top of the file to customize it)

And base styles to cover many edge-cases.

- Normalize and base
- Component based styles structure
- Useful mixins/utilities for calculating rem/em etc.

## Styles

We use the Sass preprocessor written in .scss - all tabs, no spaces. All selectors and properties should be on their own lines.

Styles are divided into:

- Base
- Layout
- Utilities
- Components

Base styles can not contain any classes. This is the default elements and configuration as colors, layout measures etc.

Layout is your main site layout and grid systems.

Utilities are helpers to build your project. Could be for alignment, spacing or clearfixing etc.

Components are the parts that make up your project. They are based on the 'base', build with 'utilities' and placed into 'layout'. Components can also contain layout. Most components are unique to a project.

## Naming convention

We closely follow [SUIT's naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md).

## Icons

We are using grunticon-cli to handle icons and svg sprites. There's a `gulp icons` task that compiles all .svg (and png) images from `app/images/icons` to `.tmp/styles/icons/` that contains all icons as inline images, referenced with a CSS class. It automatically runs when you `gulp serve` or `gulp build`.

For example, to use a `example-icon.svg` icon, you could add an element `<i class="icon icon-example-icon"></i>`.

Grunticon includes a `grunticon.loader.js` which is referenced in the head of your `index.html`. It will load the appropriate sprite method depending on your browser. Don't worry, it works.

The `app/styles/base/_icons.scss` file contains a few base styles to make styling icons easier.

## Trouble in paradise?

Here's the nuclear method:

`rm -rf bower_components node_modules; npm cache clean; bower cache clean; npm install; bower i`
