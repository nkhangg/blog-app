import mongoose from 'mongoose';

const post = new mongoose.Schema(
    {
        title: String,
        authorName: String,
        authorId: String,
        image: String,
        like: { type: Number, default: 1000 },
        likeId: { type: Array, default: null },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', post);
