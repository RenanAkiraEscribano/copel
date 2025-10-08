import "./FooterColaboradores.css";
import React from "react";

const FooterColaboradores = ({ logoGroups }) => {
  return (
    <footer className="footer-color">
      <div className="footer-container">
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
        <div className="footer-copy">
          © {new Date().getFullYear()} Projeto COPEL. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default FooterColaboradores;