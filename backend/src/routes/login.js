import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const login = express();

login.use(express.json());

login.post('/register', async (req, res) => {
    const { name, password, city } = req.body;

    // Validate input
    if (!name || !password) {
        return res.status(400).json({ message: 'Name and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({ where: { name } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create user with plain text password
        const newUser = await prisma.user.create({
            data: {
                name,
                password,
                city
            }
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



login.post('/', async (req, res) => {
    const { name, password } = req.body;

    // Validate input
    if (!name || !password) {
        return res.status(400).json({ message: 'Name and password are required' });
    }

    try {
        // Find user by name
        const user = await prisma.user.findFirst({ where: { name } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid name' });
        }

        // Compare passwords (without hashing)
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Successful login
        const token = jwt.sign({ userId: user.user_id }, 'tajnyKlucz', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, isLoggedIn: true, userId: user.user_id });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default login;