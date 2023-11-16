import { Router } from 'express';
const router = Router();
import { createZendeskTicket } from './src/controllers/zendeskController';

router.post('/execute', createZendeskTicket);
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


export default router;
