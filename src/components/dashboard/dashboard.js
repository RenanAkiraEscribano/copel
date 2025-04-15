import React, { useState } from 'react';
import Chart from "react-apexcharts";
import './stylesDashboard.css';
const API_DOMINIO = "http://localhost:3333/rest/";

const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [idOperacao, setIdOperacao] = useState(0);
    const [orderDirection, setOrderDirection] = useState('ASC');
    const [chartType, setChartType] = useState('line');
    const [chartTitle, setChartTitle] = useState('Gráfico de Teste');
    const [xAxisLabel, setXAxisLabel] = useState('Meses');
    const [yAxisLabel, setYAxisLabel] = useState('Valores');
    const [showGrid, setShowGrid] = useState(true);
    const [normalizeData, setNormalizeData] = useState(true);

    const options = {
        chart: {
            type: chartType,
            height: '100%',
            width: '100%',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: true
            }
        },
        series: [
            {
                name: 'Teste',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
        title: {
            text: chartTitle,
            align: 'center',
            margin: 20,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
            }
        },
        xaxis: {
            categories: [1,2,3,4,5,6,7,8,9],
            labels: {
                style: {
                    fontSize: '12px',
                    colors: ['#6c757d'],
                }
            },
            title: {
                text: xAxisLabel,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                }
            }
        },
        yaxis: {
            title: {
                text: yAxisLabel,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                }
            },
            labels: {
                style: {
                    fontSize: '12px',
                    colors: ['#6c757d'],
                }
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -10,
            labels: {
                useSeriesColors: true
            }
        },
        grid: {
            show: showGrid,
            borderColor: '#e0e0e0',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        normalization: {
            enabled: normalizeData,
            data: 'series'
        }
    };

    const aplicarFiltro = async () => {
        return;
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar de Filtros */}
            <div className="filter-container">
                <h3 className="filter-title">Filtros</h3>
                <div className="date-range">
                    <label>Data Inicial:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="row-limit">
                    <label>Código:</label>
                    <input
                        type="number"
                        value={idOperacao}
                        onChange={(e) => setIdOperacao(Number(e.target.value))}
                        min="1"
                    />
                </div>
                <div className="order-direction">
                    <label>Ordenação:</label>
                    <select
                        value={orderDirection}
                        onChange={(e) => setOrderDirection(e.target.value)}
                    >
                        <option value="ASC">Crescente</option>
                        <option value="DESC">Decrescente</option>
                    </select>
                </div>
                <button className="filter-button" onClick={aplicarFiltro}>
                    Aplicar Filtro
                </button>
            </div>

            {/* Gráfico centralizado e responsivo */}
            <div className="chart-container">
                <Chart
                    options={options}
                    series={options.series}
                    type={chartType}
                    height="100%"
                    width="1000"
                />
            </div>


                {/* Bloco de Configuração Acima do Gráfico */}
                <div className="chart-settings">
                    <div className="chart-settings-item">
                        <label>Tipo de Gráfico</label>
                        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                            <option value="line">Linha</option>
                            <option value="bar">Barras</option>
                            <option value="area">Área</option>
                        </select>
                    </div>
                    <div className="chart-settings-item">
                        <label>Título do Gráfico</label>
                        <input
                            type="text"
                            value={chartTitle}
                            onChange={(e) => setChartTitle(e.target.value)}
                        />
                    </div>
                    <div className="chart-settings-item">
                        <label>Rótulo Eixo X</label>
                        <input
                            type="text"
                            value={xAxisLabel}
                            onChange={(e) => setXAxisLabel(e.target.value)}
                        />
                    </div>
                    <div className="chart-settings-item">
                        <label>Rótulo Eixo Y</label>
                        <input
                            type="text"
                            value={yAxisLabel}
                            onChange={(e) => setYAxisLabel(e.target.value)}
                        />
                    </div>
                    <div className="chart-settings-item">
                        <label>Mostrar Grid</label>
                        <input
                            type="checkbox"
                            checked={showGrid}
                            onChange={(e) => setShowGrid(e.target.checked)}
                        />
                    </div>
                    <div className="chart-settings-item">
                        <label>Normalizar Dados</label>
                        <input
                            type="checkbox"
                            checked={normalizeData}
                            onChange={(e) => setNormalizeData(e.target.checked)}
                        />
                    </div>


            </div>
        </div>
    );
}

export default Dashboard;
