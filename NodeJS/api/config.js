'use strict';
const API_KEY = process.env.API_KEY || 'API_KEY';
const STRIPE_KEY = process.env.STRIPE_KEY || 'STRIPE_KEY';
const STRIPE_SUBSCRIPTION_PLAN = process.env.STRIPE_SUBSCRIPTION_PLAN || 'STRIPE_SUBSCRIPTION_PLAN';

// Firebase Admin
var FIREBASE_ADMIN = require('firebase-admin');
const FIREBASE_ADMIN_CONFIG = process.env.FIREBASE_ADMIN_CONFIG || 'FIREBASE_ADMIN_CONFIG';
var FIREBASE_SERVICE_ACCOUNT = require('../rsc/' + FIREBASE_ADMIN_CONFIG);
var FIREBASE_DB_DEFAULT = process.env.FIREBASE_DB_DEFAULT || 'firebase-main-db';
var FIREBASE_DB_SUBSCRIPTIONS = process.env.FIREBASE_DB_SUBSCRIPTIONS || 'firebase-subscriptions-db';

module.exports = {
    key: API_KEY,
    firebase_users: FIREBASE_ADMIN.initializeApp({
        credential: FIREBASE_ADMIN.credential.cert(FIREBASE_SERVICE_ACCOUNT),
        databaseURL: 'https://'+FIREBASE_DB_DEFAULT+'.firebaseio.com'
    }, 'users'),
    stripe_key: STRIPE_KEY,
    stripe_plan: [{plan: STRIPE_SUBSCRIPTION_PLAN}]
}
