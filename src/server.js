const errorHandler = require('./helpers/errorHandler')
const cors = require("cors");
const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const app=express();
const userRoutes = require('./routes/userRoutes');
const hostRoutes = require('./routes/hostRoutes');
const dockerRoutes = require('./routes/dockerRoutes');
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler);
app.use(helmet());
app.use('/auth', userRoutes);
app.use('/hosts', hostRoutes)
app.use('/docker', dockerRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'La ruta solicitada no existe' });
});

module.exports = { app };