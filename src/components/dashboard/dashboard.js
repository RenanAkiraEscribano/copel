import React, { useState } from 'react';
import Chart from "react-apexcharts";
import FiltroTabs from './FiltroTabs'; // Ajuste o caminho conforme sua estrutura
import './stylesDashboard.css';

const API_DOMINIO = process.env.REACT_APP_API_DOMINIO;

const Dashboard = () => {
    const [chartType, setChartType] = useState('line');
    const [chartTitle, setChartTitle] = useState('Gráfico Template');
    const [xAxisLabel, setXAxisLabel] = useState('Data');
    const [yAxisLabel, setYAxisLabel] = useState('Valores');
    const [showGrid, setShowGrid] = useState(true);
    const [normalizeData, setNormalizeData] = useState(true);
    const [chartOptions, setChartOptions] = useState({});
    const [chartSeries, setChartSeries] = useState([]);


    const [filtrosAtuais, setFiltrosAtuais] = useState(null);

    const handleAplicarFiltro = async (filtros) => {
        setFiltrosAtuais(filtros);

        const dominios = [
            'rest/reforma/select',
            'rest/armazenamento02/select',
            'rest/cac/select'
        ];

        const url = dominios[filtros.aba] || ''; // rota fallback

        try {
            const response = await fetch(API_DOMINIO + url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filtros)
            });
            const data = await response.json();

            if (!Array.isArray(data) || data.length === 0) return;

            const campos = filtros.columns; // adaptado para novo formato
            const xField = Object.keys(data[0]).find(key => key.startsWith("DATA_")) || "DATA";

            const valoresPorCampo = campos.map((campo) => {
                const valores = data.map((item) => item[campo] ?? null);
                const max = Math.max(...valores.filter(v => v != null));
                const min = Math.min(...valores.filter(v => v != null));
                return {
                    name: campo,
                    data: valores.map((v) => {
                        if (v == null) return null;
                        const valor = normalizeData ? (v - min) / (max - min) : v;
                        return Number(valor.toFixed(2));
                    })
                };
            });

            setChartSeries(valoresPorCampo);
            setChartOptions({
                chart: { type: chartType, height: '100%' },
                title: { text: chartTitle, align: 'center' },
                xaxis: {
                    categories: data.map(item => new Date(item[xField]).toLocaleString()),
                    title: { text: xAxisLabel }
                },
                yaxis: {
                    title: { text: yAxisLabel }
                },
                grid: { show: showGrid },
                dataLabels: { enabled: false }
            });

        } catch (err) {
            console.error('Erro ao buscar dados da API:', err);
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
                    options={chartOptions}
                    series={chartSeries}
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
