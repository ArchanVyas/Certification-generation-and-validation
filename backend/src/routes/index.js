const express = require("express");
const router = express.Router();
module.exports = () => {
    router.use('/certificate',require('./certificate.routes')(router))
    router.use('/user',require('./user.routes')(router))
    router.use('/template',require('./template.routes')(router))
    return router;
}
