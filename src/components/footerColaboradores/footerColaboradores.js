import "./FooterColaboradores.css";
import React from "react";

const FooterColaboradores = ({ logoGroups, mostrarParticipantes = false, participantes = [] }) => {
  return (
    <footer className="footer-color">
      <div className="footer-container">
        {/* Faixa de participantes - visibilidade condicional */}
        {mostrarParticipantes && participantes.length > 0 && (
          <div className="faixa-participantes">
            {participantes.map((grupo, grupoIndex) => (
              <div key={grupoIndex} className="grupo-participantes">
                <div className="titulo-empresa">
                  <strong>{grupo.empresa}</strong>
                </div>
                <div className="lista-participantes">
                  {grupo.nomes.map((nome, nomeIndex) => (
                    <span key={nomeIndex} className="nome-participante">
                      {nome}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Logos existentes */}
        <div className="footer-logos">
          {logoGroups.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {groupIndex === 0 && (
                <div className="footer-label"><strong>REALIZAÇÃO</strong></div>
              )}
              {groupIndex === 2 && (
                <div className="footer-label"><strong>PATROCÍNIO/APOIO</strong></div>
              )}
              {groupIndex === 3 && (
                <div className="footer-label"><strong>LABORATÓRIOS E UNIDADES DA UFPR ENVOLVIDOS</strong></div>
              )}
              <div 
                className={`footer-row footer-row-${group.logos.length}`}
              >
                {group.logos.map((logo, logoIndex) => (
                  <a
                    key={logoIndex}
                    href={logo.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`footer-logo${logo.size ? ` footer-logo-${logo.size}` : ""}`}
                  >
                    <img src={logo.src} alt={logo.alt || "Logo"} />
                  </a>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Seção de contato */}
        <div className="footer-contato">
          <div className="contato-info">
            <strong>CONTATO: </strong>
            <span>labmater@ufpr.br</span>
          </div>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} Projeto COPEL. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default FooterColaboradores;