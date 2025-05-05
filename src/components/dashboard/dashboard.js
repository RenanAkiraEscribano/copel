import React, { useState } from 'react';
import Chart from "react-apexcharts";
import FiltroTabs from './FiltroTabs'; // Ajuste o caminho conforme sua estrutura
import './stylesDashboard.css';

const Dashboard = () => {
    const [chartType, setChartType] = useState('line');
    const [chartTitle, setChartTitle] = useState('Gráfico Template');
    const [xAxisLabel, setXAxisLabel] = useState('Horas');
    const [yAxisLabel, setYAxisLabel] = useState('Valores');
    const [showGrid, setShowGrid] = useState(true);
    const [normalizeData, setNormalizeData] = useState(true);

    const [filtrosAtuais, setFiltrosAtuais] = useState(null);

    const handleAplicarFiltro = (dados) => {
        console.log("Filtro aplicado:", dados);
        setFiltrosAtuais(dados);
        console.log("Filtros atuais:", filtrosAtuais);
        // Aqui você pode fazer fetch de dados com os filtros
    };

    const options = {
        chart: {
            type: chartType,
            height: '100%',
        },
        series: [
            {
                name: 'Teste',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
            },
        ],
        title: {
            text: chartTitle,
            align: 'center'
        },
        xaxis: {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            title: { text: xAxisLabel }
        },
        yaxis: {
            title: { text: yAxisLabel }
        },
        grid: {
            show: showGrid
        },
        dataLabels: {
            enabled: false
        }
    };

    function settingsChart() {
        return (<div className="chart-settings">
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
        </div>)
    }

    return (
        <div className="dashboard-container">
            <FiltroTabs onAplicar={handleAplicarFiltro} />

            <div className="chart-container">
                <Chart
                    options={options}
                    series={options.series}
                    type={chartType}
                    height="100%"
                    width="1000"
                />
            </div>

            {settingsChart()}
        </div>
    );
};

export default Dashboard;
