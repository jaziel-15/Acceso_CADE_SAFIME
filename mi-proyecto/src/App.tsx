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

    // Función para manejar inicio de sesión exitoso
    const handleLoginSuccess = () => {
        setView('menu'); // Cambiar a la vista del menú después del inicio de sesión
    };

    // Función para manejar registro exitoso
    const handleRegisterSuccess = () => {
        alert('Registro exitoso, ahora puedes iniciar sesión.');
        setView('login'); // Cambiar a la vista de inicio de sesión después del registro
    };

    // Función para manejar cierre de sesión
    const handleLogout = () => {
        setView('login'); // Volver a la vista de inicio de sesión
    };

    // Función para navegar a la vista "Ingresar otro alumno"
    const handleNavigateToAlumno = () => {
        setView('alumno'); // Cambiar a la vista del componente "Alumno"
    };

    // Función para navegar a la vista "Eventos Especiales"
    const handleNavigateToEventos = () => {
        setView('eventos'); // Cambiar a la vista del componente "EventosEspeciales"
    };

    // Función para navegar al formulario de registro desde login
    const handleNavigateToRegister = () => {
        setView('register'); // Cambiar a la vista de registro
    };

    return (
        <div>
            {/* Vista de Login */}
            {view === 'login' && (
                <Login
                    onLoginSuccess={handleLoginSuccess}
                    onNavigateToRegister={handleNavigateToRegister}
                />
            )}

            {/* Vista de Registro */}
            {view === 'register' && (
                <Register
                    onRegisterSuccess={handleRegisterSuccess}
                    onNavigateToLogin={() => setView('login')}
                />
            )}

            {/* Vista de Escaneo */}
            {view === 'scanner' && <Scanner />}

            {/* Vista del Menú */}
            {view === 'menu' && (
                <Menu
                    onLogout={handleLogout}
                    onNavigateToAlumno={handleNavigateToAlumno}
                    onNavigateToEventos={handleNavigateToEventos}
                />
            )}

            {/* Vista de "Ingresar otro alumno" */}
            {view === 'alumno' && <Alumno onLogout={handleLogout} onNavigateToMenu={() => setView('menu')} />}

            {/* Vista de "Eventos Especiales" */}
            {view === 'eventos' && <EventosEspeciales onLogout={handleLogout} onNavigateToMenu={() => setView('menu')} />}

            
        </div>
        
    );
};

export default App;


