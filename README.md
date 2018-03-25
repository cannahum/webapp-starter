# A Full Stack Node-React Web App Starter

* Yarn
* TypeScript,
* ts-node, 
* SCSS,
* Webpack (with Dev Server)

## Installation
Clone or download the repo.

## Usage
There are three ways to start the project,

### Building 
```bash
npm run build
```

This will build the client side in `development` mode, and create a directory called `dist`.
You will see the index.html and bundle.js with all the react code in the said directory.


```bash
npm run build:watch
```
This will trigger the webpack-dev-server to run and watch all changes. Still, in `development` mode.

```bash
npm run build:prod
```
This will do the same thing as the first command but it won't generate sourcemap files and it will minify the artifact.

### Starting
```bash
npm start
```
This will start the ts-node (TypeScript node) without having to compile the server-side code.