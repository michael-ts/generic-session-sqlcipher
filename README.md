# generic-session-sqlcipher
Implements a generic session API on top of the SQLCipher based tokens provided by session-promise.

# Usage

Use the module like this:

```
var session = require("generic-session-sqlcipher")(options)
```

The `options` argument, if provided, is an object in which the following keys are recognized:

`userdir` - if present, specifies the path to the directory containing user keychains.  If not present, the current directory is used.
`sessiondir` - if present, specifies the path to the directory containing session files.  If not present, the current directory is used.

The value returned by the `require("generic-session-sqlcipher")(options)` call is an object containing an `async` function `get` which takes an express.js Request and returns a session object if a session is present, and `false` otherwise.  The session object contains the key `user` which has a string value containing the name of the user owning the session.

This module returns a session object if a session-promise session is present as denoted by the request having a "cookie.token" string with a valid session string.

# Example
```
 var path = require("path")
 var os = require("os")
 var HOME = os.homedir()
 var session = require("generic-session-sqlcipher")({
     userdir:(HOME+path.sep+"data"+path.sep+"node"+path.sep+"user"+path.sep),
     sessiondir:(HOME+path.sep+"data"+path.sep+"node"+path.sep+"session"+path.sep)
 })

// express endpoint handler function
function api_func(req, res) {
    var sess = await session.get(req)
    if (!sess) {
        res.send("invalid session")
        return
    }
    res.send(`Hi ${sess.user}!`)
}
```
