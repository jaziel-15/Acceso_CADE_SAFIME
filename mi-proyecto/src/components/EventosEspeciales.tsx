// EventosEspeciales.tsx
import React from 'react';
import Header from './Header';

interface EventosEspecialesProps {
    onLogout: () => void;
    onNavigateToMenu: () => void;
}

const EventosEspeciales: React.FC<EventosEspecialesProps> = ({ onLogout, onNavigateToMenu }) => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Evento especial registrado correctamente.");
        onNavigateToMenu();
    };

    return (
        <div className="container">
            <Header />
            <button onClick={onNavigateToMenu}>Volver al Menú</button>
            <button id="logout" onClick={onLogout}>
                Cerrar Sesión
            </button>

            <form id="info-form" onSubmit={handleSubmit} className="evento-form">
                <label htmlFor="encargado">Nombre del encargado de la asociación:</label>
                <input type="text" id="encargado" required />

                <label htmlFor="asociacion">Asociación:</label>
                <select id="asociacion" required>
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

                <label htmlFor="fecha">Fecha:</label>
                <input type="date" id="fecha" required />

                <label htmlFor="hora-inicio">Hora de inicio:</label>
                <input type="text" id="hora-inicio" required />

                <label htmlFor="hora-fin">Hora de fin:</label>
                <input type="text" id="hora-fin" required />

                <button type="submit">Registrar Evento</button>
            </form>
        </div>
    );
};

export default EventosEspeciales;
