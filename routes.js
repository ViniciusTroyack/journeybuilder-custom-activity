const express = require('express');
const router = express.Router();
const zendeskController = require('./zendeskController');

router.post('/createTicket', zendeskController.createZendeskTicket);

module.exports = router;
