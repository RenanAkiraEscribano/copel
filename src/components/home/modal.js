import React, { useState } from "react";
import "./stylesHome.css"; // Estilos do modal

const Modal = ({ isOpen, onClose, observacoes, adicionarObservacao }) => {
    const [novaObservacao, setNovaObservacao] = useState("");

    const handleAddObservacao = () => {
        if (novaObservacao.trim()) {
            adicionarObservacao(novaObservacao);
            setNovaObservacao("");
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
                                <strong>{observacao.data}</strong>: {observacao.texto}
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
