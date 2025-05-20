import React from 'react';
import TablaUsuariosVista from './TablaUsuariosVista';
import TablaAlumnos from './HistorialEntradas';

interface VerBaseDatosProps {
  onLogout: () => void;
  onNavigateToMenu: () => void;
}

const VerBaseDatos: React.FC<VerBaseDatosProps> = ({ onLogout, onNavigateToMenu }) => {
  return (
    <div className="container">
      <h2>Base de Datos</h2>

      <button onClick={onNavigateToMenu}>Volver al Menú</button>
      <button onClick={onLogout}>Cerrar Sesión</button>

      <TablaUsuariosVista />
      <TablaAlumnos />
    </div>
  );
};

export default VerBaseDatos;
