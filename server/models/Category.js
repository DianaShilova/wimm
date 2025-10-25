import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  plannedMonthlySum: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Category', categorySchema);
