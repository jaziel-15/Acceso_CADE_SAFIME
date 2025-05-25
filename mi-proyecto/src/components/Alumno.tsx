//Alumno.tsx
import React, { useRef } from 'react';
import Header from './Header';
import QRCodeComponent from './QRcode';
import { supabase } from '../services/supabase';

interface AlumnoProps {
    onLogout: () => void;
    onNavigateToMenu: () => void;
}

const Alumno: React.FC<AlumnoProps> = ({ onLogout, onNavigateToMenu }) => {
    const nombreRef = useRef<HTMLInputElement>(null);
    const matriculaRef = useRef<HTMLInputElement>(null);
    const carreraRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const horaRef = useRef<HTMLInputElement>(null);
    const motivoRef = useRef<HTMLSelectElement>(null);
    const otroMotivoRef = useRef<HTMLInputElement>(null);
    const areaRef = useRef<HTMLSelectElement>(null);
    const asociacionRef = useRef<HTMLSelectElement>(null); // <--- AÑADIDO

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const motivoSeleccionado = motivoRef.current?.value;
        const motivo =
            motivoSeleccionado === 'otro'
                ? otroMotivoRef.current?.value || 'Otro'
                : motivoSeleccionado;

        const { error } = await supabase.from('alumnos').insert({
            nombre: nombreRef.current?.value || '',
            matricula: matriculaRef.current?.value || '',
            programa: carreraRef.current?.value || '',
            correo: emailRef.current?.value || '',
            motivo: motivo || '',
            destino: areaRef.current?.value || '',
            timestamp: new Date().toISOString(),
            asociacion: asociacionRef.current?.value || '', // <--- AÑADIDO AQUÍ
        });

        if (error) {
            console.error('Error al registrar en la base de datos:', error.message);
            alert('Hubo un error al registrar la entrada.');
        } else {
            alert('Entrada registrada correctamente.');
            onNavigateToMenu();
        }
    };

    return (
        <div className="container">
            <Header />
            <button onClick={onNavigateToMenu}>Volver al Menú</button>
            <button id="logout" onClick={onLogout}>Cerrar Sesión</button>

            <QRCodeComponent />
            <video id="qr-video"></video>

            <form id="info-form" onSubmit={handleSubmit}>
                <input type="text" id="nombre" placeholder="Nombre" ref={nombreRef} />
                <input type="text" id="matricula" placeholder="Matrícula" ref={matriculaRef} />
                <input type="text" id="carrera" placeholder="Carrera" ref={carreraRef} />
                <input type="email" id="email" placeholder="Correo electrónico" ref={emailRef} />

                <label htmlFor="asociacion">Asociación:</label>
                <select id="asociacion" ref={asociacionRef}>
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
                <input type="text" id="hora-llegada" ref={horaRef} />

                <label htmlFor="motivo">Motivo de visita:</label>
                <select id="motivo" ref={motivoRef}>
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
                    ref={otroMotivoRef}
                    style={{ display: 'none' }}
                />

                <label htmlFor="area">Área de destino:</label>
                <select id="area" ref={areaRef}>
                    <option>Segundo piso</option>
                    <option>HUB</option>
                    <option>Sala de juntas</option>
                </select>

                <button type="submit">Registrar Entrada</button>
            </form>
        </div>
    );
};

export default Alumno;
