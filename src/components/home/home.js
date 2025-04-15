import React, { useState, useEffect } from 'react';
import './App.css';
import sensorPositions from './sensor_positions.json';

const Home = () => {

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/sensorData');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const newData = await response.json();
                setData(newData);
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
                        if ((data[sensorId] !== 0) && (data[sensorId] !== "close")) {
                            return (
                                <text
                                    key={sensorId}
                                    x={position.x}
                                    y={position.y}
                                    className="sensor-value"
                                >
                                    {data[sensorId]}
                                </text>
                            );
                        } else {
                            return (
                                <text
                                    key={sensorId}
                                    x={position.x}
                                    y={position.y}
                                    className="sensor-disable"
                                >
                                    {data[sensorId]}
                                </text>
                            );
                        }
                    } else {
                        console.warn(`Position not found for sensor ${sensorId}`);
                        return null;
                    }
                })}
            </svg>
        </div>
    );
}

export default Home;