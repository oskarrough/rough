# Rough boilerplate

Structure for new projects with a few useful extras. If you only want the server/building you'd be better of with the default Yeoman gulp/grunt webapps. This project adds extra markup, styles and scripts for commonly used features so it's super fast to use them - and they're tested and being used in many sites. Please delete everything you don't need.

## Features

- Everything from generator-webapp (server, testing, build etc)
- Navigation toggles
- jQuery waypoints integration
- Scroll nav

- Grunt setup (closely follows Yeoman webapps)
-- Livereload, autoprefixer, image optimization, minification and everything else
-- Jade templating with blocks, layout and includes for easier templating

- Base Sass styles
-- Proper structure
-- Naming convention (from suit)
-- Useful mixins and patterns
-- Susy for layout math
-- Vertical alignment
-- Equal tabs
-- Media block
-- Vertical alignment

- Components
-- Responsive tabs
-- Masonry (ready with imagesLoaded and responsive, fluid grid styles)
-- Scrolling one-pager with sticky navigation and smooth scrolling between sections

- Recipies
-- Common featured ready to be copy/pasted

## Getting started

1. Clone or download the project

`git clone https://github.com/oskarrough/rough.git`

2. Remove the git history to start fresh for your new project (unless you're looking to contribue to this project, of course)

`cd rough`
`rm -rf .git` (delete the .git folder inside the folder you just)
`git init`

3. Install dependencies:

**First install these as they are used to install the rest.**

- Node --> `brew install node` (for node/js packages)
- Grunt --> `npm install -g grunt-cli` (for development)
- Bower --> `npm install -g bower` (for front-end packages)
- Bundler --> `sudo gem install bundler` (for ruby/gem packages)

Or in one command: `brew install node; sudo gem install bundler; npm install -g bower grunt-cli`

**Install the rest of the dependencies using the tools you just installed**

- `bundle install` --> installs everything from Gemfile
- `npm install` -->  installs everything from package.json
- `bower install` --> installs everything from bower.json

In one command: `bundle install; npm install; bower install`

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

We are using Grunticon to handle icons and svg sprites. There's a `grunt icons` task that compiles all .svg (and png) images from `app/images/icons` to `.tmp/styles/icons/` that contains all icons as inline images, referenced with a CSS class.

For example, to use a `social-facebook.svg` icon you add an element like this `<i class="icon icon-social-facebook"></i>`.

Grunticon includes a `grunticon.loader.js` which is in the head of your `index.html`. It will load the appropriate sprite method depending on your browser. Don't worry, it works.

The `app/styles/base/_icons.scss` file contains a few base styles to make styling icons easier.

## Trouble in paradise?

Here's the nuclear method:

```rm -rf node_modules
npm cache clean
npm install

rm -rf bower_components
bower cache clean
bower install```
