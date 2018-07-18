const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
let vagas = require('./config/vagas.js');
const Vaga = require('./model/vaga.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
        return res.send('Hello World!');
    } catch (error) {
        
    }
})

app.get('/vagas', async (req, res) => {
    return res.send(vagas);
})

app.post('/vagas', async (req, res) => {
    try {
        let vagasLength = vagas.length;
        let vaga = createVaga(req.body);
        vagas.push(vaga);
        if (vagas.length > vagasLength) return res.send('Added');
        return res.status(500).send('Internal');
    } catch (error) {
        return res.status(500).send('Internal error');        
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

const createVaga = (obj) => new Vaga(
    obj.id, 
    obj.name, 
    obj.description,
    obj.skills, 
    obj.salary, 
    obj.area, 
    obj.differentials, 
    obj.isPcd, 
    obj.isActive 
)