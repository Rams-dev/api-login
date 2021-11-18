const { body, validationResult } = require('express-validator')
const { users } = require('../../sequelizeMySqlDb')

const loginValidation = [
    body('email')
        .isEmail()
        .notEmpty(),
    body('password')
        .isLength({ min: 4 })
        .notEmpty()
]

const registerValidation = [
    body('name')
        .notEmpty(),
    body('email')
        .isEmail()
        .notEmpty(),
    body('password')
        .isLength({ min: 4 })
        .notEmpty()
]

async function errorsValidation(req){
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
}

async function mailExist(req, res, next) {
    user = await users.findAll({
        where: {
            email: req.body.email
        }
    })
    if (user.length > 0) {
        return res.status(404).json({
            "message": "Este correo ya esta en uso"
        })
    }
    next()
}

module.exports = {
    mailExist,
    registerValidation,
    loginValidation,
    errorsValidation

}