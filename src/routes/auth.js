const express = require('express')
const router = express.Router()

const { login, register, destroy, account } = require('../controllers/authController')
const {registerValidation, mailExist, loginValidation} = require('../helpers/authValidator')
const { isLogged } = require('../helpers/JWT')

router.post('/login',loginValidation,login)
router.post('/register',registerValidation, mailExist ,register)
router.delete('/account/:id',destroy)
router.get('/account',isLogged, account)

module.exports = router