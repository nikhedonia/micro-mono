# MicroFrontend Mono Repo

This Repository is an example how to setup a Module Federation with typescript and Single Spa.

## Quickstart

```
yarn dev
```
or
```
yarn build
yarn start
```

## Features

- Application can be independently deployed and combined
- Applications can import exposed functions
- Applications can share dependencies with fallback dependencies
- Typechecking across module boundaries


## How it works

## Module Federation

Module Federation allows you to create deployable bundles which can expose methods and can import functionality from other bundles.
Webpack will transform the code accordingly to hide the complexity of await bundles and the bundle is still subject to all optimizations that webpack provides.

To enable this one needs to define a plugin like so:

```
  const module = new ModuleFederationPlugin({
    name: "app1",
    remoteType: 'var',
    filename: "remoteEntry.js",
    exposes: {
      "./spa": "./src/spa"
    },
    remotes: {
      "host": "host"
    },
    shared: ["react", "react-dom", "single-spa", "single-spa-react"]
  });

```

The `filename` defines the name of the bundle that will dynamically load all chunks and bootstrap the application.
You'll need to import this file into your application eg. via a script tag. As this will fetch all chunks asynchronously you can put this into the header.

This declaration defines a bundle that exposes all methods of `./src/spa` and makes them available under the name `app1/spa`.
The remote section defines a what bundles it depends on.
In this case we merely specify their existence. 
This means you need to import this bundle via `<script src="path/to/remoteEntry.js" />` to use it's functionality. 

You can instruct webpack to automatically load by specifying the url at buildtime via: `{ "host": "host@https://mydomain.com/remoteEntry.js"}`.
In case this is not generic enough, you can parameterize it `{ "host": "host@https://[window.hostDomain]/remoteEntry.js"}`
and initialize `window.hostDomain` in your boostrap.js.



## bootstrap.js

bootstrap.js is an important file that marks the entry point.
It's sole purpose is to perform a dynamic import of the main application.
This file must be handled directly by webpack as loaders will cause webpack to generate a broken bundle.
It usually contains a single import statement:

```js
// ./app1/src
import("./index");
```

but may include code that initializes the environment. 
For instance if your federated module defined a remote which url is parameterized
`{ "host": "host@https://[window.hostDomain]/remoteEntry.js"}`
One might have a bootstrap file that looks like the following:

```js
fetch("/config.json")
    .then(res => res.json())
    .then(x => {
        window.hostDomain = x.hostDomain;
        return import("./index");
    });
```

## Single SPA

Single SPA handles the loading, mounting and un-mounting of applications based on the url.

For this one needs to register an application by providing a name,
a function that returns a promise of an application - an object implementing mount, un-mount and bootstrap, and an activityFunction that states whether the application should be active for a given path.

```js
singleSpa.registerApplication(
  "headerApp",
  () => import('headerApp/spa'),
  (url) => true
);

const settingsPattern = new UrlPattern('/api/settings(/:setting)');

singleSpa.registerApplication(
  "settingsApp",
  () => import('settingsApp/spa'),
  (url) => settingsPattern.match(url)
);

```

By convention singleSpa mounts the apps if they are active to a domElement with the id `single-spa-application:applicationName`. This can be modified by adding a domElementGetter as a 4th argument to registerApplication.
