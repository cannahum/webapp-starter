# A Full Stack Node-React Web App Starter

* npm
* TypeScript,
* JavaScript (yes, they can co-exist),
* node,
* Express,
* TypeORM,
* GraphQL (TypeGraphQL, Apollo-React),
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
-- -- -- templates/   <= HTML templates for webpack to use
-- -- -- src/
-- -- -- -- App.tsx
-- -- -- -- example_app_auth/*  <= Example auth app with GraphQL and server / db integration
-- -- -- -- example_app_gql/*  <= Example GraphQL app
-- -- -- -- example_app_simple/*  <= Example kitchen-sink app for many different uses
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
cd webapp-starter/
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
npm run server:dev
```

In a new instance of terminal, build the front-end code.
```bash
npm run client:dev
```
Then on your browser, navigate to http://localhost:3000

You can have both server and client code distributions built as you develop.
The following commands watch your file system, re-build the code and restart the process.
```bash
# server
npm run server:watch
```

And in another terminal instance,
```bash
#client
npm run client:watch
```


## Advanced Usage (with Database)
In order to use the full application, you need to connect the server to a database. 
In the `{root}/app/server`, you will find a file called `ormconfig.dev.env`.
This file has a set of environment variables that are used in the _development_ mode.
As the TypeORM documentation suggests, you need to specify valid connection configurations
to your database.

Those variables are an example, and that's what works for my machine.
Also, if you prefer not to use that file and input your own environment variables,
you may edit the `{root}/app/server/bin/dev` so that it skips the ormconfig.dev.env.


