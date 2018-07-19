'use strict';

let jobs = require('../../config/jobs.js');
const Job = require('../../model/job.js');

module.exports = app => {
    app.get('/jobs', async (req, res) => {
        return res.send(jobs);
    })
    
    app.get('/jobs/:id', async (req, res) => {
        return res.send(jobs.find(el => el.id === req.params.id));
    })
    
    app.post('/jobs', async (req, res) => {
        try {
            let jobsLength = jobs.length;
            let job = createJob(req.body);
            jobs.push(job);
            if (jobs.length > jobsLength) return res.send('Adicionado com sucesso');
            return res.status(500).send('Ops! Aconteceu um erro tentando cadastrar a vaga.');
        } catch (error) {
            return res.status(500).send(error);        
        }
    })
    
    app.put('/jobs/:id', async (req, res) => {
        try {
            if (!req.body) {
                return res.status(403).send('Para alterar um usuário, é necessário passar algum valor');
            }
            let index = await jobs.findIndex(job => job.id === req.params.id);
            if (index >= 0) {
                Object.keys(req.body).forEach(job => {
                    jobs[index][job] = req.body[job]
                })
                return res.send(`Vaga com o id ${req.params.id} alterada com sucesso`);
            }
            return res.send("nao foi encontrado vaga com esse id");
        } catch (error) {
            return res.status(500).send(error);
        }
    })
    
    app.delete('/jobs/:id', (req, res) => {
        try {
            let length = jobs.length;
            jobs.splice(jobs.findIndex(el => el.id === req.params.id), 1);
            if (jobs.length < length) return res.send(`A vaga com o id ${req.params.id} com successo`);
            else return res.status(500).send(`Não foi possível deletar a vaga ${req.params.id}`);
        } catch (error) {
            return res.status(500).send(error);        
        }
    })
    
    const createJob = (obj) => new Job(
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
}