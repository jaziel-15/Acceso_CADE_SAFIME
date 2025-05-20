// src/components/Alumnos.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

interface Alumno {
  nombre: string;
  matricula: string;
  asociacion: string;
  programa: string;
  destino: string;
  motivo: string;
  timestamp: string;
}

const Alumnos: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      const { data, error } = await supabase
        .from('alumnos')
        .select('nombre, matricula, asociacion, programa, destino, motivo, timestamp');

      if (error) {
        console.error('Error al obtener alumnos:', error);
      } else {
        setAlumnos(data || []);
      }
    };

    fetchAlumnos();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div style={{ 
      marginTop: '40px', 
      maxWidth: '1000px', 
      marginLeft: 'auto', 
      marginRight: 'auto', 
      padding: '0 16px' 
    }}>
      <div style={{ 
        maxHeight: '400px', 
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
            <tr>
              <th colSpan={7} style={{ 
                border: '1px solid #ddd', 
                padding: '12px', 
                backgroundColor: '#3f51b5', 
                color: 'white', 
                fontSize: '1.1em', 
                textAlign: 'center' 
              }}>
                Registro de Entradas
              </th>
            </tr>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Matrícula</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Asociación</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Programa</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Destino</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Motivo</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fecha/Hora</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.slice(0, 10).map((alumno, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{alumno.nombre}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{alumno.matricula}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{alumno.asociacion}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{alumno.programa}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{alumno.destino}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{alumno.motivo}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatDate(alumno.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alumnos;
