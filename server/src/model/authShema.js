import mongoose from 'mongoose';

const auth = new mongoose.Schema(
    {
        username: { type: String, unique: true },
        password: String,
        email: String,
        address: String,
        image: { type: String, default: null },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Auth', auth);
