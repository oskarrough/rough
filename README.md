# Rough boilerplate

This is a well-tested, modern boilerplate for new web projects and exists because it's rather an opinionated setup, with several default components ready to go.

See http://rough.surge.sh for a demo.

- `templates` with Handlebars (and handlebars-layouts) or Jade
- `styles` with Sass (and libsass, autoprefixer & sourcemaps)
- `scripts` with Browserify and next-gen JavaScript with Babel
- `icons` with Grunticon for SVG icons
- `images` optimizes images and generates SVG icons with `icons`
- `serve` BrowserSync live-reloading and more
- `build` moves everything to `/dist`, compiled, minified and optimized
- `critical` inlines critical-path CSS after you build (optional)
- `serve:dist` starts a server to test your build

It also contains a few, optional features:

- Custom select styles
- Grids using Susy for the math
- Lazy loading and responsive images using lazysizes
- Wrapper for robust fluid grids using Masonry with imagesLoaded

And base styles to cover many edge-cases:

- Normalize and base
- Component based styles structure
- Useful mixins/utilities for calculating rem/em etc.

## Getting started

1. Clone or download the project

`git clone https://github.com/oskarrough/rough.git`

2. Remove the git history to start fresh for your new project (unless you're looking to contribute, of course)

`cd rough`
`rm -rf .git`
`git init`

3. Install dependencies:

```
brew install node; npm install -global bower gulp
npm install; bower install
```

## Structure

- bower_components
- app/images
- app/images/icons
- app/scripts (own scripts go here)
- app/scripts/vendor (third party scripts that are not available through a package manager (e.g. npm/bower) go here)
- app/styles

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
