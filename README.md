# generator-ts-exe

Scaffold a [TypeScript](https://www.typescriptlang.org/index.html) executable project.

The resulting project will be bootstrapped to help you develop a Node.js utility written in TypeScript with production-grade process baked in.

## Install

Typical [Yeoman](https://yeoman.io/learning/index.html) and Yeoman generator usage is from the global `PATH`

```bash
$ yarn global add yo generator-ts-exe
```

or

```bash
$ npm install --global yo generator-ts-exe
```

## Usage

No CLI options available yet. A basic prompt will fill out the `package.json` and name the artifacts in the project's `dist/`.

_Note, the "License" prompt will not lead to a LICENSE.txt file produced - for now, you must add that yourself._

```bash
$ yo ts-exe
? Your project title (kebab-case) # foo
? Your project description # This project needs a description
? Author Name <email@example.com> (https://website.com) # ""
? License # ISC
```

After the new project has finished generating with no issues, you will have a new project directory, with the title you provided, in your current working directory. Then:

```bash
$ cd foo
```

At this point, you can use the npm scripts defined in the`package.json`. The ones that are intended to be used directly are:

```bash
$ yarn dev # Run Jest in --watch mode continuously.
$ yarn start # Only compile the TS to JS and run the application normally.
$ yarn build-all # Run through all steps to output a production-grade JS file.
$ yarn build-exe # Same as "build-all" but output an executable binary.
```

The build scripts will output to the `dist/` directory and give you a single JS file that a user can run through their local Node.js runtime, and optionally an executable binary to deploy.

## Project Structure

The resulting project scaffold will include the following:

- a `src` folder with two TS files to verify that ES6 module support works
- linting configuration via [ESLint](https://eslint.org/)
- opinionated formatting via [Prettier](https://prettier.io/)
- transpilation via [TypeScript](https://www.typescriptlang.org/index.html)'s `tsc`
- unit testing via [Jest](https://jestjs.io/en/) with some dummy tests (one which fails by default).
- bundling via [webpack](https://webpack.js.org/)
- minification and compatibility via [Babel](https://babeljs.io/docs/en/babel-preset-minify)
- executable packaging via [Pkg](https://github.com/zeit/pkg#readme) for portability
- a bare README.md file
