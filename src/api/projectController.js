const projectDB = require('../database/projectDatabase');
const express = require('express');

const router = express.Router();

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    let project = await projectDB.getProject(req.params.id);
    res.json(project);
});

router.get('/', async (req, res) => {
    let project = await projectDB.getAllProject();
    res.json(project);
});

router.post('/', async (req, res) => {
    let project = await projectDB.postNewProject(req.body.projectId, req.body.name, req.body.slug, req.body.description);
    res.json(project);
});
module.exports = router;