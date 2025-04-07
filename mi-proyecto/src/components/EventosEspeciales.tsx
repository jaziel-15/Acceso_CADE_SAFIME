//EventosEspeciales.tsx
import React, { useState } from 'react';
import Header from './Header';
import QRCodeComponent from './QRcode';

interface EventosEspecialesProps {
    onLogout: () => void;
    onNavigateToMenu: () => void; // Nueva propiedad para ir al menú
}

const EventosEspeciales: React.FC<EventosEspecialesProps> = ({ onLogout, onNavigateToMenu }) => {
    const [showForm, setShowForm] = useState(false);

    const handleScan = () => {
        // Simulación del escaneo QR
        setShowForm(true); // Muestra el formulario después de escanear
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Entrada registrada correctamente.");
        onNavigateToMenu(); // Navegar al menú
    };

    return (
        <div className="container">
            <Header />
            <button id="logout" onClick={onLogout}>
                Cerrar Sesión
            </button>
            <QRCodeComponent />
            <video id="qr-video"></video>
           
            <button id="scan-qr" onClick={handleScan}>
                Hacer un evento especial
            </button>

            {showForm && (
                <form id="info-form" onSubmit={handleSubmit}>
                    <input type="text" id="nombre" placeholder="Nombre"  />
                    <input type="text" id="matricula" placeholder="Matrícula"  />
                    <input type="text" id="carrera" placeholder="Carrera"  />

                    <label htmlFor="asociacion">Asociación:</label>
                    <select id="asociacion">
                        <option>Allende</option>
                        <option>AMEF</option>
                        <option>ASEVER</option>
                        <option>Cadereyta</option>
                        <option>CBTis</option>
                        <option>Chihuahua</option>
                        <option>China</option>
                        <option>Durango</option>
                        <option>Ex-EIAO</option>
                        <option>FIME Verde</option>
                        <option>Frontera Chica</option>
                        <option>Hidalgo</option>
                        <option>Laredo</option>
                        <option>Linares</option>
                        <option>Matamoros</option>
                        <option>Monclova</option>
                        <option>Montemorelos</option>
                        <option>Oaxaca</option>
                        <option>Pacifico</option>
                        <option>Parras</option>
                        <option>Poza Rica</option>
                        <option>RC</option>
                        <option>Reynosa</option>
                        <option>Sabinas</option>
                        <option>San Luis Potosi</option>
                        <option>Santa Catarina</option>
                    </select>

                    <label htmlFor="hora-llegada">Hora de llegada:</label>
                    <input type="text" id="hora-llegada"  />

                    <label htmlFor="motivo">Motivo de visita:</label>
                    <select id="motivo">
                        <option>Convivencia con su asociación</option>
                        <option>Realizar tarea</option>
                        <option>Socializar</option>
                        <option>Pedir información</option>
                        <option value="otro">Otro</option>
                    </select>
                    <input
                        type="text"
                        id="otro-motivo"
                        placeholder="Especifique el motivo"
                        style={{ display: 'none' }}
                    />

                    <label htmlFor="area">Área de destino:</label>
                    <select id="area">
                        <option>Segundo piso</option>
                        <option>HUB</option>
                        <option>Sala de juntas</option>
                    </select>

                    <button type="submit">Registrar Entrada</button>
                </form>
            )}
        </div>
    );
};

export default EventosEspeciales;
