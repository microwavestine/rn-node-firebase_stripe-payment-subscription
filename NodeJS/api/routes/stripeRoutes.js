'use strict';
module.exports = function(app) {
    var stripeController = require('../controllers/stripeController');

    app.route('/subscribe')
        .get(stripeController.stripeSubscribePage)
        .post(stripeController.stripeCreateSubscriptionRequest);
    app.route('/subscribe_success')
        .get(stripeController.stripeSubscribeSuccess);

    app.route('/donate')
        .get(stripeController.stripeDonationPage)
        .post(stripeController.stripeDonationRequest);
    app.route('/donate_success')
        .get(stripeController.stripeDonationSuccess);
};