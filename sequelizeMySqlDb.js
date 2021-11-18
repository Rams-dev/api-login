const Sequelize = require('sequelize')
const UsersModel = require('./src/models/users')

const sequelize = new Sequelize('login_api', 'root', '',{
    host:'localhost',
    dialect: 'mysql'
})

// const sequelize = new Sequelize('-', 'root', 'loginapi',{
//     host:'loginapimysql.cqxmldakzi0e.us-west-2.rds.amazonaws.com',
//     dialect: 'mysql'
// })



const users = UsersModel(sequelize, Sequelize)

sequelize.sync({force: false})
.then(() => {
    // console.log('')
})

module.exports = {users}