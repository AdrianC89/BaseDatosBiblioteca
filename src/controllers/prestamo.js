import { Router } from 'express';
import Prestamo from '../models/prestamo.js';
import User from '../models/user.js';
import Libro from '../models/libros.js';

const prestamosRouter = Router();

// Obtener todos los préstamos
prestamosRouter.get('/prestamos', async (req, res) => {
    try {
        const prestamos = await Prestamo.findAll({
            include: [
                { model: User, attributes: ['username', 'email'] },
                { model: Libro, attributes: ['title', 'isbn'] }
            ]
        });
        res.json(prestamos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un préstamo por ID
prestamosRouter.get('/prestamos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const prestamo = await Prestamo.findByPk(id, {
            include: [
                { model: User, attributes: ['username', 'email'] },
                { model: Libro, attributes: ['title', 'isbn'] }
            ]
        });
        if (prestamo) {
            res.json(prestamo);
        } else {
            res.status(404).json({ error: 'Prestamo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo préstamo
prestamosRouter.post('/prestamos', async (req, res) => {
    try {
        const { user_id, libro_id, prestamo_date, due_date, return_date } = req.body;
        const newPrestamo = await Prestamo.create({
            user_id,
            libro_id,
            prestamo_date,
            due_date,
            return_date
        });
        res.status(201).json(newPrestamo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un préstamo existente
prestamosRouter.put('/prestamos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const prestamo = await Prestamo.findByPk(id);
        if (prestamo) {
            await prestamo.update(req.body);
            res.status(202).json(prestamo);
        } else {
            res.status(404).json({ error: 'Prestamo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un préstamo
prestamosRouter.delete('/prestamos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete prestamo with ID: ${id}`);
        const result = await Prestamo.destroy({
            where: { prestamo_id: id }
        });
        console.log(`Delete result: ${result}`);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Prestamo not found' });
        }
    } catch (error) {
        console.error(`Error deleting prestamo: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

export default prestamosRouter;