import { Router } from "express";
import Libro from "../models/libro.js";

const librosRouter = Router();

librosRouter.get('/libros', async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

librosRouter.get('/libros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findByPk(id);
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

librosRouter.post('/libros', async (req, res) => {
    try {
        const { title, isbn, publication_year, copies_available } = req.body;
        const nuevoLibro = await Libro.create({
            title,
            isbn,
            publication_year,
            copies_available
        });
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

librosRouter.put('/libros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, isbn, publication_year, copies_available } = req.body;
        const libro = await Libro.findByPk(id);
        if (libro) {
            libro.title = title;
            libro.isbn = isbn;
            libro.publication_year = publication_year;
            libro.copies_available = copies_available;
            await libro.save();
            res.status(202).json(libro);
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

librosRouter.delete('/libros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await Libro.destroy({
            where: { libro_id: id }
        });
        if (rowsDeleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default librosRouter;
