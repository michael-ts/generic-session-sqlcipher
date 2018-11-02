var session

async function get(req) {
    // first check if the user has a valid session
    // if they do, look up their key in the keychain to make sure
    // that the session is valid.
    var up = await session.UserPassword(req.cookies.token)
    if (!up) return false
    var user=up.user
    up = await session.KeyLookup(req.cookies.token,user)
    if (!up) {
	return false
    }
    return {
	user:user
    }
}

module.exports = function(options) {
    session = require("session-promise")(options)
    return {
	get:get
    }
}

