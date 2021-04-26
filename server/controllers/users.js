const bcrypt = require('bcryptjs')
require('dotenv').config()

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const {email, first_name, last_name, password} = req.body
        const [existingUser] = await db.users.getUser([email])

        if(existingUser) {
            return res.status(409).send('Email address already registered, please sign in.')
        }
    
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.users.register([hash, email, first_name, last_name])

        req.session.user = newUser    
    },

    signIn: async (req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const [existingUser] = await db.users.getUser([email])

        if(!existingUser) {
            return res.status(404).send('There is no account associated with that email address, please register.')
        }

        const isAuthenticated = await bcryp.compareSync(password, existingUser.hash)

        if(!isAuthenticated) {
            return res.status(409).send('Incorrect password, please try again.')
        }

        delete existingUser.hash

        req.session.user = existingUser

        res.status(200).send(req.session.user)
    },

    getUser: (req, res) => {
        const {user} = req.session
        if(user) {
            return res.status(200).send(user)
        } res.status(401)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }    

}