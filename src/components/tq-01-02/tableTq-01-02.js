import React, { useState, useEffect } from 'react';
import './styles.css'; // Importe o arquivo CSS para estilização

const TabelaTQ01_02 = ({ dadosFiltrados, selectedFilters }) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosPagina, setDadosPagina] = useState([]);
  const itensPorPagina = 15;

  // Atualiza os dados da página atual quando os dados filtrados ou a página mudam
  useEffect(() => {
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = indiceInicial + itensPorPagina;
    setDadosPagina(dadosFiltrados.slice(indiceInicial, indiceFinal));
  }, [dadosFiltrados, paginaAtual]);

  // Calcula o número total de páginas
  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

  // Função para mudar de página
  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  // Renderiza o cabeçalho da tabela com base nos filtros selecionados
  const renderizarCabecalho = () => {
    return (
      <thead>
        <tr>
          <th colSpan={selectedFilters.length + 1}>Dados TQ 01-02</th>
        </tr>
        <tr>
          <th>Data/Hora</th> {/* Coluna fixa para a data/hora */}
          {selectedFilters.map((filtro) => (
            <th key={filtro}>{filtro}</th> // Colunas dinâmicas com base nos filtros selecionados
          ))}
        </tr>
      </thead>
    );
  };

  // Renderiza as linhas da tabela com base nos dados e filtros selecionados
  const renderizarLinhas = () => {
    return dadosPagina.map((dado, index) => {
      // Criando uma nova data a partir da string ISO
      const date = new Date(dado.DATA_ARMAZENAMENTO01);
  
      // Formatando a data para o formato YYYY-MM-DD HH:mm:ss
      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
  
      return (
        <tr key={index}>
          <td>{formattedDate}</td> {/* Coluna fixa para a data/hora */}
          {selectedFilters.map((filtro) => (
            <td key={filtro}>{dado[filtro]}</td> // Colunas dinâmicas com base nos filtros selecionados
          ))}
        </tr>
      );
    });
  };
  

  // Renderiza os controles de paginação
  const renderizarPaginacao = () => {
    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
      paginas.push(
        <button
          key={i}
          onClick={() => mudarPagina(i)}
          className={paginaAtual === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="paginacao">
        <button
          onClick={() => mudarPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
        >
          Anterior
        </button>
        {paginas}
        <button
          onClick={() => mudarPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
        >
          Próximo
        </button>
      </div>
    );
  };

  return (
    <div>
      <table className="tabela-tq">
        {renderizarCabecalho()}
        <tbody>{renderizarLinhas()}</tbody>
      </table>

      {/* Paginação */}
      {renderizarPaginacao()}
    </div>
  );
};

export default TabelaTQ01_02;