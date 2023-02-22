import mongoose from 'mongoose';

const connectToDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://127.0.0.1:27017/blog-app', { useNewUrlParser: true });
        console.log('Connect to db is sucessfuly !');
    } catch (error) {
        console.log({ state: 'Connect to db is failsure !', error });
    }
};

export default connectToDb;
