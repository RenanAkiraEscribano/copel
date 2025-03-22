import React from 'react';
import Chart from "react-apexcharts";

const Dashboard = () => {

    const options = {
        chart: {
            type: 'line',
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
                name: 'Teste', // Nome da série
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125], // Dados da série
            },
        ],
        xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'], // Categorias do eixo X
        },
        stroke: {
            curve: 'smooth', // Curva suave
        },
        title: {
            text: 'Teste', // Título do gráfico
            align: 'left', // Alinhamento do título
        },
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <Chart
                options={options} // Opções do gráfico
                series={options.series} // Dados do gráfico
                type="line" // Tipo de gráfico
                height={350} // Altura do gráfico
                width={600} // Largura do gráfico
            />
        </div>
    );
}

export default Dashboard;