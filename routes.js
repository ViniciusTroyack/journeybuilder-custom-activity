const express = require('express');
const router = express.Router();
const zendeskController = require('./zendeskController');

router.post('/execute', zendeskController.createZendeskTicket);
router.post("/publish", async (req, res) => {
    res.end();
});
router.post("/save", async (req, res) => {
    res.end();
});
router.post("/validade", async (req, res) => {
    res.end();
});
router.post("/stop", async (req, res) => {
    res.end();
});


module.exports = router;
