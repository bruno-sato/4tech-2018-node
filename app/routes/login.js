'use strict';

const jwt = require('jsonwebtoken');
const secretKey = require('../../config/secretKey');

module.exports = app => {

    const usersCollection = app.config.firebaseConfig.collection('users');

    app.post('/login', async (req, res, next) => {

        const docs = await usersCollection.get();
        const user = extractUser(docs.docs.find(doc => {
            let user = extractUser(doc);
            if (user.email === req.body.email && user.password === req.body.password) {
                return true;
            }
        }));
        if (user) {
            const id = user.id
            // JWT cria o token basedo nos valores que foram passados. !Nunca passe a senha!
            const token = jwt.sign({ id }, secretKey);
            res.send({ user: { name: user.name, email: user.email }, auth: true, token: token });
        } else {
            res.status(500).send('Login inválido!');
        }
    })
      
}

const extractUser = (doc) => {
    let user = doc.data();
    return {
        id: doc.id,
        name: user.name,
        email: user.email,
        password: user.password
    }
} 