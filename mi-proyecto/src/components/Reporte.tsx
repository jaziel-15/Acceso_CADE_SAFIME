//Reporte.TSX

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reporte: React.FC<{ onLogout: () => void; onNavigateToMenu: () => void }> = ({ onLogout, onNavigateToMenu }) => {
    const [asociacionData, setAsociacionData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
    const [destinoData, setDestinoData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });
    const [asociacionMesData, setAsociacionMesData] = useState<{ labels: string[]; data: number[][]; asociaciones: string[] }>({ labels: [], data: [], asociaciones: [] });
    const [destinoMesData, setDestinoMesData] = useState<{ labels: string[]; data: number[][]; destinos: string[] }>({ labels: [], data: [], destinos: [] });
    const [asociacionDiaData, setAsociacionDiaData] = useState<{ labels: string[]; data: number[][]; asociaciones: string[] }>({ labels: [], data: [], asociaciones: [] });
    const [selectedReport, setSelectedReport] = useState<string>('asociacion');

    const countBy = (arr: any[], key: string): Record<string, number> => {
        return arr.reduce((acc: Record<string, number>, item) => {
            const valor = item[key] || 'Desconocido';
            acc[valor] = (acc[valor] || 0) + 1;
            return acc;
        }, {});
    };

    const colores = [
        'rgba(24, 74, 14, 0.8)',
        'rgba(22, 101, 52, 0.8)' ,
        'rgba(13, 110, 253, 0.8)', 
        'rgba(32, 201, 151, 0.8)' ,
        'rgba(34, 139, 34, 0.8)',
       'rgba(25, 135, 84, 0.8)'
    ];

    const exportarExcelPorGrafico = () => {
        let datosExcel: any[] = [];

        switch (selectedReport) {
            case 'asociacion':
                datosExcel = asociacionData.labels.map((label, i) => ({
                    Asociacion: label,
                    Cantidad: asociacionData.data[i]
                }));
                break;

            case 'destino':
                datosExcel = destinoData.labels.map((label, i) => ({
                    'Área de destino': label,
                    Cantidad: destinoData.data[i]
                }));
                break;

            case 'mes-asociacion':
                datosExcel = asociacionMesData.labels.map((mes, i) => {
                    const fila: any = { Mes: mes };
                    asociacionMesData.asociaciones.forEach((nombreAsociacion, j) => {
                        fila[nombreAsociacion] = asociacionMesData.data[i]?.[j] || 0;
                    });
                    return fila;
                });
                break;

            case 'mes-destino':
                datosExcel = destinoMesData.labels.map((mes, i) => {
                    const fila: any = { Mes: mes };
                    destinoMesData.destinos.forEach((nombreDestino, j) => {
                        fila[nombreDestino] = destinoMesData.data[i]?.[j] || 0;
                    });
                    return fila;
                });
                break;

            case 'asociacion-dia':
                datosExcel = asociacionDiaData.labels.map((dia, i) => {
                    const fila: any = { Día: dia };
                    asociacionDiaData.asociaciones.forEach((nombreAsociacion, j) => {
                        fila[nombreAsociacion] = asociacionDiaData.data[i]?.[j] || 0;
                    });
                    return fila;
                });
                break;

            default:
                return;
        }

        const worksheet = XLSX.utils.json_to_sheet(datosExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, `reporte-${selectedReport}-${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const countByMonthAndKey = (arr: any[], key: string): Record<string, Record<string, number>> => {
        return arr.reduce((acc: Record<string, Record<string, number>>, item) => {
            const fecha = item.timestamp ? new Date(item.timestamp) : null;
            if (!fecha) return acc;

            const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
            const valor = item[key] || 'Desconocido';

            if (!acc[mes]) acc[mes] = {};
            acc[mes][valor] = (acc[mes][valor] || 0) + 1;

            return acc;
        }, {});
    };

    const countByDayAndKey = (arr: any[], key: string): Record<string, Record<string, number>> => {
        return arr.reduce((acc: Record<string, Record<string, number>>, item) => {
            const fecha = item.timestamp ? new Date(item.timestamp) : null;
            if (!fecha) return acc;

            const dia = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
            const valor = item[key] || 'Desconocido';

            if (!acc[dia]) acc[dia] = {};
            acc[dia][valor] = (acc[dia][valor] || 0) + 1;

            return acc;
        }, {});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: alumnos, error } = await supabase
                    .from('alumnos')
                    .select('timestamp, asociacion, destino');

                if (error) {
                    console.error('Error al cargar datos:', error);
                    return;
                }

                // Agrupar por asociación
                const asociacionGroup = countBy(alumnos, 'asociacion');
                setAsociacionData({ labels: Object.keys(asociacionGroup), data: Object.values(asociacionGroup) });

                // Agrupar por destino
                const destinoGroup = countBy(alumnos, 'destino');
                setDestinoData({ labels: Object.keys(destinoGroup), data: Object.values(destinoGroup) });

                // Obtener todas las asociaciones y destinos únicos
                const todasAsociaciones = [...new Set(alumnos.map(v => v.asociacion).filter(Boolean))];
                const todosDestinos = [...new Set(alumnos.map(v => v.destino).filter(Boolean))];

                // Agrupar por mes y asociación
                const asociacionPorMes = countByMonthAndKey(alumnos, 'asociacion');
                const mesesAsociacion = Object.keys(asociacionPorMes).sort();
                const datosAsociacionPorMes = mesesAsociacion.map(mes => 
                    todasAsociaciones.map(asociacion => asociacionPorMes[mes]?.[asociacion] || 0)
                );
                setAsociacionMesData({ labels: mesesAsociacion, data: datosAsociacionPorMes, asociaciones: todasAsociaciones });

                // Agrupar por mes y destino
                const destinoPorMes = countByMonthAndKey(alumnos, 'destino');
                const mesesDestino = Object.keys(destinoPorMes).sort();
                const datosDestinoPorMes = mesesDestino.map(mes => 
                    todosDestinos.map(destino => destinoPorMes[mes]?.[destino] || 0)
                );
                setDestinoMesData({ labels: mesesDestino, data: datosDestinoPorMes, destinos: todosDestinos });

                // Agrupar por día y asociación
                const asociacionPorDia = countByDayAndKey(alumnos, 'asociacion');
                const diasAsociacion = Object.keys(asociacionPorDia).sort();
                const datosAsociacionPorDia = diasAsociacion.map(dia => 
                    todasAsociaciones.map(asociacion => asociacionPorDia[dia]?.[asociacion] || 0)
                );
                setAsociacionDiaData({ labels: diasAsociacion, data: datosAsociacionPorDia, asociaciones: todasAsociaciones });

            } catch (err) {
                console.error('Error al procesar datos:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <button onClick={onNavigateToMenu}>Volver al Menú</button>
            <button onClick={onLogout}>Cerrar Sesión</button>
            <button onClick={exportarExcelPorGrafico}>Exportar gráfico a Excel</button>

            <h2>Reporte de Datos de Alumnos</h2>

            <select id="reporte-select" value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)}>
                <option value="asociacion">Asociación x Cantidad</option>
                <option value="destino">Destino x Cantidad</option>
                <option value="mes-asociacion">Meses x Asociación</option>
                <option value="mes-destino">Meses x Destino</option>
                <option value="asociacion-dia">Asociación x Día</option>
            </select>

            {selectedReport === 'asociacion' && (
                <Bar
                    data={{
                        labels: asociacionData.labels,
                        datasets: [{
                            label: 'Cantidad',
                            data: asociacionData.data,
                            backgroundColor: colores.slice(0, asociacionData.data.length),
                            borderColor: colores.slice(0, asociacionData.data.length).map(color => color.replace('0.8', '1')),
                            borderWidth: 1
                        }]
                    }}
                />
            )}

            {selectedReport === 'destino' && (
                <Bar
                    data={{
                        labels: destinoData.labels,
                        datasets: [{
                            label: 'Cantidad',
                            data: destinoData.data,
                            backgroundColor: colores.slice(0, destinoData.data.length),
                            borderColor: colores.slice(0, destinoData.data.length).map(color => color.replace('0.8', '1')),
                            borderWidth: 1
                        }]
                    }}
                />
            )}

            {selectedReport === 'mes-asociacion' && (
                <Bar
                    data={{
                        labels: asociacionMesData.labels,
                        datasets: asociacionMesData.asociaciones.map((asociacion, index) => ({
                            label: asociacion,
                            data: asociacionMesData.data.map(mesData => mesData[index] || 0),
                            backgroundColor: colores[index % colores.length],
                            borderColor: colores[index % colores.length].replace('0.8', '1'),
                            borderWidth: 1
                        }))
                    }}
                />
            )}

            {selectedReport === 'mes-destino' && (
                <Bar
                    data={{
                        labels: destinoMesData.labels,
                        datasets: destinoMesData.destinos.map((destino, index) => ({
                            label: destino,
                            data: destinoMesData.data.map(mesData => mesData[index] || 0),
                            backgroundColor: colores[index % colores.length],
                            borderColor: colores[index % colores.length].replace('0.8', '1'),
                            borderWidth: 1
                        }))
                    }}
                />
            )}

            {selectedReport === 'asociacion-dia' && (
                <Bar
                    data={{
                        labels: asociacionDiaData.labels,
                        datasets: asociacionDiaData.asociaciones.map((asociacion, index) => ({
                            label: asociacion,
                            data: asociacionDiaData.data.map(diaData => diaData[index] || 0),
                            backgroundColor: colores[index % colores.length],
                            borderColor: colores[index % colores.length].replace('0.8', '1'),
                            borderWidth: 1
                        }))
                    }}
                />
            )}

        </div>
    );
};

export default Reporte;