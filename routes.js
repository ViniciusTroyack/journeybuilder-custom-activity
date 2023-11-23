const express = require("express");
const router = express.Router();
const path = require("path");
const zendeskController = require('./src/controllers/zendeskController');

router.post('/execute', zendeskController.createZendeskTicket);
router.post("/on-publish", async (req, res) => {
    res.end();
});
router.post("/on-save", async (req, res) => {
    res.end();
});
router.post("/on-validade", async (req, res) => {
    res.end();
});
router.post("/on-stop", async (req, res) => {
    res.end();
});

router.get("/", express.static(path.resolve(__dirname, "public")));

module.exports = router;
