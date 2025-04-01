import React from 'react';
import '../assets/styles.css'; // Asegúrate de importar los estilos globales si los necesitas

const Header: React.FC = () => {
    return (
        <header className="header-container">
            <img src="/src/assets/images/logo-uanl.png" alt="Logo UANL" className="logo-uanl" />
            <img src="/src/assets/images/logo-safime.png" alt="Logo SAFIME" className="logo-safime" />
            <img src="/src/assets/images/logo-fime.png" alt="Logo FIME" className="logo-fime" />
        </header>
    );
};

export default Header;
