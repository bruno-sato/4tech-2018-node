'use strict';

const tokenValidator = require('../../config/security/tokenValidator');

module.exports = app => {
    
    const jobsCollection = app.config.firebaseConfig.collection('jobs');
    
    app.get('/jobs', async (req, res) => {
        try {
            const docs = await jobsCollection.get();
            let jobs = [];
            docs.forEach(doc => { 
                jobs.push(extractJob(doc));
            })
            return res.send(jobs);
        } catch (error) {
            return res.status(500).send('error')
        }
    })
    
    app.get('/jobs/:id', async (req, res) => {
        const doc = await jobsCollection.doc(req.params.id).get();
        if (doc) {
            return res.send(extractJob(doc));
        } else {
            throw Error;
        }
    })
    
    app.post('/jobs', tokenValidator, async (req, res) => {
        try {
            let job = {
                "name": req.body.name, 
                "salary": req.body.salary,
                "area": req.body.area,
                "description": req.body.description,
                "skills": req.body.skills,
                "differentials": req.body.differentials,
                "isPcd": req.body.isPcd,
                "isActive": req.body.isActive
            }
            const fbReturn = await jobsCollection.add(job);
            if (fbReturn) {
                return res.send(fbReturn.id);
            } else {
                throw Error;
            }
        } catch (error) {
            return res.status(500).send(error);        
        }
    })
    
    app.put('/jobs/:id',tokenValidator, async (req, res) => {
        try {
            if (!req.body) {
                return res.status(403).send('Para alterar um usuário, é necessário passar algum valor');
            }
            const jobDoc = await jobsCollection.doc(req.params.id).update(req.body);
            if (jobDoc) {
                return res.send(`Vaga ${req.params.id} foi atualizada com sucesso!`);
            } else {
                return res.send(`A vaga ${req.params.id} não foi encontrada`);
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    })
    
    app.delete('/jobs/:id',tokenValidator, async (req, res) => {
        try {
            const deletedJob = await jobsCollection.doc(req.params.id).delete();
            if (deletedJob) {
                return res.send(`Vaga ${req.params.id} foi apagada com successo`);
            } else {
                throw Error;
            }
        } catch (error) {
            return res.status(500).send(error);        
        }
    })
    
    const extractJob = (job) => {
        let v = job.data();
        return {
            id: job.id,
            name: v.name, 
            salary: v.salary,
            area: v.area,
            description: v.description,
            skills: v.skills,
            differentials: v.differentials,
            isPcd: v.isPcd,
            isActive: v.isActive
        }
    }
}