// Require the router module from the express package
const router = require('express').Router();
// Import two other modules using require()
const apiRoutes = require('./api');
const mainRoutes = require('./mainRoutes');
// Define two different routes using the router.use() method
// The first route is for the root URL ('/')
// The second route is for the '/api' URL
// It uses the apiRoutes, mainRoutes module to handle requests to this URL
router.use('/', mainRoutes);
router.use('/api', apiRoutes);
//Exports the router object to be used in other parts of application.
module.exports = router;