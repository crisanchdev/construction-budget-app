// API routes for budgets.router.get('/generate-pdf/:id', async (req, res) => {
try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
        return res.status(404).json({ message: 'Presupuesto no encontrado' });
    }

    const doc = new PDFDocument({ margin: 50 });
    const fileName = `presupuesto_${budget.client.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    const filePath = `./pdfs/${fileName}`;

    // Asegúrate de que exista la carpeta `pdfs`
    if (!fs.existsSync('./pdfs')) {
        fs.mkdirSync('./pdfs');
    }

    doc.pipe(fs.createWriteStream(filePath));

    // **Encabezado**
    doc
        .image('./logo.png', 50, 45, { width: 50 }) // Agregar un logo
        .fontSize(20)
        .text('Presupuesto de Construcción', 110, 50, { align: 'left' })
        .moveDown();

    // Información del cliente
    doc
        .fontSize(14)
        .text(`Cliente: ${budget.client.name}`, { align: 'left' })
        .text(`Contacto: ${budget.client.contact}`, { align: 'left' })
        .text(`Proyecto: ${budget.client.projectDescription}`, { align: 'left' })
        .moveDown();

    // **Tabla de Materiales**
    doc
        .fontSize(16)
        .fillColor('#333333')
        .text('Materiales', { align: 'left', underline: true })
        .moveDown(0.5);

    doc.fontSize(12);
    doc.text(`Material           Cantidad       Costo Unitario`, { align: 'left' });

    budget.materials.forEach(material => {
        doc.text(
            `${material.name.padEnd(20)} ${material.quantity
                .toString()
                .padStart(10)}         $${material.unitCost.toFixed(2).padStart(10)}`
        );
    });
    doc.moveDown();

    // **Tabla de Mano de Obra**
    doc
        .fontSize(16)
        .fillColor('#333333')
        .text('Mano de Obra', { align: 'left', underline: true })
        .moveDown(0.5);

    doc.fontSize(12);
    doc.text(`Tipo                Horas        Tarifa/Hora`, { align: 'left' });

    budget.labor.forEach(labor => {
        doc.text(
            `${labor.type.padEnd(20)} ${labor.hours.toString().padStart(10)}         $${labor.hourRate
                .toFixed(2)
                .padStart(10)}`
        );
    });
    doc.moveDown();

    // **Tabla de Otros Costos**
    doc
        .fontSize(16)
        .fillColor('#333333')
        .text('Otros Costos', { align: 'left', underline: true })
        .moveDown(0.5);

    doc.fontSize(12);
    budget.extraCosts.forEach(cost => {
        doc.text(`${cost.name} - $${cost.cost.toFixed(2)}`);
    });
    doc.moveDown();

    // **Total**
    doc
        .fontSize(16)
        .fillColor('#000000')
        .text(`Subtotal: $${(budget.total / 1.16).toFixed(2)}`, { align: 'right' })
        .text(`IVA: $${(budget.total - budget.total / 1.16).toFixed(2)}`, { align: 'right' })
        .text(`Total: $${budget.total.toFixed(2)}`, { align: 'right', underline: true });

    // **Pie de página**
    doc.moveDown();
    doc
        .fontSize(12)
        .fillColor('#777777')
        .text('Gracias por confiar en nosotros.', { align: 'center' })
        .text('Construcciones Ejemplo S.A. de C.V.', { align: 'center' })
        .text('Tel: +52 123 456 7890 | Email: contacto@construcciones.com', { align: 'center' });

    doc.end();

    res.status(200).json({ message: 'PDF generado', path: filePath });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el PDF', error: error.message });
}
});
