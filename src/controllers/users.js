import { Router } from "express";
import User from "../models/user.js";

const usersRouter = Router();

usersRouter.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

usersRouter.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByPk(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

usersRouter.post('/users', async (req, res) => {
    try {
        const { user_id, username, password_hash, email, role_id } = req.body
        const newUser = await User.create({
            user_id,
            username,
            password_hash,
            email,
            role_id
        })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

usersRouter.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id)
        if (user) {
            await User.update(req.body)
            res.status(202).json(User)
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

usersRouter.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete user with ID: ${id}`);
        const result = await User.destroy({
            where: { user_id: id }
        });
        console.log(`Delete result: ${result}`);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
})

export default usersRouter
