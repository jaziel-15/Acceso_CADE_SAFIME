import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Scanner from './components/Scanner';
import Menu from './components/Menu';
import Alumno from './components/Alumno';
import EventosEspeciales from './components/EventosEspeciales';
import Reporte from './components/Reporte';
import TablaUsuariosVista from './components/TablaUsuariosVista'; // <-- IMPORTA el componente de usuarios

const App: React.FC = () => {
    const [view, setView] = useState('login');

    const handleLoginSuccess = () => setView('menu');
    const handleRegisterSuccess = () => {
        alert('Registro exitoso, ahora puedes iniciar sesión.');
        setView('login');
    };
    const handleLogout = () => setView('login');
    const handleNavigateToAlumno = () => setView('alumno');
    const handleNavigateToEventos = () => setView('eventos');
    const handleNavigateToReporte = () => setView('reporte');

    return (
        <div>
            {view === 'login' && (
                <Login
                    onLoginSuccess={handleLoginSuccess}
                    onNavigateToRegister={() => setView('register')}
                />
            )}
            {view === 'register' && (
                <Register
                    onRegisterSuccess={handleRegisterSuccess}
                    onNavigateToLogin={() => setView('login')}
                />
            )}
            {view === 'scanner' && <Scanner />}
            {view === 'menu' && (
                <>
                    <Menu
                        onLogout={handleLogout}
                        onNavigateToAlumno={handleNavigateToAlumno}
                        onNavigateToEventos={handleNavigateToEventos}
                        onNavigateToReporte={handleNavigateToReporte}
                    />
                    {/* Aquí mostramos la tabla de usuarios */}
                    <TablaUsuariosVista />
                </>
            )}
            {view === 'alumno' && (
                <Alumno
                    onLogout={handleLogout}
                    onNavigateToMenu={() => setView('menu')}
                />
            )}
            {view === 'eventos' && (
                <EventosEspeciales
                    onLogout={handleLogout}
                    onNavigateToMenu={() => setView('menu')}
                />
            )}
            {view === 'reporte' && (
                <Reporte
                    onLogout={handleLogout}
                />
            )}
        </div>
    );
};

export default App;
