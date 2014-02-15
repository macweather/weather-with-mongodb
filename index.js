/*jslint node: true */
/*jslint todo: true */
/*jslint nomen: true */

/*!
 * index
 * Copyright(c) 2013 Uli Fuchs <ufuchs@gmx.com>
 * MIT Licensed
 *
 * [ The true sign of intelligence is not knowledge but imagination. ]
 * [                                             - Albert Einstein - ]
 */

'use strict';

var weather = require('./lib/weather'),
    proxy = process.env.HTTP_PROXY || process.env.http_proxy,
    Q = require('q');

Q.when(weather.prepare(proxy))
    .then(function () {
        return {
            name: "Germany/Berlin",
            lang: "de"
        };
    })
    .then(weather.process.bind(weather))
    .fail(function (err) {
        console.log(err);
    })
    // Logger einbringen
    .done();

