const ticketDB = require('../database/ticketDatabase');
const express = require('express');

const router = express.Router();

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    let ticket = await ticketDB.getTicket(req.params.id);
    res.json(ticket);
});

router.get('/', async (req, res) => {
    let ticket = await ticketDB.getAllTicket();
    res.json(ticket);
});
router.post('/', async (req, res) => {
    let ticket = await ticketDB.postNewTicket(req.body.ticketId, req.body.projectName, req.body.ticketTag, req.body.ticketDescription, req.body.ticketName, req.body.time_Stamp, req.body.projectId, req.body.ticketSlug);
    res.json(ticket);
});
router.put('/:id', async(req, res) => {
    console.log("got here")
    let ticket = await ticketDB.updateTicket(req.params.id, req.body.projectName, req.body.ticketTag, req.body.ticketDescription, req.body.ticketName, req.body.time_Stamp, req.body.projectId, req.body.ticketSlug);
    res.json(ticket);
})


module.exports = router;