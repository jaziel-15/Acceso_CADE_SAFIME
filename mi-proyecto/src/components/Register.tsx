// Register.tsx
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import Header from './Header'; // Importa el header

interface RegisterProps {
    onRegisterSuccess: () => void; // Prop para manejar el cambio de vista después del registro
    onNavigateToLogin: () => void; // Prop para manejar la navegación a la vista de login
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert('Error al registrar: ' + error.message);
        } else {
            alert('Registro exitoso, ahora puedes iniciar sesión.');
            onRegisterSuccess(); // Llama a la función para cambiar la vista
        }
    };

    return (
        <div>
            <Header /> {/* Header aparece en la parte superior */}
            <div className="container">
                <h2>Registro de Usuario</h2>
                <form onSubmit={handleRegister}>
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
                    <button type="submit">Registrarse</button>
                </form>
                {/* Botón para regresar a la vista de login */}
                <button onClick={onNavigateToLogin} style={{ marginTop: '10px' }}>
                    Volver al inicio de sesión
                </button>
            </div>
        </div>
    );
};

export default Register;


