import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const offers = express.Router();

offers.use(express.json());
offers.use(express.urlencoded({ extended: true }));


offers.get('/', async (req, res) => {
    try {
        const offers = await prisma.offer.findMany({
            include: { item: true },
        });
        res.json(offers);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default offers;