const express = require('express');

const project = require('./projectController');
const ticket = require('./ticketController');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API - :wave::earth_americas::earth_africa::earth_asia:',
    });
});

router.use('/project', project);
router.use('/ticket', ticket);

module.exports = router;