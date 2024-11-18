const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    client: {
        name: String,
        contact: String,
        projectDescription: String,
    },
    materials: [
        {
            name: String,
            quantity: Number,
            unitCost: Number,
        },
    ],
    labor: [
        {
            type: String,
            hours: Number,
            hourRate: Number,
        },
    ],
    total: Number,
});

module.exports = mongoose.model('Budget', BudgetSchema);
