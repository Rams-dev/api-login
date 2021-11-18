const router = require('express').Router();
const authRoute = require('./auth')

router.use(authRoute)

module.exports = router