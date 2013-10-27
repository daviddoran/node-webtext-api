var Util = require('./util');

function Contacts() {
}

Contacts.save = function (number, params, callback) {
    params = params || {};
    callback = callback || Util.noop;
    var query = {contact_num: number};
    if (params.hasOwnProperty('name')) {
        query.contact_name = params.name;
    }
    if (params.hasOwnProperty('group')) {
        query.group_alias = params.group;
    }
    this.request('add_contact', query, this.process(callback));
};

Contacts.remove = function (number, params, callback) {
    params = params || {};
    callback = callback || Util.noop;
    var query = {remove_num: number};
    if (params.hasOwnProperty('group')) {
        query.group_alias = params.group;
    }
    this.request('remove_contact', query, this.process(callback));
};

module.exports = Contacts;
