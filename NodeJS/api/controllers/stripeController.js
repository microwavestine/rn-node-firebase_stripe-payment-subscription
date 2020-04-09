'use strict'

const apiConfig = require('../config');
const firebase = require('../firebase');
let stripe = require("stripe")(apiConfig.stripe_key);


exports.stripeSubscribePage = function(req, res) {
    const userID = req.query.uid;
    res.render('subscribe', { user_id: userID });
}
//{ user_id: userID }
exports.stripeCreateSubscriptionRequest = function(req,res) {
        let token = req.body.stripeToken;
        let customerEmail = req.body.stripeEmail;

        // grab userID from form
        const userID = req.body.userID;

        // create customer first
        stripe.customers.create({
          email: customerEmail,
          source: token,
          description: userID
        })
        .then(customer =>
            firebase.subscriptionRef.child(customer.description).set({
                    customer_id: customer.id
            }) // add customer id and user id to firebase
        )
        .catch(err => {
            console.log("Error:", err);
            res.status(500).send({error: "Customer Creation Failed"});
        });


        // fetch customer id based on userid, then subscribe that customer id. 
        // save subscription id to firebase for later retrieval.
        firebase.subscriptionRef.orderByKey().equalTo(userID).on("child_added", function(snapshot) {
            let customer_id_to_subscribe = snapshot.val().customer_id;
            stripe.subscriptions.create({
                customer: customer_id_to_subscribe,
                items: apiConfig.stripe_plan
            }).then(subscription => 
                firebase.subscriptionRef.child(userID).update({
                    subscription_id: subscription.id
                })
            )
        });

        // redirect to success page
        res.redirect('/subscribe_success');
} 

exports.stripeSubscribeSuccess = function(req,res) {
    res.render('subscribe_success', {})
}

exports.stripeDonationPage = function(req,res) {
    const userID = req.query.uid;
    const donationAmount = req.query.donation;
    res.render('donation', { user_id: userID, donation_amount: donationAmount });
    //res.send('<html><head><link rel="stylesheet" type="text/css" href="css/simple.css" data-rel-css="" /><script src="https://js.stripe.com/v3/"></script><script src="js/simple.js" data-rel-js></script></head><body><form action="/donate" method="post" id="payment-form"><div class="form-row"><label for="card-element">Credit or debit card</label><div id="card-element"><!-- a Stripe Element will be inserted here. --></div><!-- Used to display form errors --><div id="card-errors" role="alert"></div></div><button>Submit Payment</button></form></body></html>');
}

exports.stripeDonationRequest = function(req,res) {
    let token = req.body.stripeToken;
    // grab userID and donation from form
    const userID = req.body.userID;
    const donation = req.body.donation;

    stripe.charges.create({
        amount: donation * 100,
        currency: "hkd",
        source: token, // obtained with Stripe.js
        description: userID + " donated " + donation
      })
        .then(chargeInfo =>
            firebase.donationRef.push().set({
                user_id: userID,
                time_stamp: chargeInfo.created,
                donation_amount: donation
            }) //save user id, timestamp and donation amount
        )
        .catch(err => {
            console.log("Error:", err);
            res.status(500).send({error: "Donation Failed"});
        });
     
    // redirect to success page
    res.redirect('/donate_success');

}

exports.stripeDonationSuccess = function(req,res) {
    res.render('donation_success',{})
}