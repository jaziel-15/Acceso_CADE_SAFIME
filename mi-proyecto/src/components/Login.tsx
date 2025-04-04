// src/components/Login.tsx
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import Header from './Header'; // Importa el header

interface LoginProps {
    onLoginSuccess: () => void; // Función para manejar inicio de sesión exitoso
    onNavigateToRegister: () => void; // Función para navegar al registro
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert('Error al iniciar sesión: ' + error.message);
        } else {
            alert('Inicio de sesión exitoso');
            onLoginSuccess(); // Cambia al menú
        }
    };

    return (
        <div>
            <Header /> {/* Header aparece en la parte superior */}
            <div className="container">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Ingresar</button>
                </form>
                {/* Botón para navegar al formulario de registro */}
                <button onClick={onNavigateToRegister} style={{ marginTop: '10px' }}>
                    Registrar
                </button>
            </div>
        </div>
    );
};

export default Login;

