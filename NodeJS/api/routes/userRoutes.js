'use strict';
module.exports = function(app) {
    var userController = require('../controllers/userController');

    // Get user subscription expiration date at this route
    app.route('/users/:userId/premiumExpireAt')
        .get(userController.retrieveUserSubscriptionExpiry)

};