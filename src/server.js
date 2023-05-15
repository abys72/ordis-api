const errorHandler = require('./helpers/errorHandler')
const cors = require("cors");
const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const terminalRoutes = require('./routes/terminalCommand');
const session = require('express-session');
const app=express();
const userRoutes = require('./routes/userRoutes');
const hostRoutes = require('./routes/hostRoutes');
const dockerRoutes = require('./routes/dockerRoutes');
app.use(session({
    secret: "sadjsa@#sdfKSA.s240",
    resave: false,
    saveUninitialized: true,
}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(errorHandler);
app.use(helmet());


app.use('/auth', userRoutes);
app.use('/hosts', hostRoutes)
app.use('/docker', dockerRoutes);
app.use('/shell', terminalRoutes);
app.use((req, res, next) => {
    res.status(404).json({ message: 'La ruta solicitada no existe' });
});

module.exports = { app };