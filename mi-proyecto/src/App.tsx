// src/App.tsx
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Scanner from './components/Scanner';
import Menu from './components/Menu';
import Alumno from './components/Alumno';
import EventosEspeciales from './components/EventosEspeciales';

const App: React.FC = () => {
    const [view, setView] = useState('login'); // Controla la vista actual

    const handleLoginSuccess = () => {
        setView('menu'); // Cambiar a la vista del menú después del inicio de sesión
    };

    const handleRegisterSuccess = () => {
        alert('Registro exitoso, ahora puedes iniciar sesión.');
        setView('login'); // Cambiar a la vista de inicio de sesión después del registro
    };

    const handleLogout = () => {
        setView('login'); // Volver a la vista de inicio de sesión
    };

    const handleNavigateToAlumno = () => {
        setView('alumno'); // Cambiar a la vista del componente "Alumno"
    };

    const handleNavigateToEventos = () => {
        setView('eventos'); // Cambiar a la vista del componente "EventosEspeciales"
    };

    return (
        <div>
            {view === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
            {view === 'register' && (
                <Register
                    onRegisterSuccess={handleRegisterSuccess}
                    onNavigateToLogin={() => setView('login')}
                />
            )}
            {view === 'scanner' && <Scanner />}
            {view === 'menu' && (
                <Menu
                    onLogout={handleLogout}
                    onNavigateToAlumno={handleNavigateToAlumno}
                    onNavigateToEventos={handleNavigateToEventos}
                />
            )}
            {view === 'alumno' && <Alumno onLogout={handleLogout} onNavigateToMenu={() => setView('menu')} />}
            {view === 'eventos' && <EventosEspeciales onLogout={handleLogout} onNavigateToMenu={() => setView('menu')} />}
        </div>
    );
};

export default App;

