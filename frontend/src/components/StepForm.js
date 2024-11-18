
import React from 'react';

function StepForm({ step, onNext, onPrevious, children }) {
    return (
        <div>
            <div>{children}</div>
            <button onClick={onPrevious} disabled={step === 1}>
                Anterior
            </button>
            <button onClick={onNext}>Siguiente</button>
        </div>
    );
}

export default StepForm;
