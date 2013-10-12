# Rough boilerplate

Opinionated structure for new projects. Closely follows the Yeoman generator-webapp which builds on Grunt.

## Features

- Everything from generator-webapp (server, testing, build etc)
- Navigation toggles
- jQuery waypoints integration
- Scroll nav
- Manual styleguide
- Responsive and fluid Masonry setup
- Jade templating (including 'active' navigation and pages)

## Dependencies

- Bower (`npm install -g bower` and be sure to run `bower install` in the directory after pulling)
- Compass (install with `gem install compass --pre` to get the 0.13.4 alpha)
- Susy (install with `gem install susy`)
- Sass (Compass/Susy will install it automatically)

## Structure

- bower_components
- images
- scripts (own scripts go here)
- scripts/vendor (third party scripts that are not available through bower go here)
- styles

## Naming convention

The naming convention is the same found in [Suit CSS](https://github.com/suitcss/suit/blob/master/doc/components.md#naming-conventions).
```
[<ns>-]<ComponentName>[--modifierName|-childName]
.ComponentName
.ComponentName--modifierName
.ComponentName-childName
.is-stateOfComponent```
