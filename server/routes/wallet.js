import express from 'express';
import Wallet from '../models/Wallet.js';

const router = express.Router();

router.get('/wallet', async (req, res) => {
    try {
        const data = await Wallet.find();
        const walletSums = data.reduce((acc, wallet) => {
            if (acc[wallet.account]) {
                acc[wallet.account] += wallet.balance;
            } else {
                acc[wallet.account] = wallet.balance;
            }
            return acc;
        }, {});

        const walletBalances = Object.entries(walletSums).map(([account, balance]) => ({
            account: account,
            amount: balance
        }));

        res.json(walletBalances);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/wallet', async (req, res) => {
    try {
        const wallet = new Wallet({
            balance: req.body.amount,
            account: req.body.account
        });
        
        const newWallet = await wallet.save();
        res.status(201).json(newWallet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
