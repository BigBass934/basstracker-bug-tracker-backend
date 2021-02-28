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
    let ticket = await ticketDB.postNewTicket(req.body.ticketId, req.body.Project, req.body.Tag, req.body.TicketDescription, req.body.TicketName, req.body.Timestamp, req.body.projectId, req.body.slug);
    res.json(ticket);
});
router.put('/:id', async(req, res) => {
    let ticket = await ticketDB.updateTicket(req.body.ticketId, req.body.Project, req.body.Tag, req.body.TicketDescription, req.body.TicketName, req.body.Timestamp, req.body.projectId, req.body.slug);
    res.json(ticket);
})


module.exports = router;