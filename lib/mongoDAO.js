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


    /************************************
        MongoDAO
    ************************************/

    function MongoDAO(connString) {
        this.connString = connString;
    }

    MongoDAO.prototype = {

        openDb : function (connString) {
            var that = this;
            console.log(connString);
            return Q.nfcall(client.connect, connString).then(function (db) {
                that.db = db;
            }).fail(function (err) {
                console.log(err);
            });
        },

        closeDb : function () {
            this.db.close();
            console.log('close db');
        },

        insert : function (location, data) {

            var that = this,
                collection = that.db.collection(location);

            return Q.ninvoke(collection, "insert", data).then(function () {
                console.log("insert(): record for", '\'' + location + '\'' + ' inserted');
            }).fail(function (err) {
                console.log(err);
            });

        },

        count : function (location) {

            var that = this,
                collection = that.db.collection(location);

            return Q.ninvoke(collection, "count").then(function (count) {
                console.log("count(): " + count + " records from", '\'' + location + '\'');
            }).fail(function (err) {
                console.log(err);
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
