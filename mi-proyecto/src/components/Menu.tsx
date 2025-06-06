// Menu.tsx
import React from 'react';
import Header from './Header'; // Si necesitas el Header aquí

interface MenuProps {
    onLogout: () => void; // Para manejar el cierre de sesión
    onNavigateToAlumno: () => void; // Para navegar a la vista "Alumno"
    onNavigateToEventos: () => void; // Para navegar a la vista "Eventos Especiales"
    onNavigateToReporte: () => void; 
    onNavigateToBaseDatos: () => void; // ✅ Añadido
}

const Menu: React.FC<MenuProps> = ({ onLogout,onNavigateToReporte, onNavigateToAlumno, onNavigateToEventos, onNavigateToBaseDatos }) => {
    return (
        <div className="container">
            <Header /> {/* Header aparece en la parte superior */}
            <h2>Menú Principal</h2>
            <button onClick={onNavigateToAlumno}>Ingresar un alumno</button>
            <button onClick={onNavigateToEventos}>Eventos Especiales</button>
            <button onClick={onNavigateToBaseDatos}>Base de Datos</button>
            <button onClick={onNavigateToReporte}>Generar Reporte</button>
            <button onClick={onLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Menu;


  