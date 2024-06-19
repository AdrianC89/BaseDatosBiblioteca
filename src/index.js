import express from 'express';
import sequelize from './database/connect.js';
import './models/user.js'
import './models/autor.js';
import './models/libro.js';
import './models/libro_autor.js';
import './models/prestamo.js';
import roleRouter from './controllers/roles.js';
import usersRouter from './controllers/users.js';
import autoresRouter from './controllers/autores.js';
import librosAutoresRouter from './controllers/libros_autores.js';
import librosRouter from './controllers/libros.js';
import prestamosRouter from './controllers/prestamos.js';

const app = express();

app.use(express.json());

(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.get('/', (req, res) => {
    res.json({ message: 'todo ok' });
});

app.use(roleRouter);
app.use(usersRouter);
app.use(autoresRouter);
app.use(librosAutoresRouter);
app.use(librosRouter);
app.use(prestamosRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor corriendo en ${PORT}`);
});
