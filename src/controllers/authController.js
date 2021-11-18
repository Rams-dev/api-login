const { users } = require('../../sequelizeMySqlDb')
const bcrypt = require('bcryptjs')
const { createToken } = require('../helpers/JWT')
const {errorsValidation} = require('../helpers/authValidator')


async function login(req, res) {
    errorsValidation()
    const user = await users.findOne({ where: { email: req.body.email } })
    if (user) {
        const isEqual = bcrypt.compareSync(req.body.password, user.password)
        if (isEqual) {
            res.json({ 'message': 'Welcome ' + user.name, "token": createToken(user) })
        }
    }
    res.status(401).json({ 'message': "sorry you are not in the database, try register" })
}

async function register(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const newUser = await users.create(req.body)
    res.status(201).json({
        "message": "Usuario creado",
        newUser
    })
}

async function destroy(req, res) {
    const destroyUser = await users.destroy({
        where: {
            id: req.params.id
        }
    })

    res.json({ "message": "account deleted", destroyUser })
}

async function account(req, res) {
    const user = await users.findOne({ where: { id: req.userId } })
    return res.status(200).json({ "message": "account", "data": user })
}




module.exports = { login, register, destroy, account }