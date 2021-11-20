'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'CSMC'

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        user: user.user,
        password: user.password,
        iat: moment().unix(),
        exp: moment().date(40, 'days').unix()
    }

    return jwt.encode(payload, secret)
}     