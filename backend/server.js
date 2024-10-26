const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const rainfallRoutes = require('./routes/rainfallRoutes');

dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

console.log("Setting up /api/rainfall route");
app.use('/api/rainfall', rainfallRoutes);

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});



// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
