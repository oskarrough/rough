# Rough boilerplate
Structure for new projects. Opinionated.

## Dependencies
- Bower (be sure to run `bower install` after pulling)
- Sass
- Susy
- Compass (0.13.4 alpha: install with `gem install compass --pre`)

## Structure
- bower_components
- css (compiled CSS goes here and is not committed to Git)
- images
- scripts (our own scripts go here)
-- scripts/vendor (third party scripts that are not in bower go here)
- styles (sass styles go here)

## Naming convention
**[<ns>-]<ComponentName>[--modifierName|-childName]**
.ComponentName
.ComponentName--modifierName
.ComponentName-childName
.is-stateOfComponent

