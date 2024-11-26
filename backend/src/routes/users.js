import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const users = express.Router();

users.use(express.json());
users.use(express.urlencoded({ extended: true }));
const secret = 'your_jwt_secret'; // Change this to a secure secret

users.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        user_orders: {
          include: {
            item: {
              select: {
                item_id: true,
                name: true,
                description: true,
                price: true,
                item_category: {
                  select: {
                    size: true,
                    designer: true,
                  }
                },
                offer: {
                  select: {
                    image_path: true,
                  }
                }
              }
            }
          }
        }
      }
    });
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch account info' });
  }
});


users.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from the database
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate JWT token or manage session
  // Return success response
  res.json({ message: 'Login successful' });
});


users.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

users.post('/:userId/cart', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { itemId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { user_id: userId } });
    const item = await prisma.item.findUnique({ where: { item_id: itemId } });

    if (!user || !item) {
      return res.status(404).json({ error: 'User or item not found' });
    }

    await prisma.user_cart.create({
      data: {
        user_id: userId,
        item_id: itemId,
      }
    });

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sprawdź, czy przedmiot jest w koszyku użytkownika
users.get('/:userId/cart/:itemId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const itemId = parseInt(req.params.itemId);

  try {
    const userCartItem = await prisma.user_cart.findFirst({
      where: {
        user_id: userId,
        item_id: itemId,
      },
    });

    res.status(200).json({ inCart: !!userCartItem });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Usuń przedmiot z koszyka użytkownika
users.delete('/:userId/cart/:itemId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const itemId = parseInt(req.params.itemId);

  try {
    await prisma.user_cart.deleteMany({
      where: {
        user_id: userId,
        item_id: itemId,
      },
    });

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get all orders for a specific user
users.get('/:id/orders', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const orders = await prisma.userOrder.findMany({
            where: { user_id: userId },
            include: { item: true },
        });
        res.json(orders);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Place an order for the user
users.post('/:userId/order', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { items } = req.body;

  try {
    const orderPromises = items.map(async (itemId) => {
      // Add item to user orders
      await prisma.user_orders.create({
        data: {
          user_id: userId,
          item_id: itemId,
        }
      });
      // Remove item from user cart
      await prisma.user_cart.deleteMany({
        where: {
          user_id: userId,
          item_id: itemId,
        },
      });
    });

    await Promise.all(orderPromises);

    res.status(200).json({ message: 'Order placed successfully and items removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});
users.get('/:id/shipping', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const userShipping = await prisma.user_shipping.findUnique({
      where: { user_id: userId },
      include: {
        user: { select: { name: true } }
      }
    });

    if (userShipping) {
      res.json(userShipping);
    } else {
      res.status(404).json({ error: 'User shipping details not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shipping details' });
  }
});


// Route to get items in the cart for a specific user
users.get('/:id/cart', async (req, res) => {
    const userId = parseInt(req.params.id);
  
    try {
      const cartItems = await prisma.user_cart.findMany({
        where: { user_id: userId },
        include: { 
          item: {
            select: {
              item_id: true,
              name: true,
              description: true,
              price: true,
              item_category: {
                select: {
                  size: true,
                  designer: true,
                }
              },
              offer: {
                select: {
                  image_path: true,
                }
              }
            }
          }
        },
      });
      
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cart items' });
    }
  });
  


export default users;