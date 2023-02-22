import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import db from '../src/db/index.js';

//config
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

// body paser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to databse mooges db
db();

// use router
routes(app);

// listten app with port 5000 or 8000
app.listen(port, () => {
    console.log(`blog app listening on port ${port}`);
});
