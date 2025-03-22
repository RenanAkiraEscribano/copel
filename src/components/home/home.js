import React, { useState, useEffect, useCallback } from "react";
import WidgetInfo from "./widget";
import Modal from "./modal";
import "./stylesHome.css";

const Home = () => {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [idOperacao, setIdOperacao] = useState(0);
    const [selectedOperator, setSelectedOperator] = useState("");
    const [options, setOptions] = useState([]);
    const [orderDirection, setOrderDirection] = useState('DESC');
    const [dados, setDados] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [observacoes, setObservacoes] = useState([]);
    const [idOperacaoObs, setIdOperacaoObs] = useState(0);

    const openModal = (idOperacao, observacoes) => {
        setIdOperacaoObs(idOperacao);
        setObservacoes(observacoes);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Memoize aplicarFiltro
    const aplicarFiltro = useCallback(async () => {
        const filters = {};
        console.log("teste")
        if (idOperacao !== 0) {
            filters.idOperacao = idOperacao;
        }

        try {
            const response = await fetch('http://localhost:3333/rest/operacao/select', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "orderDirection": orderDirection,
                    "filters": filters
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao aplicar filtro');
            }

            const dadosFiltrados = await response.json();
            setDados(dadosFiltrados);
        } catch (error) {
            console.error('Erro ao aplicar filtro:', error);
        }
    }, [idOperacao, orderDirection]); // Dependências: idOperacao e orderDirection

    // Memoize handleAddObservacao e adicione aplicarFiltro como dependência
    const handleAddObservacao = useCallback(async (idOperacao, novaObservacao) => {
        if (idOperacao !== 0) {
            try {
                const response = await fetch('http://localhost:3333/rest/observacoes/insert', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "idOperacao": idOperacao,
                        "observacao": novaObservacao
                    }),
                });

                if (!response.ok) {
                    throw new Error('Erro ao inserir observação');
                }

                // Após inserir a observação, aplica o filtro novamente
                await aplicarFiltro();
            } catch (error) {
                console.error('Erro ao inserir observação', error);
            }
        }
    }, [aplicarFiltro]); // Dependência: aplicarFiltro

    const fetchOperators = async () => {
        try {
            const response = await fetch('http://localhost:3333/rest/operador/select');
            const data = await response.json();
            setOptions(data.operators);
        } catch (error) {
            console.log('Erro ao carregar os operadores');
        }
    };

    useEffect(() => {
        fetchOperators();
        aplicarFiltro();
        // eslint-disable-next-line
    }, []); // Executa apenas uma vez, no mount

    return (
        <div className="tabela-container">
            <div className="filter-container">
                <h3 className="filter-title">Filtros</h3>
                <div className="date-range">
                    <label>Data Inicial:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="row-limit">
                    <label>Código:</label>
                    <input
                        type="number"
                        value={idOperacao}
                        onChange={(e) => setIdOperacao(Number(e.target.value))}
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
                        {options.map((option) => (
                            <option key={option.idOperador} value={option.idOperador}>
                                {option.NOME}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="filter-button" onClick={aplicarFiltro}>
                    Aplicar Filtro
                </button>
            </div>

            <div className="home-container">
                <div className="widget-container">
                    {dados.map((item) => (
                        <WidgetInfo key={item.idOperacao} item={item} openModal={openModal} />
                    ))}
                </div>

                <Modal isOpen={isModalOpen} onClose={closeModal} idOperacao={idOperacaoObs} observacoes={observacoes} adicionarObservacao={handleAddObservacao}/>
            </div>
        </div>
    );
};

export default Home;