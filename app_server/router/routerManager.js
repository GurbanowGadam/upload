const apiRouter = require('./apiRouter')
const loginRouter = require('./loginRouter')
const adminRouter = require('./adminRouter')
const registerRouter = require('./registerRouter')




module.exports = (app)=>{
    app.use('/api/login', loginRouter)
    app.use('/api/admin', adminRouter)
    app.use('/api/register', registerRouter)
    app.use('/api', apiRouter)
}