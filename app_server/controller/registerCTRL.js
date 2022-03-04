const database = require('./../db/indexDB')
const bcrypt = require('bcrypt')

const register = async(req,res)=>{
    try {
        const { username, email, password } = req.body
        const hashpass = await bcrypt.hash(password,10)
        const q = `insert into users(username, email, password) values($1, $2, $3);`
        const result = await database.query(q,[username,email,hashpass])
        
        res.status(200).json({ "data": "Insert successfull"})
    } catch (err) {
        res.status(404).json({ "message": err.message})
    }
}

module.exports = {
    register
}