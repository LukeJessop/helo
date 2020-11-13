const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.add_user([username, hash]);
        req.session.user = {
            userId: newUser.user_id,
            username: newUser.username
        }
        res.status(200).send(req.session.user);
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const [foundUser] = await db.check_user(email)
        if(!foundUser){
            return res.status(401).send('Incorrect login info')
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if( authenticated ){
            req.session.user = {
                userId: foundUser.user_id,
                email: foundUser.email,
                username: foundUser.username
            }
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send('Incorrect login information')
        }
    }
}