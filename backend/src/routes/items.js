import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const items = express.Router();
items.use(express.json());
items.use(express.urlencoded({ extended: true }));

items.get('/', async (req, res) => {
    const { name, minPrice, maxPrice } = req.query;
    
    const filterConditions = {
        where: {},
        include: {
            offer: true, // Dołącz model offer
        },
    };

    if (name) {
        filterConditions.where.name = {
            contains: name,
        };
    }

    if (minPrice) {
        filterConditions.where.price = {
            ...filterConditions.where.price,
            gte: parseFloat(minPrice),
        };
    }

    if (maxPrice) {
        filterConditions.where.price = {
            ...filterConditions.where.price,
            lte: parseFloat(maxPrice),
        };
    }

    try {
        const items = await prisma.item.findMany(filterConditions);

        // Dodaj image_path do każdego zwracanego obiektu
        const itemsWithImagePath = items.map(item => ({
            ...item,
            image_path: item.offer?.image_path || 'default-image-path.jpg',
        }));

        res.json(itemsWithImagePath);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

items.get('/:id/user-count', async (req, res) => {
    const itemId = parseInt(req.params.id);
    try {
        const count = await prisma.user_cart.count({
            where: {
                item_id: itemId
            }
        });
        res.json({ itemId, userCount: count });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to get a specific item by ID
items.get('/id/:id', async (req, res) => {
    const itemId = parseInt(req.params.id);
    try {
        const item = await prisma.item.findUnique({
            where: { item_id: itemId },
            include: {
                item_category: true,
                measurements: true,
                offer: true,
                user_cart: true,
                user_orders: true,
            },
        });
        if (item) {
            res.json(item);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

items.get('/filtr/:department?/:category?', async (req, res) => {
    const { department, category } = req.params;
    const { name, minPrice, maxPrice } = req.query;

    let whereClause = {};

    if (department && department !== 'all') {
        whereClause = {
            ...whereClause,
            item_category: {
                department: department,
                ...(category ? { category: category } : {}),
            },
        };
    } else if (department === 'all' && category) {
        whereClause = {
            ...whereClause,
            item_category: {
                category: category,
            },
        };
    }

    if (name) {
        whereClause = {
            ...whereClause,
            name: { contains: name },
        };
    }

    if (minPrice || maxPrice) {
        whereClause = {
            ...whereClause,
            price: {
                ...(minPrice ? { gte: parseFloat(minPrice) } : {}),
                ...(maxPrice ? { lte: parseFloat(maxPrice) } : {}),
            },
        };
    }

    try {
        const items = await prisma.item.findMany({
            where: whereClause,
            include: {
                item_category: true,
                measurements: true,
                offer: true,
                user_cart: true,
                user_orders: true,
            },
        });

        const itemsWithImagePath = items.map(item => ({
            ...item,
            image_path: item.offer?.image_path || 'default-image-path.jpg',
        }));

        res.json(itemsWithImagePath);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching items.' });
    }
});


  

export default items;
