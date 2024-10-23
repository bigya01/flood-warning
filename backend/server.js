const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
// const dotenv = require('dotenv');
const rainfallRoutes = require('./routes/rainfallRoutes');



// Load environment variables from .env file
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/rainfall', rainfallRoutes);


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error(err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
