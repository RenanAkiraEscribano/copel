import React, { useState } from 'react';
import './styles.css'; // Importe o arquivo CSS para estilização
import TabelaReforma from './tableReforma';
import { CSVLink } from 'react-csv';

const Reforma = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filter, setFilter] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // Data de hoje como padrão
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]); // Data de hoje como padrão
    const [rowLimit, setRowLimit] = useState(50); // Valor padrão de 50 linhas
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const [orderDirection, setOrderDirection] = useState('DESC'); // Estado para controlar a direção da ordenação
    const [idOperacao, setidOperacao] = useState(0);


    // Função para aplicar o filtro
    const aplicarFiltro = async () => {

        const filters = {};

        // Só adiciona "idOperacao" no filtro se ele não for igual a 0
        if (idOperacao !== 0) {
            filters.idOperacao = idOperacao;
        }
        // Dados que serão enviados no corpo da requisição POST

        try {
            // Fazendo a requisição POST para o servidor local
            const response = await fetch('http://localhost:3333/rest/reforma/select', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "columns": selectedFilters, // Usando selectedFilters diretamente
                    "limit": rowLimit, // Usando o valor de rowLimit
                    "orderBy": '',  // Se deseja que a query use um valor padrão, defina um valor para "orderBy"
                    "orderDirection": orderDirection, // Usando o valor de orderDirection
                    "filters": filters // Você pode adicionar os filtros aqui conforme necessário ex: "idOperacao": 2
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao aplicar filtro');
            }

            // Supondo que o servidor retorne os dados filtrados
            const dadosFiltrados = await response.json();

            console.log(dadosFiltrados);

            // Atualiza o estado com os dados filtrados recebidos do servidor
            setDadosFiltrados(dadosFiltrados);

            // Atualiza o estado de 'filter' com os filtros selecionados
            setFilter(selectedFilters);
        } catch (error) {
            console.error('Erro ao aplicar filtro:', error);
        }
    };

    return (
        <div className="tabela-container">
            {/* Filtro à esquerda */}
            <div className="filter-container">
                <h3 className="filter-title">Filtros</h3>
                <div className="date-range">
                    <label>Data Inicial:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label>Data Final:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="row-limit">
                    <label>Código:</label>
                    <input
                        type="number"
                        value={idOperacao}
                        onChange={(e) => setidOperacao(Number(e.target.value))}
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
                <div className="row-limit">
                    <label>Número Máximo de Linhas:</label>
                    <input
                        type="number"
                        value={rowLimit}
                        onChange={(e) => setRowLimit(Number(e.target.value))}
                        min="0"
                    />
                </div>
                <div className="filter-options">
                    {[
                        "TE001", "TE002", "TE003", "TE004", "PT001", "PT002", "PT003_TQ01",
                        "MIT001_HUM", "MIT001_TEMP", "AT001", "FIC001_FLOW", "FIC001_MASS",
                        "FIC001_VOL", "FIC001_PRESS", "MIT002_HUM", "MIT002_TEMP", "FIT001_FLOW",
                        "FIT001_MASS", "FIT001_VOL", "FIT001_PRESS"
                    ].map((filtro) => (
                        <div key={filtro} className="filter-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(filtro)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedFilters([...selectedFilters, filtro]);
                                        } else {
                                            setSelectedFilters(selectedFilters.filter((f) => f !== filtro));
                                        }
                                    }}
                                />
                                {filtro}
                            </label>
                        </div>
                    ))}
                </div>
                <button className="filter-button" onClick={aplicarFiltro}>Aplicar Filtro</button>
                <button className="csv-button" >
                    <CSVLink data={dadosFiltrados} filename={"dados_Tabela_Reforma.csv"}>Download CSV</CSVLink>
                </button>
            </div>

            {/* Tabela à direita */}
            <div className="tabela-dados-container">
                <TabelaReforma dadosFiltrados={dadosFiltrados} selectedFilters={filter} />
            </div>
        </div>
    );
};

export default Reforma;