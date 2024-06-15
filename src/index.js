import express from 'express';
import sequelize from './database/connect.js';
import './models/user.js'
import roleRouter from './controllers/roles.js';
import usersRouter from './controllers/users.js';


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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor corriendo en ${PORT}`);
});
