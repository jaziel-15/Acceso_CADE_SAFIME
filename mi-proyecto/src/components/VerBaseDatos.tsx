import React from 'react';
import TablaUsuariosVista from './TablaUsuariosVista';

interface VerBaseDatosProps {
  onLogout: () => void;
  onNavigateToMenu: () => void;
}

const VerBaseDatos: React.FC<VerBaseDatosProps> = ({ onLogout, onNavigateToMenu }) => {
  return (
    <div className="container">
      <h2>Base de Datos de Usuarios</h2>

      {/* Botones de navegación */}
      <button onClick={onNavigateToMenu}>Volver al Menú</button>
      <button onClick={onLogout}>Cerrar Sesión</button>

      {/* Tabla de usuarios */}
      <TablaUsuariosVista />
    </div>
  );
};

export default VerBaseDatos;
