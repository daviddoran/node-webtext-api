var table = {
    '000': 'Success. Message accepted for delivery',
    '101': 'Missing parameter: api_id',
    '102': 'Missing parameter: api_pwd',
    '103': 'Missing parameter: txt',
    '104': 'Missing parameter: dest',
    '105': 'Missing parameter: msgid',
    '106': 'Missing parameter: receipt_url',
    '107': 'Missing parameter: receipt_email',
    '108': 'Invalid value for parameter: hex',
    '109': 'Missing parameter:  hex (unicode parameter has been presented, but no hex value)',
    '110': 'Missing parameter:  si_txt',
    '111': 'Missing parameter:  si_url',
    '112': 'Missing parameter: group_name',
    '113': 'Missing parameter: group_alias',
    '114': 'Missing parameter: contact_num',
    '115': 'Missing parameter: remove_num',
    '199': 'Insufficient Credit',
    '201': 'Authentication Failure',
    '202': 'IP Restriction If IP restrictions are in place for this account, an attempt has been made to send from an unauthorised IP address.',
    '203': 'Invalid value for parameter: dest',
    '204': 'Invalid value for parameter: api_pwd',
    '205': 'Invalid value for parameter: api_id',
    '206': 'Invalid value for parameter: delivery_time',
    '207': 'Invalid date specified for delivery_time',
    '208': 'Invalid value for parameter: delivery_delta',
    '209': 'Invalid value for parameter: receipt',
    '210': 'Invalid value for parameter: msgid',
    '211': 'Invalid value for parameter: tag',
    '212': 'Invalid value for parameter: si_txt',
    '213': 'Invalid value for parameter: si_url',
    '214': 'Invalid value for parameter: group_name',
    '215': 'Invalid value for parameter: group_alias',
    '216': 'Invalid value for parameter: contact_num',
    '217': 'Invalid value for parameter: remove_num',
    '401': 'Not a contact',
    '402': 'Invalid value for parameter: group_alias',
    '403': 'Contact is not a member of specified group',
    '405': 'Duplicate Contact entries not allowed on this account',
    '406': 'Contact already a member of specified group',
    '407': 'Group already exists',
    '408': 'A group with the given alias does not exist for this account'
};

function lookup(code, default_message) {
    if (typeof default_message === 'undefined') {
        default_message = 'Unknown error code ' + code;
    }
    code = String(code);
    if (table.hasOwnProperty(code)) {
        return table[code];
    }
    return default_message;
}

module.exports = {
    table: table,
    lookup: lookup
};
