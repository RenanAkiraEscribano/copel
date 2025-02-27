import { useEffect, useState } from "react";
import "./styles.css";

const itensPorPagina = 15;

const Conhecimento = () => {
  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [paginaEsquerda, setPaginaEsquerda] = useState(1);
  const [paginaDireita, setPaginaDireita] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3333/rest/conhecimento/select")
      .then((res) => res.json())
      .then((data) => setLeftData(data))
      .catch((err) => console.error("Erro ao buscar dados da esquerda", err));

    fetch("http://localhost:3333/rest/logSE/select")
      .then((res) => res.json())
      .then((data) => setRightData(data))
      .catch((err) => console.error("Erro ao buscar dados da direita", err));
  }, []);

  const paginarDados = (dados, pagina) => {
    const inicio = (pagina - 1) * itensPorPagina;
    return dados.slice(inicio, inicio + itensPorPagina);
  };

  const totalPaginas = (dados) => Math.ceil(dados.length / itensPorPagina);

  const mudarPagina = (pagina, setPagina) => {
    setPagina(pagina);
  };

  return (
    <div className="tabela-container">
      <div className="tabela-dados-container">
        <h2>Regras Sistema Especialista</h2>
        <table className="tabela-reforma">
          <thead>
            <tr>
              <th>Regra</th>
              <th>Tag</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {paginarDados(leftData, paginaEsquerda).map((item) => (
              <tr key={item.idConhecimento}>
                <td>{item.Regra}</td>
                <td>{item.Tag}</td>
                <td>{item.Valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="paginacao">
          <button onClick={() => mudarPagina(paginaEsquerda - 1, setPaginaEsquerda)} disabled={paginaEsquerda === 1}>
            Anterior
          </button>
          {[...Array(totalPaginas(leftData)).keys()].map((i) => (
            <button key={i} onClick={() => mudarPagina(i + 1, setPaginaEsquerda)} className={paginaEsquerda === i + 1 ? 'active' : ''}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => mudarPagina(paginaEsquerda + 1, setPaginaEsquerda)} disabled={paginaEsquerda === totalPaginas(leftData)}>
            Próximo
          </button>
        </div>
      </div>

      <div className="tabela-dados-container">
        <h2>Log Sistema Especialista</h2>
        <table className="tabela-reforma">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {paginarDados(rightData, paginaDireita).map((item, index) => (
              <tr key={item.idLogSE}>
                <td>{new Date(item.DATA_LOG).toLocaleString("pt-BR", { timeZone: "UTC" })}</td>
                <td>{item.LOG_DESCRICAO}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="paginacao">
          <button onClick={() => mudarPagina(paginaDireita - 1, setPaginaDireita)} disabled={paginaDireita === 1}>
            Anterior
          </button>
          {[...Array(totalPaginas(rightData)).keys()].map((i) => (
            <button key={i} onClick={() => mudarPagina(i + 1, setPaginaDireita)} className={paginaDireita === i + 1 ? 'active' : ''}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => mudarPagina(paginaDireita + 1, setPaginaDireita)} disabled={paginaDireita === totalPaginas(rightData)}>
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Conhecimento;