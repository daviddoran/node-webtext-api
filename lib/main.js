var request = require('request');
var qs = require('querystring');
var errorcodes = require('./error_codes');
var Util = require('./util');
var Message = require('./message');
var Contacts = require('./contacts');
var Groups = require('./groups');

var URL_BASE_HTTP = 'https://www.webtext.com/api/';
var URL_BASE_HTTPS = 'https://www.webtext.com/api/';

function make_api_request(command, query, callback) {
    query = query || {};
    query.api_id = this.username;
    query.api_pwd = this.password;
    var uri = this.url_base + command + '.html?' + qs.stringify(query);
    request({
        method: 'GET',
        uri: uri
    }, callback);
}

var process_standard_body = function (body, callback) {
    if (typeof body === 'string') {
        body = body.trim();
        if (body === '000') {
            return callback(null);
        }
        return callback(new Util.WebTextError(errorcodes.lookup(body), body));
    }
    return callback(new Util.WebTextError('Unknown error'));
};

var standard_response_processor = function (callback) {
    return function (error, response, body) {
        process_standard_body(body, callback);
    };
};

function WebText(username, password) {
    this.credentials(username, password);

    this.url_base = URL_BASE_HTTPS;
    this.https = true;

    this.contacts = Contacts;
    this.contacts.save = this.contacts.save.bind(this);
    this.contacts.remove = this.contacts.remove.bind(this);

    this.groups = Groups;
    this.groups.save = this.groups.save.bind(this);
    this.groups.remove = this.groups.remove.bind(this);

    this.request = make_api_request.bind(this);
    this.process = standard_response_processor;
}

//Set HTTPS on/off or return current status
WebText.prototype.https = function https(https) {
    if (arguments.length > 0) {
        this.https = https;
        this.url_base = this.https ? URL_BASE_HTTPS : URL_BASE_HTTP;
    }
    return this.https;
};

//Set credentials or return current credentials
WebText.prototype.credentials = function credentials(username, password) {
    if (arguments.length > 0) {
        this.username = username;
        this.password = password;
    }
    return {username: this.username, password: this.password};
};

//Expose the Message object on this module
WebText.Message = Message;

WebText.prototype.balance = function balance(callback) {
    callback = callback || Util.noop;
    var handle = function (error, response, body) {
        if (typeof body === 'string') {
            body = body.trim();
            var match = /BAL:([0-9\.]+)/.exec(body);
            if (match) {
                return callback(null, parseFloat(match[1]));
            } else if (body.length === 3) {
                return callback(new Util.WebTextError(errorcodes.lookup(body), body));
            }
        }
        return callback(new Util.WebTextError('Unknown error'));
    };
    this.request('get_balance', {}, handle);
};

WebText.prototype.send = function send(message, callback) {
    callback = callback || Util.noop;
    var query = {};
    if (message instanceof Message) {
        query = message.serialize();
    }
    else if (typeof message === 'object') {
        try {
            query = new Message(message).serialize();
        } catch (e) {
            return callback(e);
        }
    } else {
        return callback(new Error('message parameter must be instance of WebText.Message or an Object.'));
    }
    this.request('send_text', query, this.process(callback));
};

module.exports = WebText;
