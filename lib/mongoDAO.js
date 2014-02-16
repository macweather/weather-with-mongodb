/*jslint node: true */
/*jslint todo: true */
/*jslint nomen: true */

/*!
 * storageDAO
 * Copyright(c) 2014 Uli Fuchs <ufuchs@gmx.com>
 * MIT Licensed
 *
 * [ A person who won't read has no advantage over one who can't read. ]
 * [                                                     - Mark Twain -]
 */

var client = require('mongodb').MongoClient,
    memwatch = require('memwatch'),
    bunyan = require('bunyan'),
    Q = require('q');

(function () {

    'use strict';

    var mongoDAO,
        // https://www.npmjs.org/package/bunyan
        log = bunyan.createLogger({name: "mongoDAO"});

    memwatch.on('leak', function (info) {
        console.log('LEAK', info);
    });

    //
    //
    //
    function openDatabase(connString) {
        return Q.nfcall(client.connect, connString).then(function (db) {
            log.info("openDatabase():", connString);
            return db;
        }).fail(function (err) {
            console.log(err);
        });
    }

    /************************************
        MongoDAO
    ************************************/

    function MongoDAO(connString) {
        this.connString = connString;
    }

    MongoDAO.prototype.insert = function (location, data) {

        return Q.when(openDatabase(this.connString)).then(function (db) {

            var collection = db.collection(location);

            return Q.ninvoke(collection, "insert", data)
                .then(function () {
                    log.info("insert(): record for", '\'' + location + '\'' + ' inserted');
                }).finally(function () {
                    log.info("insert(): closing db");
                    db.close();
                });

        });

    };

    MongoDAO.prototype.count = function (location) {

        return Q.when(openDatabase(this.connString)).then(function (db) {

            var collection = db.collection(location);
            return Q.ninvoke(collection, "count").then(function (count) {
                log.info("count(): " + count + " records from", '\'' + location + '\'');
            }).finally(function () {
                log.info("count(): closing db");
                db.close();
            });
        });

    };

    mongoDAO = function (connString) {
        return new MongoDAO(connString);
    };

    /**
     * Expose `mongoDAO`.
     */

    // CommonJS module is defined
    if (module !== 'undefined' && module.exports) {
        module.exports = mongoDAO;
    }

}());
