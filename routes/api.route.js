var express = require('express')

var router = express.Router()
var todos = require('./api/gtk.route')


router.use('/gtk', todos);


module.exports = router;