# Intuit Partner Platform Full Stack App Generator 

Yeoman generator for creating MEAN stack IPP applications, using MongoDB, Express, AngularJS, and Node.

Also, uses Passport for QuickBooks API authorization.

Featuring: 

 * Express server integrated with grunt tasks
 * Livereload of client and server files
 * Support for Jade and CoffeeScript
 * Easy deployment workflow.
 * Optional MongoDB integration
 * Optional Passport integration for adding user accounts

## Usage

Install `generator-intuit-fullstack`:
```
npm install -g generator-intuit-fullstack
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo intuit-fullstack`, optionally passing an app name:
```
yo intuit-fullstack [app-name]
```

After generator finishes running, go to `passport.js` and modify the following line with your IPP Consumer Key and Secret:
```
var INTUIT_CONSUMER_KEY = "--insert your app consumer key here--";
var INTUIT_CONSUMER_SECRET = "--insert your app consumer secret here--";
```

## Express

Launch your express server in development mode.
```
grunt serve
``` 

Launch your express server in production mode, uses the minified/optimized production folder.
```
grunt serve:dist
``` 

### Livereload

`grunt serve` will watch client files in `app/`, and server files inside `lib/`, restarting the Express server when a change is detected.

## Deployment

To generate a dist folder that can easily be deployed use:

    grunt

This will run unit tests, jshint, concatenate and minify scripts/css, compress images, add css vendor prefixes, and finally copy all files to a tidy dist folder.

Alternatively to skip tests and jshint, use:

    grunt build

### Heroku Deployment

We provide an extremely simplifed deployment process for heroku.

`yo intuit-fullstack:deploy heroku` generates a `dist` folder that is deployment ready  for [heroku.com](http://heroku.com/). 

**Create and Deploy an app in 4 steps**

1. `mkdir foo && cd foo`

2. `yo intuit-fullstack`

3. `yo intuit-fullstack:deploy heroku`

4. `cd dist && git push heroku master`

5. Optional (if using mongoDB) `heroku addons:add mongohq`

That's it! Your app should be live and shareable. Type `heroku open` to view it.  

## Setting up Route authorization

If your app uses the Passport boilerplate for accounts, you'll of course want to restrict access to certain client routes/api routes.

For protecting server API routes, we can use the `auth` middleware, which will send a 401 unauthorized error if a user makes a request without being logged in.

For protecting client routes, we automatically handle 401s sent from the server by redirecting you to the login page.

However, as this will load part of the page before redirecting, it will cause a flicker. So this should only be used as a fallback mechanism. A better way to handle restricted pages is to mark the routes on the client side that you want to require authentication for. 

You can easily do this from your `app.js` by adding the following to any client routes that need protecting.

     authenticate: true

This redirects the user to the login page before attempting to load the new route, avoiding the flicker.

Please keep in mind this client routing is only for improving the **user interface**. Anyone with chrome developer tools can easily get around it and view pages they're not supposed to see. 

This is not a problem as long as you **secure your server API** routes, ensuring that you don't give any sensitive information unless the user is authenticated or authorized.

#### How do I only let users authorized access an api route?

Similarly to how the `auth` middleware checks if a user authenticated before going to the next route, you could easily make an ensureAuthorized middleware that checks the users role, or some other field, before sending them to the protected route, otherwise it sends a `403` error.

## Generators

Available Angular generators:

* [intuit-fullstack](#app) (aka [intuit-fullstack:app](https://github.com/yeoman/generator-angular#app))
* [intuit-fullstack:controller](https://github.com/yeoman/generator-angular#controller)
* [intuit-fullstack:directive](https://github.com/yeoman/generator-angular#directive)
* [intuit-fullstack:filter](https://github.com/yeoman/generator-angular#filter)
* [intuit-fullstack:route](https://github.com/yeoman/generator-angular#route)
* [intuit-fullstack:service](https://github.com/yeoman/generator-angular#service)
* [intuit-fullstack:provider](https://github.com/yeoman/generator-angular#service)
* [intuit-fullstack:factory](https://github.com/yeoman/generator-angular#service)
* [intuit-fullstack:value](https://github.com/yeoman/generator-angular#service)
* [intuit-fullstack:constant](https://github.com/yeoman/generator-angular#service)
* [intuit-fullstack:decorator](https://github.com/yeoman/generator-angular#decorator)
* [intuit-fullstack:view](https://github.com/yeoman/generator-angular#view)

Available Fullstack generators:

* [intuit-fullstack:deploy](#deploy)

**Note: Generators are to be run from the root directory of your app.**

All of the **generator-angular** client side generators are available, but aliased using `intuit-fullstack`. 

They are aliased to ensure the files they generate are added to the correct folders and that the `index.(html/jade)` is updated properly. 

Read more on them from the offical [generator angular documentation][1] 

## Fullstack specific generators

### Deploy
Initalizes a heroku app and generates a `dist` folder which is ready to push to heroku.

Example:
```bash
yo intuit-fullstack:deploy heroku
```

After app modifications run:
```bash
grunt build
```
then commit and push the dist folder.

## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.

### Jade
For generators that output views, the `--jade` option will output Jade instead of HTML.

For example:
```bash
yo intuit-fullstack --jade
```

Changes the rendering engine from EJS to Jade, and generates your views as jade files instead of HTML.

Assets that will be minified or compressed such as scripts, styles, and images, must still use normal html tags so they can be picked up by grunt-usemin and compressed for production builds.

### CoffeeScript
For generators that output scripts, the `--coffee` option will output CoffeeScript instead of JavaScript.

For example:
```bash
yo intuit-fullstack:controller user --coffee
```

Produces `app/scripts/controller/user.coffee`:
```coffeescript
angular.module('myMod')
  .controller 'UserCtrl', ($scope) ->
```

A project can mix CoffeScript and JavaScript files.

To output JavaScript files, even if CoffeeScript files exist (the default is to output CoffeeScript files if the generator finds any in the project), use `--coffee=false`.

### Minification Safe

**Deprecated**

[Related Issue #452](https://github.com/yeoman/generator-angular/issues/452): This option is being removed in future versions of the generator.

By default, generators produce unannotated code. Without annotations, AngularJS's DI system will break when minified. [ngMin](https://github.com/btford/ngmin) is used to add these annotations before minification.

### Add to Index
By default, new scripts are added to the index file. However, this may not always be suitable. Some use cases:

* Manually added to the file
* Auto-added by a 3rd party plugin
* Using this generator as a subgenerator

To skip adding them to the index, pass in the skip-add argument:
```bash
yo intuit-fullstack:service serviceName --skip-add
```

## Bower Components

The following packages are always installed by the [app](#app) generator:

* angular
* angular-mocks
* angular-scenario


The following additional modules are available as components on bower, and installable via `bower install`:

* angular-cookies
* angular-loader
* angular-resource
* angular-sanitize

All of these can be updated with `bower update` as new versions of AngularJS are released.

## Testing

Running `grunt test` will run the unit tests with karma.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a PR, make sure that the commit messages match the [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)


  [1]: https://github.com/yeoman/generator-angular#generators
