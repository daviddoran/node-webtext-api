var errorcodes = require('./error_codes');
var Util = require('./util');

function Groups() {
}

Groups.save = function (name, callback) {
    callback = callback || Util.noop;
    var query = {group_name: name};
    var handle = function (error, response, body) {
        if (typeof body === 'string') {
            body = body.trim();
            var match = /000 alias:([0-9]+)/.exec(body);
            if (match) {
                return callback(null, match[1]);
            } else if (body.length === 3) {
                return callback(new Util.WebTextError(errorcodes.lookup(body), body));
            }
        }
        return callback(new Util.WebTextError('Unknown error'));
    };
    this.request('add_contact_group', query, handle);
};

Groups.remove = function (group_alias, callback) {
    callback = callback || Util.noop;
    var query = {group_alias: group_alias};
    this.request('remove_contact_group', query, this.process(callback));
};

module.exports = Groups;
