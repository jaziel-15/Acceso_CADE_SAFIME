import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { supabase } from '../services/supabase';

// Registro de módulos necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reporte: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [asociacionData, setAsociacionData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
    const [areaData, setAreaData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });

    // Función para agrupar datos manualmente
    const countBy = (arr: any[], key: string): Record<string, number> => {
        return arr.reduce((acc: Record<string, number>, item) => {
            const valor = item[key] || 'Desconocido'; // evitar claves undefined
            acc[valor] = (acc[valor] || 0) + 1;
            return acc;
        }, {});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: visitas, error } = await supabase
                    .from('visitas')
                    .select('asociacion, area_destino');

                if (error) {
                    console.error('Error al cargar datos:', error);
                    return;
                }

                // Agrupar por asociación
                const asociacionGroup = countBy(visitas, 'asociacion');
                const asociacionLabels = Object.keys(asociacionGroup);
                const asociacionCounts = Object.values(asociacionGroup);

                setAsociacionData({ labels: asociacionLabels, data: asociacionCounts });

                // Agrupar por área de destino
                const areaGroup = countBy(visitas, 'area_destino');
                const areaLabels = Object.keys(areaGroup);
                const areaCounts = Object.values(areaGroup);

                setAreaData({ labels: areaLabels, data: areaCounts });

            } catch (err) {
                console.error('Error al procesar datos:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <button onClick={onLogout}>Cerrar Sesión</button>
            <h2>Reporte de Datos</h2>

            {/* Gráfica: Personas por Asociación */}
            <div>
                <h3>Personas por Asociación</h3>
                <Bar
                    data={{
                        labels: asociacionData.labels,
                        datasets: [
                            {
                                label: 'Cantidad de personas',
                                data: asociacionData.data,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
                />
            </div>

            {/* Gráfica: Personas por Área de Destino */}
            <div>
                <h3>Personas por Área de Destino</h3>
                <Bar
                    data={{
                        labels: areaData.labels,
                        datasets: [
                            {
                                label: 'Cantidad de personas',
                                data: areaData.data,
                                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                                borderColor: 'rgba(153, 102, 255, 1)',
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
                />
            </div>
        </div>
    );
};

export default Reporte;
