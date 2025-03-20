import React, { useState, useEffect } from "react";
import WidgetInfo from "./widget"; // Importe o WidgetInfo
import Modal from "./modal"; // Importe o Modal
import "./stylesHome.css";

const Home = () => {

    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // Data de hoje como padrão
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]); // Data de hoje como padrão
    const [operacaoId, setOperacaoId] = useState(0);
    const [selectedOperator, setSelectedOperator] = useState("");
    const [options, setOptions] = useState([]);
    const [orderDirection, setOrderDirection] = useState('DESC');

    useEffect(() => {
        // Função para buscar os operadores da API
        const fetchOperators = async () => {
            try {
                const response = await fetch('http://localhost:3333/rest/operador/select');
                const data = await response.json();
                
                // Preenchendo a variável 'operators' com os dados da resposta
                setOptions(data.operators);
            } catch (error) {
                console.log('Erro ao carregar os operadores');
            }
        };

        // Chamando a função para fazer a requisição
        fetchOperators();
    }, []);

    const dados = [
        {
            codigo: "123",
            operador: "João Silva",
            dataInicio: "2024-03-16T10:30:00",
            observacoes: [{ data: "2025-03-20", texto: "Exemplo de observação" }, { data: "2025-03-20", texto: "Exemplo de observação" }, { data: "2025-03-20", texto: "Exemplo de observação" }]
        },
        {
            codigo: "456",
            operador: "Maria Souza",
            dataInicio: "2024-03-15T08:15:00",
            observacoes: []
        },
        {
            codigo: "789",
            operador: "Carlos Lima",
            dataInicio: "2024-03-14T14:45:00",
            observacoes: ["Observação X", "Observação Y", "Observação Z"]
        },
        {
            codigo: "789",
            operador: "Carlos Lima",
            dataInicio: "2024-03-14T14:45:00",
            observacoes: ["Observação X", "Observação Y", "Observação Z"]
        },
        {
            codigo: "789",
            operador: "Carlos Lima",
            dataInicio: "2024-03-14T14:45:00",
            observacoes: ["Observação X", "Observação Y", "Observação Z"]
        },
        {
            codigo: "789",
            operador: "Carlos Lima",
            dataInicio: "2024-03-14 14:45:00",
            observacoes: ["Observação X", "Observação Y", "Observação Z"]
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [observacoes, setObservacoes] = useState([]);

    const openModal = (observacoes) => {
        setObservacoes(observacoes);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                        value={operacaoId}
                        onChange={(e) => setOperacaoId(Number(e.target.value))}
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
                <div className="order-direction">
                    <label>Operador:</label>
                    <select
                        value={selectedOperator}
                        onChange={(e) => setSelectedOperator(e.target.value)}
                    >
                        <option value="">Selecione uma opção</option>
                        {options.map((option, index) => (
                            <option key={option.idOperador} value={option.idOperador}>
                                {option.NOME}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="filter-button" onClick={() => console.log("Filtrar")}>
                    Aplicar Filtro
                </button>
            </div>

            <div className="home-container">
                <div className="widget-container">
                    {dados.map((item) => (
                        <WidgetInfo key={item.codigo} item={item} openModal={openModal} />
                    ))}
                </div>

                {/* Modal */}
                <Modal isOpen={isModalOpen} onClose={closeModal} observacoes={observacoes} />
            </div>
        </div>
    );
};

export default Home;
