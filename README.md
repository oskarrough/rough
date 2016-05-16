# Rough(er)

A modern development workflow, anywhere you need it.

1. `curl -sL https://github.com/oskarrough/rough/archive/master.zip | tar xz`
2. `cd rough-master`
3. `npm install; npm start`

## The workflow

### 1. `npm start`

Start a local server where everything from the `src` folder will compile and live-reload as you develop.

Write your CSS like it was 1988 or make use of sass, autoprefixer and easy imports from npm modules. Your scripts will be compiled with ES2015/2016 modules into a single, bundled and minified file.

### 2. `npm run build`

Compiles and minifies everything into the `dist` folder. Ready for deployment.

### 3. `npm test`

Lints your styles using stylelint, your scripts using xo and runs tests using ava. By default there's a test to ensure your project builds successfully.

## Notes

Make sure your node version (test with `node -v`) is at least 5.

![](https://travis-ci.org/oskarrough/rough.svg) ![](https://david-dm.org/oskarrough/rough.svg)
