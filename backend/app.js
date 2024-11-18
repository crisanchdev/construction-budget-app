const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const budgetRoutes = require('./routes/budgetRoutes');
app.use('/budgets', budgetRoutes);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
