import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import items from './routes/items.js';
import offers from './routes/offers.js';
import users from './routes/users.js';
import login from './routes/login.js';
import cors from 'cors';
const app = express();
const prisma = new PrismaClient();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Grailz');
});

app.use('/items',items);
app.use('/offers', offers);
app.use('/users', users);
app.use('/login', login);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
