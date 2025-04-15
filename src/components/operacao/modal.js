import React, { useState } from "react";
import "./stylesOperacao.css"; // Estilos do modal

const formatDate = (dateString) => {
    if (!dateString) return "Data inválida";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
    }).format(date);
};

const Modal = ({ isOpen, onClose, idOperacao, observacoes, adicionarObservacao }) => {
    const [novaObservacao, setNovaObservacao] = useState("");

    const handleAddObservacao = () => {
        if (novaObservacao.trim()) {
            adicionarObservacao(idOperacao, novaObservacao);
            setNovaObservacao("");
            onClose();
        }
    };

    return (
        <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    Fechar
                </button>
                <h2>Observações</h2>
                <ul className="modal" style={{ listStyle: "none", padding: 0, maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "5px", background: "#f9f9f9", marginBottom: "15px" }}>
                    {observacoes.length > 0 ? (
                        observacoes.map((observacao, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: "10px",
                                    borderBottom: "1px solid #ddd",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                }}
                            >
                                <strong>{formatDate(observacao.DATA_OBSERVACAO)}</strong>: {observacao.DESCRICAO}
                            </li>
                        ))
                    ) : (
                        <p className="empty-message">Nenhuma observação registrada.</p>
                    )}
                </ul>
                <div className="nova-observacao">
                    <textarea
                        value={novaObservacao}
                        onChange={(e) => setNovaObservacao(e.target.value)}
                        placeholder="Digite uma nova observação"
                    />
                    <button onClick={handleAddObservacao}>Adicionar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
