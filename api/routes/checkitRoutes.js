'use strict';
module.exports = function (app) {
    var resources = require('../controllers/checkitController');

    // checkit Routes
    app.route('/resources/list')
        .post(resources.handleRequest);

    app.route('/resource/create')
        .post(resources.handleRequest);

    // app.route('/resource/checkout/:resourceName')
    //     .post(resources.checkOut);

    // app.route('/resource/checkin/:resourceName')
    //     .post(resources.checkIn);
};