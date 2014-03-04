/*jslint node: true */
/*jslint todo: true */

'use strict';

/*!
 * utils
 * Copyright(c) 2013 Uli Fuchs <ufuchs@gmx.com>
 * MIT Licensed
 *
 * [ A person reveals his character by nothing so clearly as the joke ]
 * [ he resents..                            - Georg C. Lichtenberg - ]
 */

//
// @copyright Vincent Schoettke
//

exports.fillTemplates = function (str, data) {

    function getKeyProp(obj, keyArray) {

        if (!keyArray.length) {
            return obj;
        }

        if ((obj === undefined) || !obj.hasOwnProperty(keyArray[0])) {
            return;
        }

        return getKeyProp(obj[keyArray[0]], keyArray.slice(1));
    }

    return str.replace(/\{\{([\w.]+)\}\}/g, function (match, key) {
        var value = getKeyProp(data, key.split('.'));
        if (value !== undefined) {
            return value;
        }
        return "{{" + key + "}}";
    });

};

//
// @copyright Vincent Schoettke
//

exports.logWithFunctionname = function (msg) {
    return new Error().stack.match(/Error\s*\n.*\n\s+at\s+(\w+.\w+)\s+/)[1]
        + '() : '
        + msg;
}


