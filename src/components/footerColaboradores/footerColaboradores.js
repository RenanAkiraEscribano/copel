import React from "react";
import "./FooterColaboradores.css";

const FooterColaboradores = ({ logos }) => {
  return (
    <footer className="footer-color">
      <div className="footer-container">
        <div className="footer-logos">
          {logos.map((logo, index) => (
            <a
              key={index}
              href={logo.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-logo"
            >
              <img src={logo.src} alt={logo.alt || "Logo"} />
            </a>
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
