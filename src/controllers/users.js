import { Router } from "express";
import user  from "../models/user.js";

const usersRouter = Router();

usersRouter.get('/users', async (req, res) => {
    try {
        const users = await user.findAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

usersRouter.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const foundUser = await user.findByPk(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

usersRouter.post('/users', async (req, res) => {
    try {
        const { user_id, username, password_hash, email, created_at, updated_at, role_id, is_moroso } = req.body
        const newUser = await user.create({
            user_id,
            username,
            password_hash,
            email,
            created_at,
            updated_at,
            role_id,
            is_moroso
        })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

usersRouter.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const User = await user.findByPk(id)
        if (User) {
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
        const { id } = req.params
        const rowsDeleted = await user.destroy({
            where: { id }
        })
        if (rowsDeleted) {
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default usersRouter
