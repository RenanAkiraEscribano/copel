import React from 'react';
import "./stylesHome.css";

const WidgetInfo = ({ item, openModal }) => {
    return (
        <div className="widget-info">
            <div className="item">Código: <span className="value">{item.codigo}</span></div>
            <div className="item">Operador: <span className="value">{item.operador}</span></div>
            <div className="item">Data Início: <span className="value">{item.dataInicio}</span></div>
            <button className="button" onClick={() => openModal(item.observacoes)}>Ver Detalhes</button>
        </div>
    );
};

export default WidgetInfo;
