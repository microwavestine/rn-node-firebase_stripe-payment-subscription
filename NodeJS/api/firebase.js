'use strict';
//firebase initialization
var admin = require("firebase-admin");
const FIREBASE_ADMIN_CONFIG = process.env.FIREBASE_ADMIN_CONFIG_SUBSCRIPTIONS || 'subscriptions-firebase-adminsdk-xxxx.json';
var FIREBASE_DB_SUBSCRIPTIONS = process.env.FIREBASE_DB_SUBSCRIPTIONS || 'firebase-subscriptions';
var serviceAccount = require("../rsc/" + FIREBASE_ADMIN_CONFIG);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://" + FIREBASE_DB_SUBSCRIPTIONS + ".firebaseio.com"
});

// Get a database reference to our blog
var db = admin.database();
var ref = db.ref("/");
var subscriptionRef = ref.child("subscriptions");
var donationRef = ref.child("donations")

module.exports = {
    subscriptionRef: subscriptionRef,
    donationRef: donationRef
}
