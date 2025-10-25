import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import expenseRoutes from './routes/expense.js';
import walletRoutes from './routes/wallet.js';
import categoryRoutes from './routes/category.js';

dotenv.config();

const app = express();
const logger = morgan('combined');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api', expenseRoutes);
app.use('/api', walletRoutes);
app.use('/api', categoryRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Сервер запущен!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
