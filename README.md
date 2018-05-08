# A Full Stack Node-React Web App Starter

* npm
* TypeScript,
* JavaScript (yes, they can co-exist),
* node,
* Express,
* TypeORM,
* GraphQL (TypeGraphQL),
* React,
* Redux,
* Jest, 
* SCSS,
* Webpack (with Dev Server)

## Project Structure
```
/
-- IDE folders
-- tslint.json
-- package.json
-- app/
-- -- client/
-- -- -- package.json
-- -- -- config/      <= webpack configurations
-- -- -- example_app/  <= Example kitchen-sink app for may different uses
-- -- -- templates/   <= HTML templates
-- -- -- index.js     <= Entry Point
-- -- -- index.scss   
-- -- -- jest.config.js
-- -- server/
-- -- -- bin/         <= Server starters, based on mode (prod or dev
-- -- -- package.json
-- -- -- src/
-- -- -- -- Read more below...
```

# Get Started - (like, immediately)

## Installation
Clone or download the repo.
```bash
git clone https://github.com/cannahum/webapp-starter.git
```

**Recommended Version of Node: 8 or above, because there is package-lock.json**

Run:
```bash
npm run setup:clean
# Run this whenever you want to test your dependencies, as well
```
This call will remove the node_modules from the entire project, then re-install them.

## Usage
Dev mode is easy to start, we need to start the server:

```bash 
npm run start:dev
```

In a new instance of terminal, build the front-end code.
```bash
npm run build:client:dev
```

Or if you'd like a process to watch the files while you develop and continuously build:
```bash
npm run build:client:watch
```

Then on your browser, navigate to http://localhost:3000
