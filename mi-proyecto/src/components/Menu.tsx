// Menu.tsx
import React from 'react';
import Header from './Header'; // Si necesitas el Header aquí

interface MenuProps {
    onLogout: () => void; // Para manejar el cierre de sesión
    onNavigateToAlumno: () => void; // Para navegar a la vista "Alumno"
}

const Menu: React.FC<MenuProps> = ({ onLogout, onNavigateToAlumno }) => {
    return (
        <div>
            <Header /> {/* Header aparece en la parte superior */}
            <h2>Menú Principal</h2>
            <button onClick={onNavigateToAlumno}>Ingresar otro alumno</button>
            <button onClick={() => alert('Ver base de datos')}>Ver base de datos</button>
            <button onClick={() => alert('Generar reporte')}>Generar reporte</button>
            <button onClick={onLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Menu;

  