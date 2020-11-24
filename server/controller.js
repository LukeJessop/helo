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
    getPosts: (req, res) => {
        const db = req.app.get('db')
        const {search, myPosts} = req.query

        db.get_user_posts([myPosts, req.session.user.userId, search])
        .then((posts) => res.status(200).send(posts))
        .catch(err => console.log(err))
    },

    post: async (req, res) => {
        const db = req.app.get('db')
        const {title, imgUrl, content} = req.body
        const userId = req.session.user.userId
        await db.add_post([title, imgUrl, content, userId])
        console.log(title, imgUrl, content)
        res.sendStatus(200)
    },
    getPost: async  (req, res) => {
        try{
            const db = req.app.get('db')
            const {id} = req.params
            const [post] = await db.get_post(+id)
            res.status(200).send(post)
        }
        catch(err){
            console.log(err)
        }
    },
    delete: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        console.log(id)
        db.remove_post(+id).then((post) => res.status(200).send(post))
        
    },
    edit: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {title, img, content} = req.body
        console.log(title, img, content)
        db.edit_post(+id, title, img, content).then((post) => res.status(200).send(post))
    }
}