var unicoder = require('./unicoder');

function WebTextMessage(params) {
    params = params || {};
    //A list of phone numbers or group aliases
    this.to = [];
    if (typeof params.to !== "undefined") {
        this.to = this.to.concat(params.to);
    }
    //[Optional] sender tag
    this.tag = params.tag || null;
    if (params.hasOwnProperty('from')) {
        this.tag = params.from;
    }
    if (this.tag !== null) {
        if (this.tag.length > 11) {
            throw Error('The tag/from parameter cannot be longer than 11 characters.');
        }
    }

    //One (and only one) of text and unicode MUST be given
    if (params.hasOwnProperty('text') === params.hasOwnProperty('unicode')) {
        throw Error('One (and only one) of text and unicode MUST be given.');
    }

    this.text = params.text || '';
    this.unicode = null;
    if (params.hasOwnProperty('unicode')) {
        this.unicode = params.unicode;
    }
    //Number of minutes into the future at which to send
    this.delivery_delta = params.delivery_delta || null;
    //Date object indicating delivery time
    this.delivery_time = null;
    if (params.hasOwnProperty('time') && params.time instanceof Date) {
        this.delivery_time = params.time;
    }
    //Receipts (none, by url webhook, or by email)
    this.receipt_type = WebTextMessage.Receipt.None;
    this.receipt_url = null;
    this.receipt_email = null;
    if (params.hasOwnProperty('receipt')) {
        this.receipt_type = params.receipt;
    }
    //Receipt URL
    if (params.hasOwnProperty('url')) {
        this.receipt_type = WebTextMessage.Receipt.URL;
        this.receipt_url = params.url;
    }
    //Receipt email address
    if (params.hasOwnProperty('email')) {
        this.receipt_type = WebTextMessage.Receipt.Email;
        this.receipt_email = params.email;
    }
    if ((this.receipt_url !== null) && (this.receipt_email !== null)) {
        throw new Error('Only one of receipt URL and receipt email may be given.');
    }
    //Numerical message id to reference this message later
    this.id = null;
    if (params.hasOwnProperty('id')) {
        if (!(typeof params.id === 'number' || /^[0-9]+$/.test(params.id))) {
            throw new Error('The id parameter must be an integer.');
        }
        this.id = params.id;
    }
    //Validity in minutes
    this.validity = params.validity || null;
}

WebTextMessage.Receipt = {
    None: 0,
    URL: 1,
    Email: 2
};

function pad(number) {
    return String('0' + number).slice(-2);
}

WebTextMessage.prototype.serialize = function () {
    var query = {};
    query.dest = this.to.join(',');
    if (this.tag !== null) {
        query.tag = this.tag;
    }
    if (this.unicode === null) {
        query.txt = this.text;
    } else {
        query.unicode = 1;
        query.hex = unicoder(this.unicode);
    }
    if (this.delivery_time instanceof Date) {
        var d = this.delivery_time;
        query.delivery_time = [
            d.getUTCFullYear(),
            pad(d.getUTCMonth() + 1),
            pad(d.getUTCDate()),
            pad(d.getUTCHours()),
            pad(d.getUTCMinutes())
        ].join('');
    }
    if (this.delivery_delta !== null) {
        query.delivery_delta = this.delivery_delta;
    }
    query.receipt = this.receipt_type;
    if (this.id !== null) {
        query.msgid = this.id;
    }
    if (this.receipt_url !== null) {
        query.receipt_url = this.receipt_url;
    }
    if (this.receipt_email !== null) {
        query.receipt_email = this.receipt_email;
    }
    if (this.validity !== null) {
        query.validity = this.validity;
    }
    return query;
};

module.exports = WebTextMessage;
