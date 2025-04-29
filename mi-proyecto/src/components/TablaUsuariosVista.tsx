// src/components/Visitas.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

interface Visita {
    nombre: string;
    matricula: string;
    asociacion: string;
    area_destino: string;
    hora_llegada: string;
}

const Visitas: React.FC = () => {
    const [visitas, setVisitas] = useState<Visita[]>([]);

    useEffect(() => {
        const fetchVisitas = async () => {
            const { data, error } = await supabase
                .from('visitas')
                .select('nombre, matricula, asociacion, area_destino, hora_llegada');

            if (error) {
                console.error('Error al obtener visitas:', error);
            } else {
                setVisitas(data || []);
            }
        };

        fetchVisitas();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div style={{ 
            marginTop: '40px',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 16px'
        }}>
            <div style={{ 
                maxHeight: '300px', 
                overflowY: 'auto', 
                border: '1px solid #ccc', 
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    tableLayout: 'fixed'
                }}>
                    <thead style={{ 
                        position: 'sticky', 
                        top: 0, 
                        backgroundColor: '#f9f9f9'
                    }}>
                        {}
                        <tr>
                            <th 
                                colSpan={5} 
                                style={{ 
                                    border: '1px solid #ddd', 
                                    padding: '12px', 
                                    backgroundColor: '#4CAF50', 
                                    color: 'white',
                                    fontSize: '1.1em',
                                    textAlign: 'center'
                                }}
                            >
                                Historial de Visitas
                            </th>
                        </tr>
                        {}
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', width: '20%' }}>Nombre</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', width: '15%' }}>Matrícula</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', width: '20%' }}>Asociación</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', width: '20%' }}>Área Destino</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', width: '25%' }}>Hora de Llegada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitas.slice(0, 10).map((visita, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{visita.nombre}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{visita.matricula}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{visita.asociacion}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{visita.area_destino}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatDate(visita.hora_llegada)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Visitas;