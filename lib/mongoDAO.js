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
    Q = require('q');

(function () {

    'use strict';

    var mongoDAO;

    //
    //
    //
    function openDatabase(connString) {
        return Q.nfcall(client.connect, connString).then(function (db) {
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

    MongoDAO.prototype = {

        insert : function (location, data) {

//            var collection = db.collection(location);

            return Q.when(openDatabase(this.connString)).then(function (db) {

                var collection = db.collection(location);

                return Q.ninvoke(collection, "insert", data).then(function () {
                    console.log("insert(): record for", '\'' + location + '\'' + ' inserted');
                }).finally(function () {
                    db.close();
                });

            });


            /*
            return Q.when(openDatabase(this.connString)).then(function (db) {

                var collection = db.collection(location);

                return Q.ninvoke(collection, "insert", data).then(function () {
                    console.log("insert(): record for", '\'' + location + '\'' + ' inserted');
                }).finally(function () {
                    db.close();
                });

            });
            */
        },

        count : function (location) {

            return Q.when(openDatabase(this.connString)).then(function (db) {

                var collection = db.collection(location);
                return Q.ninvoke(collection, "count").then(function (count) {
                    console.log("count(): " + count + " records from", '\'' + location + '\'');
                }).finally(function () {
                    db.close();
                });
            });

        }

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
