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
        const {role_id, role_name} = req.body
        const newRole = await Role.create({
            role_id,
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

roleRouter.delete('/roles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete role with ID: ${id}`);
        const result = await Role.destroy({
            where: { role_id: id }
        });
        console.log(`Delete result: ${result}`);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: "Role not found" });
        }
    } catch (error) {
        console.error(`Error deleting role: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

export default roleRouter