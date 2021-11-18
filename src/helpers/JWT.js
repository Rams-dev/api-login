const moment = require('moment')
const jwt = require('jwt-simple')
const {secretKey} = require('../../settings')

module.exports = {
    createToken: (user) => {
        let payload = {
            userId: user.id,
            createAt:moment().unix(),
            expireAt:moment().add(5,'minutes').unix()
        }

        return jwt.encode(payload, secretKey)
    },
    isLogged: (req, res, next) => {
        const userToken = req.headers['authorization'].split(' ')[1]
        console.log(req.headers)
        let payload = {}

        try{
            payload = jwt.decode(userToken, secretKey)
            console.log(payload)
        }catch{
           return res.status(404).json({'message':'token is incorrect'})
        }

        if(payload.expireAt < moment.unix()){
            res.status(401).json({'message':'token expired'})
        }

        req.userId = payload.userId 
        next()

    }
}