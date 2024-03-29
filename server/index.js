const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoute');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

mongoose.connect('mongodb://127.0.0.1:27017/authentication')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect MongoDB:', error));

// Error Handling Middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
