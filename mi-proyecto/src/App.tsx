// src/App.tsx
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Scanner from './components/Scanner';
import Menu from './components/Menu';
import Alumno from './components/Alumno';
const App: React.FC = () => {
    const [view, setView] = useState('login'); // Controla la vista actual

    // Función para manejar el inicio de sesión exitoso
    const handleLoginSuccess = () => {
        setView('menu'); // Cambiar a la vista del menú después del inicio de sesión
    };

    // Función para manejar el registro exitoso
    const handleRegisterSuccess = () => {
        alert('Registro exitoso, ahora puedes iniciar sesión.');
        setView('login'); // Cambiar a la vista de inicio de sesión después del registro
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        setView('login'); // Volver a la vista de inicio de sesión
    };
    const handleNavigateToAlumno = () => {
      setView('alumno'); // Cambiar a la vista del componente "Alumno"
  };

    return (
        <div>
            {/* Renderiza las vistas basadas en el estado */}
            {view === 'login' && (
                <>
                    <Login onLoginSuccess={handleLoginSuccess} />
                    <div>
                        <button onClick={() => setView('register')}>Ir a Registro</button>
                    </div>
                </>
            )}
            {view === 'register' && 
            (<Register 
            onRegisterSuccess={handleRegisterSuccess} 
            onNavigateToLogin={() => setView('login')}
            /> 
            )}
            {view === 'scanner' && <Scanner />}
            {view === 'menu' && <Menu onLogout={handleLogout} onNavigateToAlumno={handleNavigateToAlumno} />}
            {view === 'alumno' && <Alumno onLogout={handleLogout} />}
        </div>
    );
};

export default App;
