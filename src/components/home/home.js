import React, { useState, useEffect } from 'react';
import './App.css';
import sensorPositions from './sensor_positions.json';

const API_DOMINIO = process.env.REACT_APP_API_DOMINIO;
//att
const Home = () => {
    const [data, setData] = useState({});
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_DOMINIO + 'rest/viewOperacao');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const newData = await response.json();
                setData(newData[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App">
            <svg
                className="diagram"
                viewBox="0 0 1000 700"
                width="1000px"
                height="700px"
                preserveAspectRatio="xMidYMid slice"
            >
                <image href="diagrama.svg" width="100%" height="100%" />
                {Object.keys(data).map((sensorId) => {
                    const position = sensorPositions[sensorId];

                    // Só renderizar PRESS de FIC/FIT, mas manter os outros tipos pro tooltip
                    const isFIC_FIT = sensorId.startsWith('FIC') || sensorId.startsWith('FIT');
                    const isPRESS = sensorId.endsWith('PRESS');
                    const shouldRender = !isFIC_FIT || (isFIC_FIT && isPRESS);

                    if (position && shouldRender) {
                        const valor = data[sensorId];
                        const prefixo = sensorId.split('_')[0]; // ex: "FIC001"
                        let exibicao;

                        if (sensorId.startsWith("DO")) {
                            exibicao = (valor === 0) ? "Fechado" : "Aberto";
                        } else if (sensorId.startsWith('TE')) {
                            exibicao = valor.toFixed(0) + "º C";
                        } else if (sensorId.startsWith('PT')) {
                            exibicao = valor.toFixed(2) + " bar";
                        } else if (sensorId.endsWith("TEMP")) {
                            exibicao = valor.toFixed(2) + "º C";
                        } else if (sensorId.endsWith("MASS")) {
                            exibicao = valor.toFixed(2) + " Nm³/s";
                        } else if (sensorId.endsWith("VOL")) {
                            exibicao = valor.toFixed(2) + " Nm³/s";
                        } else if (sensorId.endsWith("PRESS")) {
                            exibicao = valor.toFixed(2) + " bar";
                        } else if (sensorId.startsWith('MIT')) {
                            if (sensorId.endsWith("HUM")) {
                                exibicao = valor.toFixed(2) + "% UR";
                            } else if (sensorId.endsWith("TEMP")) {
                                exibicao = valor.toFixed(2) + "º C";
                            }
                        }

                        const isAtivo = (valor !== null && valor !== "close");

                        // Montar conteúdo do tooltip se for FIC/FIT
                        let tooltipText = `${sensorId}: ${exibicao}`;
                        if (isFIC_FIT) {
                            const relacionados = ['TEMP', 'MASS', 'VOL', 'PRESS','HUM'];
                            tooltipText = relacionados
                                .map(tipo => {
                                    const idCompleto = `${prefixo}_${tipo}`;
                                    const val = data[idCompleto];
                                    if (val !== undefined && val !== null) {
                                        if (tipo === 'TEMP') return `${idCompleto}: ${val.toFixed(2)}º C`;
                                        if (tipo === 'MASS') return `${idCompleto}: ${val.toFixed(2)} Nm³/s`;
                                        if (tipo === 'VOL') return `${idCompleto}: ${val.toFixed(2)} Nm³/s`;
                                        if (tipo === 'PRESS') return `${idCompleto}: ${val.toFixed(2)} bar`;
                                    }
                                    return null;
                                })
                                .filter(Boolean)
                                .join('\n');
                        }

                        return (
                            <g
                                key={sensorId}
                                onMouseEnter={(e) => {
                                    setTooltip({
                                        visible: true,
                                        x: e.clientX,
                                        y: e.clientY,
                                        text: tooltipText
                                    });
                                }}
                                onMouseMove={(e) => {
                                    setTooltip(prev => ({
                                        ...prev,
                                        x: e.clientX,
                                        y: e.clientY
                                    }));
                                }}
                                onMouseLeave={() => {
                                    setTooltip({ visible: false, x: 0, y: 0, text: '' });
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <rect
                                    x={parseFloat(position.x) - 20}
                                    y={parseFloat(position.y) - 12}
                                    width="80"
                                    height="20"
                                    fill="transparent"
                                />
                                <text
                                    x={position.x}
                                    y={position.y}
                                    className={isAtivo ? "sensor-value" : "sensor-disable"}
                                    style={{ pointerEvents: 'all' }}
                                >
                                    {exibicao}
                                </text>
                            </g>
                        );
                    } else {
                        return null;
                    }
                })}
            </svg>

            {tooltip.visible && (
                <div
                    className="tooltip"
                    style={{
                        position: 'fixed',
                        top: tooltip.y + 10,
                        left: tooltip.x + 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        color: '#fff',
                        padding: '6px 10px',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        pointerEvents: 'none',
                        zIndex: 1000,
                        whiteSpace: 'pre'
                    }}
                >
                    {tooltip.text}
                </div>
            )}
        </div>
    );
};

export default Home;
