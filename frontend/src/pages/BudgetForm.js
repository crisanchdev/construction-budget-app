
import React, { useState } from 'react';

function BudgetForm() {
    const [client, setClient] = useState({ name: '', contact: '', projectDescription: '' });
    const [materials, setMaterials] = useState([{ name: '', quantity: 0, unitCost: 0 }]);
    const [labor, setLabor] = useState([{ type: '', hours: 0, hourRate: 0 }]);
    const [extraCosts, setExtraCosts] = useState([{ name: '', cost: 0 }]);
    const [iva, setIva] = useState(16); // IVA en porcentaje
    const [total, setTotal] = useState(0);

    const calculateTotal = () => {
        const materialTotal = materials.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
        const laborTotal = labor.reduce((sum, item) => sum + item.hours * item.hourRate, 0);
        const extraTotal = extraCosts.reduce((sum, item) => sum + item.cost, 0);
        const subtotal = materialTotal + laborTotal + extraTotal;
        const totalWithIva = subtotal + (subtotal * iva) / 100;
        setTotal(totalWithIva);
    };

    const handleMaterialChange = (index, field, value) => {
        const updatedMaterials = [...materials];
        updatedMaterials[index][field] = value;
        setMaterials(updatedMaterials);
        calculateTotal();
    };

    return (
        <div>
            <h2>Crear Presupuesto</h2>
            <div>
                <h3>Datos del Cliente</h3>
                <input
                    placeholder="Nombre"
                    value={client.name}
                    onChange={e => setClient({ ...client, name: e.target.value })}
                />
                <input
                    placeholder="Contacto"
                    value={client.contact}
                    onChange={e => setClient({ ...client, contact: e.target.value })}
                />
                <textarea
                    placeholder="Descripción del Proyecto"
                    value={client.projectDescription}
                    onChange={e => setClient({ ...client, projectDescription: e.target.value })}
                />
            </div>
            <div>
                <h3>Materiales</h3>
                {materials.map((material, index) => (
                    <div key={index}>
                        <input
                            placeholder="Material"
                            value={material.name}
                            onChange={e => handleMaterialChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Cantidad"
                            value={material.quantity}
                            onChange={e => handleMaterialChange(index, 'quantity', parseFloat(e.target.value))}
                        />
                        <input
                            type="number"
                            placeholder="Costo Unitario"
                            value={material.unitCost}
                            onChange={e => handleMaterialChange(index, 'unitCost', parseFloat(e.target.value))}
                        />
                    </div>
                ))}
                <button onClick={() => setMaterials([...materials, { name: '', quantity: 0, unitCost: 0 }])}>
                    Agregar Material
                </button>
            </div>
            <div>
                <h3>Total Estimado</h3>
                <p>Total (IVA incluido): ${total.toFixed(2)}</p>
            </div>
            <button onClick={() => alert('Presupuesto enviado')}>Enviar Presupuesto</button>
        </div>
    );
}

export default BudgetForm;
