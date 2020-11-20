const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body;

        //checks to see if someone exists in database
        const user = await db.check_user(username)
        if(user[0]){
            return res.status(409).send("user already exists")
        }

        //creates a hashpass for the password that is input
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        //creates new user in database with username and hashpass
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
        const [foundUser] = await db.check_user(username)
        if(!foundUser){
            return res.status(401).send('Incorrect login info')
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if( authenticated ){
            req.session.user = {
                userId: foundUser.user_id,
                username: foundUser.username
            }
            res.status(200).send(req.session.user);
            
        } else {
            res.status(401).send('Incorrect login information')
        }
    },
    
}