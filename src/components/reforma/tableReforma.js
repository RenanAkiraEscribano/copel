import React, { useState, useEffect } from 'react';
import './styles.css'; // Importe o arquivo CSS para estilização

const TabelaReforma = ({ dadosFiltrados, selectedFilters }) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [dadosPagina, setDadosPagina] = useState([]);
  const itensPorPagina = 30;

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
          <th colSpan={selectedFilters.length + 2}>Dados Reforma</th>
        </tr>
        <tr>
          <th>Operação</th> {/* Coluna fixa para o idOperacao */}
          <th>Data/Hora</th> {/* Coluna fixa para a data/hora */}
          {selectedFilters.map((filtro) => (
            <th key={filtro}>{filtro}</th> // Colunas dinâmicas com base nos filtros selecionados
          ))}
        </tr>
      </thead>
    );
  };

  // helper para formatar data preservando timezone local
  const formatDate = (dateString) => {
    if (!dateString) return '';
    // normaliza 'YYYY-MM-DD HH:mm:ss' para 'YYYY-MM-DDTHH:mm:ss' se necessário
    const normalized = String(dateString).replace(' ', 'T');
    const d = new Date(normalized);
    if (isNaN(d)) return dateString;
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(d);
  };

  const renderizarLinhas = () => {
    return dadosPagina.map((dado, index) => {
      const formattedDate = formatDate(dado.DATA_REFORMA);

      return (
        <tr key={index}>
          <td>{dado.idOperacao}</td>
          <td>{formattedDate}</td>
          {selectedFilters.map((filtro) => {
            const valor = dado[filtro];
            let exibicao;

            if (filtro.startsWith("VAL")) {
              exibicao = valor ? "Aberto" : "Fechada";
            } else {
              exibicao = valor;
            }

            return <td key={filtro}>{exibicao}</td>;
          })}
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
      <table className="tabela-reforma">
        {renderizarCabecalho()}
        <tbody>{renderizarLinhas()}</tbody>
      </table>

      {/* Paginação */}
      {renderizarPaginacao()}
    </div>
  );
};

export default TabelaReforma;