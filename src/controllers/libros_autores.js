import { Router } from "express";
import LibroAutor from "../models/libro_autor.js";

const librosAutoresRouter = Router();

librosAutoresRouter.get('/libros_autores', async (req, res) => {
    try {
        const librosAutores = await LibroAutor.findAll();
        res.json(librosAutores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

librosAutoresRouter.get('/libros_autores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const libroAutor = await LibroAutor.findByPk(id);
        if (libroAutor) {
            res.json(libroAutor);
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

librosAutoresRouter.post('/libros_autores', async (req, res) => {
    try {
        const { book_id, author_id } = req.body;
        const nuevoLibroAutor = await LibroAutor.create({ book_id, author_id });
        res.status(201).json(nuevoLibroAutor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

librosAutoresRouter.put('/libros_autores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { book_id, author_id } = req.body;
        const libroAutor = await LibroAutor.findByPk(id);
        if (libroAutor) {
            libroAutor.book_id = book_id;
            libroAutor.author_id = author_id;
            await libroAutor.save();
            res.status(202).json(libroAutor);
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

librosAutoresRouter.delete('/libros_autores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await LibroAutor.destroy({
            where: { id }
        });
        if (rowsDeleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default librosAutoresRouter;
