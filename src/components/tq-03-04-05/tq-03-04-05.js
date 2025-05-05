import React, { useState } from 'react';
import './styles.css'; // Importe o arquivo CSS para estilização
import TabelaTQ030405 from './tableTq-03-04-05';
import { CSVLink } from 'react-csv';

const API_DOMINIO = process.env.REACT_APP_API_DOMINIO;

const TQ030405 = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filter, setFilter] = useState([]);
    const [startDate, setStartDate] = useState(); // Data de hoje como padrão
    const [endDate, setEndDate] = useState(); // Data de hoje como padrão
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

        if (startDate && endDate) {
            filters.dataInicial = startDate;
            filters.dataFinal = endDate;
        }
        // Dados que serão enviados no corpo da requisição POST
        try {
            // Fazendo a requisição POST para o servidor local
            const response = await fetch(API_DOMINIO + 'rest/armazenamento02/select', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "columns": selectedFilters, // Usando selectedFilters diretamente
                    "limit": rowLimit, // Usando o valor de rowLimit
                    "orderBy": '',  // Se deseja que a query use um valor padrão, defina um valor para "orderBy"
                    "orderDirection": orderDirection, // Usando o valor de orderDirection
                    "filters": filters // Você pode adicionar os filtros aqui conforme necessário
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao aplicar filtro');
            }

            // Supondo que o servidor retorne os dados filtrados
            const dadosFiltrados = await response.json();



            // Atualiza o estado com os dados filtrados recebidos do servidor
            setDadosFiltrados(dadosFiltrados);

            // Atualiza o estado de 'filter' com os filtros selecionados
            setFilter(selectedFilters);
        } catch (error) {
            console.error('Erro ao aplicar filtro:', error);
        }
    };

    function filtroPSA() {
        return (<div className="filter-container">
            <h3 className="filter-title">Filtros</h3>
            <div className="date-range">
                <label>Data Inicial:</label>
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value ? e.target.value.replace('T', ' ') + ':00' : '')}
                />
                <label>Data Final:</label>
                <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value ? e.target.value.replace('T', ' ') + ':00' : '')}
                />
            </div>
            <div className="row-limit">
                <label>Operação:</label>
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
                    min="1"
                />
            </div>
            <div className="filter-options">
                {[
                    "PT006_TQ03", "PT007_TQ04", "PT008_TQ05", "PT010", "FIT002_TEMP",
                    "FIT002_MASS", "FIT002_VOL", "FIT002_PRESS", "AT002", "MIT003_HUM",
                    "MIT003_TEMP", "FIC002_TEMP", "FIC002_MASS", "FIC002_VOL", "FIC002_PRESS",
                    "DO018", "DO021", "DO022", "DO023", "DO025"
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
                <CSVLink data={dadosFiltrados} filename={"dados_Tabela_tq3_tq4_tq5t.csv"}>Download CSV</CSVLink>
            </button>
        </div>)
    }

    return (
        <div className="tabela-container">

            {filtroPSA()}

            <div className="tabela-dados-container">
                <TabelaTQ030405 dadosFiltrados={dadosFiltrados} selectedFilters={filter} />
            </div>
        </div>
    );
};

export default TQ030405;