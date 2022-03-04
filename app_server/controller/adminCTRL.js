const database = require('./../db/indexDB')
const imageUpload = require('./../functions/imageUpload')
const videoUpload = require('./../functions/videoUpload')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path')


const login = async(req,res) => {
    try {
    const { username, password } = req.body
        if(!(username) || !(password)) {
            res.status(200).json({
                "message": "Please enter your username and password"
            })
        }

        if (username && password) {
            const q = `select * from admins where username = '${username}';`
            const { rows } = await database.query(q,[]);
            const result = await bcrypt.compare(password,rows[0].password)

        if (rows[0] && rows[0].id && result) {
            const admin_token = await jwt.sign({ id: rows[0].id},process.env.TOKEN_KEY,{ expiresIn: 60*60*24 })
            res.status(200).json({ "msg": "You are login", "token": admin_token })
        } else {
            res.status(500).json({ "msg": "Username or password not correct" })
        }
    }
        
    } catch (err) {
        res.status(404).json({ "msg": err.message })
    }
}

const home = async(req,res) => {
    try {
                
        test('salam')
        const q = `select * from products;`
        const { rows } = await database.query(q,[])
        res.status(200).json({ "data": rows })
    } catch (err) {
        res.status(500).json({ "msg":err.message })
    }
}

//<<--------------LANGUAGE--------------->>
const get_language = async(req,res) => {
    try {
        const q = `select * from languages;`
        const { rows } = await database.query(q,[])
        console.log(rows)
        res.status(200).json({ "data": rows })
    } catch (err) {
        res.status(500).json({ "msg": err.message })
    }
}

const get_language_id = async(req,res) => {
    try {
        const {id} = req.params
        const q = `select * from languages where id = ${id};`
        const { rows } = await database.query(q,[])
        console.log(rows)
        res.status(200).json({ "data": rows })
    } catch (err) {
        res.status(500).json({ "msg": err.message })
    }
}

const add_language = async(req,res) => {
    try {
        const { name, short_name } = req. body
        const q = `insert into languages(name, short_name) values('${name}', '${short_name}');`
        await database.query(q,[])
        res.status(200).json({ "msg": "add successfull" })
    } catch (err) {
        res.status(500).json({ "msg": err.message })
    }
}

const save_language = async(req,res) => {
    try {
        const { name, short_name, id } = req.body
        const q = `update languages set name = '${name}', short_name = '${short_name}' where id = ${id};`
        await database.query(q,[])
        res.status(200).json({ "msg": "update successfull" })
    } catch (err) {
        res.status(500).json({ "msg": err.message })
    }
}

const delete_language = async(req,res) => {
    try {
        const { id } = req.body
        const q = `delete from languages where id = ${id};`
        await database.query(q,[])
        res.status(200).json({ "msg": "successfull delete" })
    } catch (err) {
        res.status(500).json({ "msg": err.message })
    }
}

//<<------------------ABOUT--------------->>

const get_about = async(req,res) =>{
    try {
        const q = `select * from about;`
        const { rows } = await database.query(q,[])
        res.status(200).json({ "data": rows })
    } catch (err) {
        res.status(500).json({ "msg": err.message })
    }
}

const get_about_id = async(req,res) =>{
    try {
        const { id } = req.params
        const q = `select * from about where id = ${id};`
        const { rows } = await database.query(q,[])
        res.status(200).json({ "data": rows[0] })
    } catch (err) {
        res.status(500).json({ "msg": err.message })
    }
}

const save_about = async(req,res) =>{
    try {
        const { id, lang_id, title, content } = req.body
        const image_path = req.files && req.files.image_path ? req.files.image_path : false
        const q = `update about set lang_id = $1, title = $2, content = $3 where id = ${id} returning *;`
        const { rows } = await database.query(q,[lang_id, title, content])
        if (image_path) {
            imageUpload.Deletefile(path.normalize(__dirname + './../../' + rows[0].image_path))
            const result = await imageUpload.oneImageUpload(image_path,'about')
            const q_text = `update about set image_path = '${result}' where id = ${id} returning *;`
            const r = await database.query(q_text,[])
        }
        res.status(200).json({ "msg": "update successfull" })
    } catch (err) {
        res.status(500).json({ "msg": err.message })
    }
}


const video = async(req,res) =>{
    try {
        const video = req.files.video
        await videoUpload.videoUpload(video, 'video')
        res.status(200).json({ "msg": "successfull" })
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
}



module.exports = {
    login, home, 

    get_language, get_language_id, add_language, save_language, delete_language,

    get_about, get_about_id, save_about, video
}