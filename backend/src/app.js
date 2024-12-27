const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes/api.routes');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined')); // combined, common, short, tiny
app.use(helmet()); // protect info header

// cors
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

module.exports = app;