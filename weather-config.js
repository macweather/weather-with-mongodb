/*jslint node:true*/

'use strict';

var bunyan = require('bunyan'),
    appCfg = {

        mta : {
            user: process.env.MAILER_ACCESS_KEY,
            password: process.env.MAILER_SECRET_ACCESS_KEY,
            host: process.env.MAILER,
            ssl: true
        },

        aws : {
            key: process.env.AWS_ACCESS_KEY_ID,
            secret: process.env.AWS_SECRET_ACCESS_KEY,
            bucket: process.env.AWS_BUCKET_SLEEPYFOX
        },

        mongo : {
            server : 'mongodb://127.0.0.1:27017',
            database : 'weather',
        },

        /*
        logger : bunyan.createLogger({

            name: 'weather',
            streams: [{
                type: 'rotating-file',
                path: process.env.HOME + '/' + 'weather.log',
                period: '1d',   // daily rotation
                count: 3        // keep 3 back copies
            }]

        })
        */

    };

module.exports = appCfg;

//
//
//
appCfg.getMongoConnString = function () {
    return this.mongo.server + '/' + this.mongo.database;
};

appCfg.getBunyan = function () {
    return this.bunyan;
};

appCfg.getMTA = function () {
    return this.mta;
};
