import express from "express";
import sequelize from './database/connect.js';

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server on in port ${PORT}`);
});
