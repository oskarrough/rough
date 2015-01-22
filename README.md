# Rough boilerplate

This is a gulp-based setup that allows you to easily:

- Use Sass
- Use Jade templating
- Use Grunticon for easy svg icons
- Minify and concatenate all scripts and styles
- Autoprefixer, so you don't have to write prefixes yourself
- Image optimization runs automatically on build
- Refresh the browser when files change

It also contains a few useful recipies:

- Custom <select> styles
- Grids using Susy for the math
- Lazy loading of (responsive) images using lazysizes
- Wrapper for robust fluid Masonry layouts with imagesLoaded
- Responsive Tabs

And base styles to cover many edge-cases:

- Component based scss structure
- Normalize and base
- A few useful mixins/utilities

This project leans heavily on the great Yeoman Gulp and Grunt webapps. If you're not interested in the extra baked-in recipies here, you're probably be better of with the default Yeoman apps.

## Getting started

1. Clone or download the project

`git clone https://github.com/oskarrough/rough.git`

2. Remove the git history to start fresh for your new project (unless you're looking to contribute, of course)

`cd rough`
`rm -rf .git`
`git init`

3. Install dependencies:

**If you haven't already, first install these as they are necessary to install the rest.**

- Node --> `brew install node` (for node/js packages)
- Grunt --> `npm install -g grunt-cli` (for development)
- Bower --> `npm install -g bower` (for front-end packages)
- Bundler --> `sudo gem install bundler` (for ruby/gem packages)

Or in one command: `brew install node; sudo gem install bundler; npm install -g bower grunt-cli`

**Install the rest of the dependencies using the tools you just installed**

- `bundle install` --> installs everything from Gemfile
- `npm install` -->  installs everything from package.json
- `bower install` --> installs everything from bower.json

Or in one command: `bundle install; npm install; bower install`

## Structure

- bower_components
- app/images
- app/images/icons
- app/scripts (own scripts go here)
- app/scripts/vendor (third party scripts that are not available through a package manager (e.g. bower) go here)
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

## Style linting

We provide a way to check your sass styles for errors and consistency using the scss-lint gem. You already have it, if you previously ran `bundle install`. To run, do `scss-lint app/styles`.

We've defined default settings in the `.scss-lint.yml` file which you can safely change to your project preferences.

## Icons

We are using Grunticon to handle icons and svg sprites. There's a `gulp icons` task that compiles all .svg (and png) images from `app/images/icons` to `.tmp/styles/icons/` that contains all icons as inline images, referenced with a CSS class. It automatically runs when you `gulp serve` or `gulp build`.

For example, to use a `example-icon.svg` icon, you could add an element `<i class="icon icon-example-icon"></i>`.

Grunticon includes a `grunticon.loader.js` which is referenced in the head of your `index.html`. It will load the appropriate sprite method depending on your browser. Don't worry, it works.

The `app/styles/base/_icons.scss` file contains a few base styles to make styling icons easier.

## Trouble in paradise?

Here's the nuclear method:

`rm -rf bower_components node_modules; npm cache clean; bower cache clean; npm install; bower i; bundle install`
