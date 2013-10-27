var Util = {};

//Empty function for default callbacks
Util.noop = function () {};

function WebTextError(message, code) {
    this.message = message;
    this.code = code || null;
}

WebTextError.prototype = new Error();
WebTextError.prototype.constructor = WebTextError;

Util.WebTextError = WebTextError;

module.exports = Util;
