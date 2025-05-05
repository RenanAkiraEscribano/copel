// src/components/FiltroTabs.js
import React, { useState } from 'react';
import './FiltroTabs.css';

const FiltroTabs = ({ onAplicar }) => {
    const tabs = ['Reforma', 'PSA', 'CaC'];
    const [activeTab, setActiveTab] = useState(2);

    const [filters, setFilters] = useState([
        {
            startDate: '',
            endDate: '',
            idOperacao: '',
            orderDirection: 'ASC',
            rowLimit: '',
            selectedFilters: [],
        },
        {
            startDate: '',
            endDate: '',
            idOperacao: '',
            orderDirection: 'ASC',
            rowLimit: '',
            selectedFilters: [],
        },
        {
            startDate: '',
            endDate: '',
            idOperacao: '',
            orderDirection: 'ASC',
            rowLimit: '',
            selectedFilters: [],
        },
    ]);

    const sensores = [
        [
            "TE001", "TE002", "TE003", "TE004", "PT001", "PT002", "PT003_TQ01", "PT004_TQ02", "PT009",
            "MIT001_HUM", "MIT001_TEMP", "AT001", "FIC001_TEMP", "FIC001_MASS",
            "FIC001_VOL", "FIC001_PRESS", "MIT002_HUM", "MIT002_TEMP", "FIT001_TEMP",
            "FIT001_MASS", "FIT001_VOL", "FIT001_PRESS",
        ],
        [
            "PT006_TQ03", "PT007_TQ04", "PT008_TQ05", "PT010", "FIT002_TEMP",
            "FIT002_MASS", "FIT002_VOL", "FIT002_PRESS", "AT002", "MIT003_HUM",
            "MIT003_TEMP", "FIC002_TEMP", "FIC002_MASS", "FIC002_VOL", "FIC002_PRESS",
        ],
        [
            "PT006_TQ03", "PT007_TQ04", "ME001",
        ],
    ];

    const handleChange = (field, value) => {
        const newFilters = [...filters];
        newFilters[activeTab][field] = value;
        setFilters(newFilters);
    };

    const handleCheckboxChange = (sensor) => {
        const newFilters = [...filters];
        const selected = newFilters[activeTab].selectedFilters;
        if (selected.includes(sensor)) {
            newFilters[activeTab].selectedFilters = selected.filter((s) => s !== sensor);
        } else {
            newFilters[activeTab].selectedFilters = [...selected, sensor];
        }
        setFilters(newFilters);
    };

    const aplicarFiltro = () => {
        const f = filters[activeTab];

        const filtroApi = {
            columns: f.selectedFilters,
            limit: f.rowLimit || 1000,
            orderBy: '',
            orderDirection: f.orderDirection || 'ASC',
            filters: {}
        };

        if (f.idOperacao && f.idOperacao !== 0) {
            filtroApi.filters.idOperacao = f.idOperacao;
        }

        if (f.startDate && f.endDate) {
            filtroApi.filters.dataInicial = f.startDate;
            filtroApi.filters.dataFinal = f.endDate;
        }

        onAplicar({
            ...filtroApi,
            aba: activeTab 
        });
    };

    return (
        <div className="filtro-tabs">
            <div className="tab-header">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={index === activeTab ? 'active-tab' : ''}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="filter-container">
                <h3 className="filter-title">{tabs[activeTab]}</h3>

                <div className="date-range">
                    <label>Data Inicial:</label>
                    <input
                        type="datetime-local"
                        value={filters[activeTab].startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                    />
                    <label>Data Final:</label>
                    <input
                        type="datetime-local"
                        value={filters[activeTab].endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                    />
                </div>

                <div className="row-limit">
                    <label>Operação:</label>
                    <input
                        type="number"
                        value={filters[activeTab].idOperacao}
                        onChange={(e) => handleChange('idOperacao', Number(e.target.value))}
                        min="1"
                    />
                </div>

                <div className="row-limit">
                    <label>Número Máximo de Linhas:</label>
                    <input
                        type="number"
                        value={filters[activeTab].rowLimit}
                        onChange={(e) => handleChange('rowLimit', Number(e.target.value))}
                        min="1"
                    />
                </div>

                <div className="filter-options">
                    {sensores[activeTab].map((sensor) => (
                        <div key={sensor} className="filter-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters[activeTab].selectedFilters.includes(sensor)}
                                    onChange={() => handleCheckboxChange(sensor)}
                                />
                                {sensor}
                            </label>
                        </div>
                    ))}
                </div>

                <button className="filter-button" onClick={aplicarFiltro}>
                    Aplicar Filtro
                </button>
            </div>
        </div>
    );
};

export default FiltroTabs;
