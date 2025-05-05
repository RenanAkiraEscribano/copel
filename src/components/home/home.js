import React, { useState, useEffect } from 'react';
import './App.css';
import sensorPositions from './sensor_positions.json';


const API_DOMINIO = process.env.REACT_APP_API_DOMINIO;

const Home = () => {

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_DOMINIO+'rest/viewOperacao');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const newData = await response.json();
                setData(newData[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        //fetchData();

        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="App">
            <svg className="diagram" >
                <image href="diagrama.svg" width="100%" height="100%" />
                {Object.keys(data).map((sensorId) => {
                    const position = sensorPositions[sensorId];
                    if (position) {
                        const valor = data[sensorId];
                        let exibicao;

                        if (sensorId.startsWith("DO")) {
                            exibicao = (valor === 0) ? "Fechada" : "Aberto";
                        } else {
                            exibicao = valor;
                        }

                        const isAtivo = (valor !== null && valor !== "close");

                        return (
                            <text
                                key={sensorId}
                                x={position.x}
                                y={position.y}
                                className={isAtivo ? "sensor-value" : "sensor-disable"}
                            >
                                {exibicao}
                            </text>
                        );
                    } else {
                        return null;
                    }
                })}
            </svg>
        </div>
    );
}

export default Home;