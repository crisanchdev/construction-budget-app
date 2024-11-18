
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const budgetRoutes = require('./routes/budgetRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/budgets', budgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
