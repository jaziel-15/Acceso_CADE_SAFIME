// src/components/Login.tsx
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import Header from './Header'; // Importa el header

interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert('Error al iniciar sesión: ' + error.message);
        } else {
            alert('Inicio de sesión exitoso');
            onLoginSuccess();
        }
    };

    return (
        <div>
            <Header /> {/* Header aparece en la parte superior */}
            <div id="login-container">
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
            </div>
            
        </div>
    );
};

export default Login;
