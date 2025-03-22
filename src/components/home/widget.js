import React from 'react';
import "./stylesHome.css";

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
            <div className="item">Código: <span className="value">{item.idOperacao}</span></div>
            <div className="item">Operador: <span className="value">{item.nomeOperador}</span></div>
            <div className="item">Data Início: <span className="value">{formatDate(item.DATA_INICIO)}</span></div>
            <button className="button" onClick={() => openModal(item.idOperacao, item.observacoes)}>Ver Detalhes</button>
        </div>
    );
};

export default WidgetInfo;
