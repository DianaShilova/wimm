import mongoose from 'mongoose';

const walltSchema = new mongoose.Schema({
    balance: {
        type: Number,
        required: true,
    },
    account: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Wallet', walltSchema);