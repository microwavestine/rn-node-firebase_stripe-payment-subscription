'use strict'

const apiConfig = require('../config');
const firebase = require('../firebase');
var stripe = require("stripe")(apiConfig.stripe_key);

var userID;

exports.retrieveUserSubscriptionExpiry = function(req,res) {
    
    userID = req.params.userId;

    // fetch subscription id based on user id
    firebase.usersRef.orderByKey().equalTo(userID).on("child_added", function(snapshot) {
        var subscriptionID = snapshot.val().subscription_id;
        stripe.subscriptions.retrieve(
            subscriptionID
        ).then(subscriptionInfo => {
            return res.send(subscriptionInfo)
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).send({error: "Customer Creation Failed"});
        });
    });
    }