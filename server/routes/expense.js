import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

router.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/expenses', async (req, res) => {
    const expense = new Expense({
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        date: req.body.date || new Date(),
        description: req.body.description || ''
    })

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/expenses/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (expense) {
            res.json({ message: 'Удалено'});
        } else {
            res.status(404).json({ message: 'Запись не найдена' });
        }
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/expenses/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (expense) {
            res.json(expense);
        } else {
            res.status(404).json({ message: 'Запись не найдена' });
        }
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
})

export default router;