const database = require('./../db/indexDB')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const login_user = async(req,res) => {
    try {
    const { username, password } = req.body
        if(!(username) || !(password)) {
            res.status(200).json({
                "message": "Please enter your username and password"
            })
        }

        if (username && password) {
            const q = `select * from users where username = '${username}';`
            const { rows } = await database.query(q,[]);
            const result = await bcrypt.compare(password,rows[0].password)

        if (rows[0] && rows[0].id && result) {
            const user_token = await jwt.sign({ id: rows[0].id},process.env.TOKEN_KEY,{ expiresIn: 60*60*24 })
            res.status(200).json({ "msg": "You are login", "token": user_token })
        } else {
            res.status(500).json({ "msg": "Username or password not correct" })
        }
    }
        
    } catch (err) {
        res.status(404).json({ "msg": err.message })
    }
}

module.exports = {
    login_user
}