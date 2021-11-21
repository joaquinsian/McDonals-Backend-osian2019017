'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret="secret_key";

exports.createToken = function (user){
    var payload = {
        sub: user._id,
        user: user.user,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().day(10, "days").unix()
    }
    
    return jwt.encode(payload, secret);
}