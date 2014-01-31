'use strict';

var api = require('./controllers/api'),
    index = require('./controllers')<% if(mongoPassportUser) { %>,
    users = require('./controllers/users'),
    passport = require('passport'),
    session = require('./controllers/session');

var middleware = require('./middleware')<% } %>;

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  <% if(mongoPassportUser) { %>
  app.get('/api/auth/intuit', passport.authenticate('intuit'), function(req, res){
    // The request will be redirected to Intuit for authentication, so this
    // function will not be called.
  });
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);<% } %>

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*',<% if(mongoPassportUser) { %> middleware.setUserCookie,<% } %> index.index);
};