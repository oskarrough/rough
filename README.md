# Rough boilerplate
Structure for new projects. Opinionated.

## Dependencies
- Bower (`npm install -g bower` and be sure to run `bower install` in the directory after pulling)
- Compass (install with `gem install compass --pre` to get the 0.13.4 alpha)
- Susy (install with `gem install susy`)
- Sass (Compass/Susy will install it automatically)

## Structure
- bower_components
- css (compiled CSS goes here and is not committed to Git)
- images
- scripts (our own scripts go here)
- scripts/vendor (third party scripts that are not in bower go here)
- styles (sass styles go here)

## Naming convention
The naming convention is the same found in [Suit CSS](https://github.com/suitcss/suit/blob/master/doc/components.md#naming-conventions).
```
[<ns>-]<ComponentName>[--modifierName|-childName]
.ComponentName
.ComponentName--modifierName
.ComponentName-childName
.is-stateOfComponent```
