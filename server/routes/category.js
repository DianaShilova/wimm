import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/categories', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    plannedMonthlySum: req.body.plannedMonthlySum,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.json({ message: 'Категория удалена' });
    } else {
      res.status(404).json({ message: 'Категория не найдена' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Категория не найдена' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
