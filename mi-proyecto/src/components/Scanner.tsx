
// Scanner.tsx
import React, { useState } from 'react';

const Scanner: React.FC = () => {
    const [result, setResult] = useState('');

    const handleScan = () => {
        // Simulación de escaneo QR
        setResult('Resultado del QR: Jesús Lopez Pérez - Matrícula 2003331');
    };

    return (
        <div id="main-container">
            <h2>Escanear Código QR</h2>
            <video id="qr-video"></video>
            <p>{result || 'Esperando escaneo...'}</p>
            <button onClick={handleScan}>Escanear</button>
        </div>
    );
};

export default Scanner;


