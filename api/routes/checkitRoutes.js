'use strict';
module.exports = function (app) {
    var resources = require('../controllers/checkitController');

    // checkit Routes
    app.route('/resources')
        .post(resources.handleRequest);
};