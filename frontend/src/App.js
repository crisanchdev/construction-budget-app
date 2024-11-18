
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BudgetForm from './pages/BudgetForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BudgetForm />} />
            </Routes>
        </Router>
    );
}

export default App;
