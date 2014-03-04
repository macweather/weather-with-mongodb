/*jslint node:true*/

'use strict';

var bunyan = require('bunyan');

var logger = (function () {
    var l = bunyan.createLogger({

            name: 'weather',

            streams: [
                {
                    type: 'rotating-file',
                    path: './' + 'weather.log',
                    period: '1d',   // daily rotation
                    count: 3        // keep 3 back copies
                }
            ]

        });
    return {
        logger : l
    };

}());

function doLog(msg) {
    return new Error().stack.match(/Error\s*\n.*\n\s+at\s+(\w+)\s+/)[1]
        + '() : '
        + msg;
}

var xy = function() {
    console.log(doLog('Test'));
};

xy();

var log = logger.logger;
log.info('test');
