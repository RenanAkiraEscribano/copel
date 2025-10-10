import React from 'react';
import "./stylesOperacao.css";

// Você pode usar um emoji, SVG ou um ícone de biblioteca (exemplo: FontAwesome)
// Aqui, um SVG simples de "observação"
const ObservationIcon = ({ onClick }) => (
  <span
    className="observation-icon"
    onClick={onClick}
    title="Ver observações"
    style={{ cursor: "pointer", marginLeft: "8px", verticalAlign: "middle" }}
  >
    {/* Ícone de olho */}
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M10 4C5 4 1.73 8.11 1 10c.73 1.89 4 6 9 6s8.27-4.11 9-6c-.73-1.89-4-6-9-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#555"/>
    </svg>
  </span>
);

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

const WidgetInfo = ({ item, openModal }) => {
    return (
        <div className="widget-info">
            <div className="item">
                Código: <span className="value">{item.idOperacao}</span>
                <ObservationIcon onClick={() => openModal(item.idOperacao, item.observacoes)} />
            </div>
            <div className="item">Operador: <span className="value">{item.nomeOperador}</span></div>
            <div className="item">Reforma Início: <span className="value">{formatDate(item.DATA_INICIO_REFORMA)}</span></div>
            <div className="item">Reforma Fim: <span className="value">{formatDate(item.DATA_FIM_REFORMA)}</span></div>
            <div className="item">PSA Início: <span className="value">{formatDate(item.DATA_INICIO_PSA)}</span></div>
            <div className="item">PSA Fim: <span className="value">{formatDate(item.DATA_FIM_PSA)}</span></div>
            <div className="item">CaC Início: <span className="value">{formatDate(item.DATA_INICIO_CAC)}</span></div>
            <div className="item">CaC Fim: <span className="value">{formatDate(item.DATA_FIM_CAC)}</span></div>
            <button className="button" onClick={() => openModal(item.idOperacao, item.observacoes)}>Ver Detalhes</button>
        </div>
    );
};

export default WidgetInfo;
