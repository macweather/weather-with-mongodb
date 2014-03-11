/*jslint node: true */
/*jslint todo: true */
/*jslint nomen: true */

/*!
 * weather
 * Copyright(c) 2013 Uli Fuchs <ufuchs@gmx.com>
 * MIT Licensed
 *
 * [ The true sign of intelligence is not knowledge but imagination. ]
 * [                                             - Albert Einstein - ]
 */

/**
 * Dependencies
 */

var Q = require('q'),
    request = require('request'),
    bunyan = require('bunyan'),
    appcfg = require('./../weather-config.js'),
    demoWeather = require('./provider/wunderground-2013-03-29.json'),
    wunderGround = require('./provider/wunderground.js'),
    mongoDAO = require('./mongoDAO.js'),
    utils = require('./utils.js');

(function () {

    'use strict';

    var weather,
        weatherDAO,
        log = bunyan.createLogger({name: "weather"}),
        lwfn = utils.logWithFunctionname,
        connString = appcfg.getMongoConnString();

    /************************************
        WeatherDAO
    ************************************/

    function WeatherDAO(weatherProvider, proxy) {
        this.weatherProvider = weatherProvider;
        this.proxy = proxy;
    }

    WeatherDAO.prototype.byTestData = function (req) {
        log.info(lwfn('Use file://./provider/wunderground-2013-03-29.json'));
        return {
            request : req,
            json : demoWeather
        };
    };

    /**
     * partial copyright(c) Vincent Schoettke
     *
     * Submits a request and fetchs the response, the weather data.
     *
     * @param {params} data object
     * @return data object
     *
     * @api public
     */

    WeatherDAO.prototype.byProvider = function (req) {

        var uri = this.weatherProvider.getApiUri(req.lang, req.name),
            d = Q.defer();

        log.info(lwfn('Try ' + uri));

        request({uri : uri, proxy : this.proxy}, function (err, res, body) {

            if (err) {
                log.error(lwfn(err));
                d.reject(err);
            } else {
                try {
                    log.info(lwfn('Success ' + uri));
                    d.resolve({
                        request : req,
                        json : JSON.parse(body)
                    });
                } catch (jsonErr) {
                    log.error(lwfn(jsonErr));
                    d.reject(jsonErr);
                }
            }
        });

        return d.promise;

    };

    weatherDAO = function (weatherProvider, proxy) {
        return new WeatherDAO(weatherProvider, proxy);
    };

    /************************************
        weather
    ************************************/

    weather = {

        // SANTIANO
        weatherDAO : null,
        storageDAO : null,

        /**
         * Download weather data from provider and process the weather data
         *
         * @param {proxy} String
         * @param {apikey} String
         * @param {cachettl} Integer
         *
         * @api public
         */

        prepare : function (proxy) {

            var weatherProvider =  wunderGround();

            this.weatherDAO = weatherDAO(weatherProvider, proxy);
            this.storageDAO = mongoDAO(appcfg.getMongoConnString());

        },

        //
        //
        //
        process : function (request) {

            var wdao = this.weatherDAO,
                collName = request.name;

            function retrieveWeather(req) {
                return wdao.byTestData.call(wdao, req);
            }

            return Q.when(this.storageDAO.openDb(connString))
                .then(function () { return request; })
                .then(retrieveWeather).then(function (config) { return config.json; })
                .then(this.storageDAO.insert.bind(this.storageDAO, collName))
                .then(this.storageDAO.count.bind(this.storageDAO, collName))
                .then(this.storageDAO.closeDb.bind(this.storageDAO));

        }

    };

    /**
     * Expose `weather`.
     */

    // CommonJS module is defined
    if (module !== 'undefined' && module.exports) {
        module.exports = weather;
    }

}());
