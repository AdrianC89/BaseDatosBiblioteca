import { Router } from "express";
import Autor from "../models/autor.js";

const autoresRouter = Router();

autoresRouter.get('/autores', async (req, res) => {
    try {
        const autores = await Autor.findAll();
        res.json(autores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

autoresRouter.get('/autores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const autor = await Autor.findByPk(id);
        if (autor) {
            res.json(autor);
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

autoresRouter.post('/autores', async (req, res) => {
    try {
        const { name } = req.body;
        const nuevoAutor = await Autor.create({ name });
        res.status(201).json(nuevoAutor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

autoresRouter.put('/autores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const autor = await Autor.findByPk(id);
        if (autor) {
            autor.name = name;
            await autor.save();
            res.status(202).json(autor);
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

autoresRouter.delete('/autores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await Autor.destroy({
            where: { autor_id: id }
        });
        if (rowsDeleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default autoresRouter;
