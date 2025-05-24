// EventosEspeciales.tsx
import React, { useState } from 'react';
import Header from './Header';
import { supabase } from '../services/supabase';

interface EventosEspecialesProps {
    onLogout: () => void;
    onNavigateToMenu: () => void;
}

const EventosEspeciales: React.FC<EventosEspecialesProps> = ({ onLogout, onNavigateToMenu }) => {
    const [encargado, setEncargado] = useState('');
    const [asociacion, setAsociacion] = useState('Allende');
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.from('eventos_especiales').insert({
            encargado,
            asociacion,
            fecha,
            hora_inicio: horaInicio,
            hora_fin: horaFin,
        });

        if (error) {
            alert("Error al registrar el evento: " + error.message);
        } else {
            alert("Evento especial registrado correctamente.");
            onNavigateToMenu();
        }
    };

    return (
        <div className="container">
            <Header />
            <button onClick={onNavigateToMenu}>Volver al Menú</button>
            <button id="logout" onClick={onLogout}>Cerrar Sesión</button>

            <form id="info-form" onSubmit={handleSubmit} className="evento-form">
                <label htmlFor="encargado">Nombre del encargado de la asociación:</label>
                <input type="text" id="encargado" value={encargado} onChange={e => setEncargado(e.target.value)} required />

                <label htmlFor="asociacion">Asociación:</label>
                <select id="asociacion" value={asociacion} onChange={e => setAsociacion(e.target.value)} required>
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
                <input type="date" id="fecha" value={fecha} onChange={e => setFecha(e.target.value)} required />

                <label htmlFor="hora-inicio">Hora de inicio:</label>
                <input type="text" id="hora-inicio" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} required />

                <label htmlFor="hora-fin">Hora de fin:</label>
                <input type="text" id="hora-fin" value={horaFin} onChange={e => setHoraFin(e.target.value)} required />

                <button type="submit">Registrar Evento</button>
            </form>
        </div>
    );
};

export default EventosEspeciales;
