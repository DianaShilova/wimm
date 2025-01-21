import express from 'express';
import Wallet from '../models/Wallet.js';

const router = express.Router();

router.get('/wallet', async (req, res) => {
    try {
        const data = await Wallet.find();
        const totalSum = data.reduce((acc, item) => acc + item.balance, 0);
        res.json(totalSum);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/wallet', async (req, res) => {
    try {
        const wallet = new Wallet({
            balance: req.body.amount
        });
        
        const newWallet = await wallet.save();
        res.status(201).json(newWallet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
