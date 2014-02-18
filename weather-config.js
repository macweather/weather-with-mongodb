/*jslint node:true*/

'use strict';

var appCfg = {

        aws : {
            key: process.env.AWS_ACCESS_KEY_ID,
            secret: process.env.AWS_SECRET_ACCESS_KEY,
            bucket: process.env.AWS_BUCKET_SLEEPYFOX
        },

        mongo : {
            server : 'mongodb://localhost:27017',
            database : 'weather',
        }

    };

module.exports = appCfg;

//
//
//
appCfg.getMongoConnString = function () {
    return this.mongo.server + '/' + this.mongo.database;
};

