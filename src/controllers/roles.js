import { Router } from "express";
import Role from "../models/role.js";

const roleRouter = Router()

roleRouter.get('/roles', async(req,res) => {
    try {
        const roles = await Role.findAll()
        res.json(roles)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

roleRouter.get('/roles/:id', async(req,res) => {
    try {
        const {id} = req.params
        const rol = await Role.findByPk(id)
        res.json(rol)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

roleRouter.post('/roles', async(req,res) => {
    try {
        const {role_name} = req.body
        const newRole = await Role.create({
            role_name
        })
        res.status(201).json(newRole)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

roleRouter.put('/roles/:id', async(req,res) => {
    try {
        const {id} = req.params
        const rol = await Role.findByPk(id)
        rol.set(req.body)
        await rol.save()
        res.status(202).json(rol)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

roleRouter.delete('/roles/:id', async(req,res) => {
    try {
        const {id} = req.params
        await Role.destroy({
            where: {id}
        })
        res.status(204).end()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default roleRouter