import React, { useState } from 'react';
import './styles.css'; // Importe o arquivo CSS para estilização
import TabelaReforma from './tableReforma';
import { CSVLink } from 'react-csv';

const API_DOMINIO = process.env.REACT_APP_API_DOMINIO;

const Reforma = () => {
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
        // Dados que serão enviados no corpo da requisição POST
        if (startDate && endDate) {
            filters.dataInicial = startDate;
            filters.dataFinal = endDate;
        }

        console.log({
            "columns": selectedFilters, // Usando selectedFilters diretamente
            "limit": rowLimit, // Usando o valor de rowLimit
            "orderBy": '',  // Se deseja que a query use um valor padrão, defina um valor para "orderBy"
            "orderDirection": orderDirection, // Usando o valor de orderDirection
            "filters": filters // Você pode adicionar os filtros aqui conforme necessário ex: "idOperacao": 2
        })

        try {
            // Fazendo a requisição POST para o servidor local
            const response = await fetch(API_DOMINIO + 'rest/reforma/select', {
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

            // Atualiza o estado com os dados filtrados recebidos do servidor
            setDadosFiltrados(dadosFiltrados);

            // Atualiza o estado de 'filter' com os filtros selecionados
            setFilter(selectedFilters);
        } catch (error) {
            console.error('Erro ao aplicar filtro:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            aplicarFiltro();
        }
    };

    function filtrosReforma() {
        return (
            <div className="filter-container">
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
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="row-limit">
                    <label>Operação:</label>
                    <input
                        type="number"
                        value={idOperacao}
                        onChange={(e) => setidOperacao(Number(e.target.value))}
                        onKeyDown={handleKeyDown}
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
                        onKeyDown={handleKeyDown}
                        min="0"
                    />
                </div>
                <div className="filter-options">
                    {[
                        "TE001", "TE002", "TE003", "TE004", "PT001", "PT002", "PT003_TQ01", "PT004_TQ02", "PT009",
                        "MIT001_HUM", "MIT001_TEMP", "AT001", "FIC001_TEMP", "FIC001_MASS",
                        "FIC001_VOL", "FIC001_PRESS", "MIT002_HUM", "MIT002_TEMP", "FIT001_TEMP",
                        "FIT001_MASS", "FIT001_VOL", "FIT001_PRESS", "DO001", "DO002", "DO003", "DO004", "DO027",
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
        )
    }


    return (
        <div className="tabela-container">
            
            {filtrosReforma()}

            <div className="tabela-dados-container">
                <TabelaReforma dadosFiltrados={dadosFiltrados} selectedFilters={filter} />
            </div>
        </div>
    );
};

export default Reforma;