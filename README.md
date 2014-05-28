# Rough boilerplate

Opinionated structure for new projects. Closely follows the Yeoman generator-webapp which builds on Grunt.

Base
- sass
- grids (susy)
- breakpoints
- autoprefixer
- compass (why?)
- normalize

Styled base
Components/modules/patterns

The purpose of this HTML is to help determine what default settings are with Bitters and to make sure that all possible HTML Elements are included in this HTML so as to not miss any possible Elements when designing a site.

## Getting started

1. Clone the project

`git clone https://github.com/oskarrough/rough.git`

2. Remove the git history to start fresh

`rm -rf .git`
`git init`

3. Install dependencies:

**First install these as they are used to install the rest.**

- Node --> `brew install node` (for node/js packages)
- Grunt --> `npm install -g grunt-cli` (for development)
- Bower --> `npm install -g bower` (for front-end packages)
- Bundler --> `sudo gem install bundler` (for ruby/gem packages)

In one command: `brew install node && sudo gem install bundler && npm install -g bower grunt-cli`

**Install the rest of the dependencies using the tools you just installed**

- `bundle install` --> installs everything from Gemfile
- `npm install` -->  installs everything from package.json
- `bower install` --> installs everything from bower.json

In one command: `bundle install && npm install && bower install`

## Compiling HTML with Jade

@todo: explain why and how

## Compiling CSS with Sass

This project uses Sass and includes three different methods of compiling:

- grunt-contrib-sass: the default method, just sass
- grunt-compass: can generate sprites
- grunt-sass: much faster using node-sass (which uses libsass) but less features

## Features

- Everything from generator-webapp (server, testing, build etc)
- Navigation toggles
- jQuery waypoints integration
- Scroll nav
- Manual styleguide
- Responsive and fluid Masonry setup
- Jade templating (including 'active' navigation and pages)

## Structure

- app/bower_components
- app/images
- app/scripts (own scripts go here)
- app/scripts/vendor (third party scripts that are not available through a package manager (e.g. bower) go here)
- app/styles

## Naming convention

https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md

