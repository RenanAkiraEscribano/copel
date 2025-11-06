import { useState, useEffect } from 'react';

const navIds = [
  'hero',
  'biomassa',
  'biodigestor',
  'syngas',
  'psa',
  'fuelcell',
  'amonia',
  'bike',
  'automation',
  'ml',
  'certificado'
];

const translations = {
  pt: {
    hero: 'Início',
    biomassa: 'Biomassa Residual',
    biodigestor: 'Biogás',
    syngas: 'Reforma Catalítica a Seco',
    psa: 'Hidrogênio',
    fuelcell: 'Célula PEM',
    amonia: 'Amônia',
    bike: 'Bicicleta',
    automation: 'Automação',
    ml: 'Inteligência Artificial',
    certificado: 'Metodologia de Certificação'
  },
  en: {
    hero: 'Home',
    biomassa: 'Residual Biomass',
    biodigestor: 'Biogas',
    syngas: 'Dry Catalytic Reforming',
    psa: 'Hydrogen (PSA)',
    fuelcell: 'PEM Fuel Cell',
    amonia: 'Ammonia',
    bike: 'Bicycle',
    automation: 'Automation',
    ml: 'Artificial Intelligence',
    certificado: 'Certification Methodology'
  }
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('app_lang');
    const initial = stored || 'pt';
    setLang(initial);
    document.documentElement.lang = initial === 'pt' ? 'pt-BR' : 'en';
  }, []);

  const setLangAndNotify = (next) => {
    setLang(next);
    localStorage.setItem('app_lang', next);
    document.documentElement.lang = next === 'pt' ? 'pt-BR' : 'en';
    window.dispatchEvent(new CustomEvent('langChange', { detail: next }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    navIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // Fecha o menu ao clicar
  };

  return (
    <nav className="navbar-glass">
      <div className="container navbar-content">
        {/* Botão hamburguer para mobile */}
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menu"
        >
          <span className="navbar-hamburger" />
        </button>

        {/* Language switch: two options, highlight active */}
        <div className="lang-switch" role="tablist" aria-label="Language switch">
          <button
            type="button"
            className={`lang-option ${lang === 'pt' ? 'active' : ''}`}
            onClick={() => setLangAndNotify('pt')}
            aria-pressed={lang === 'pt'}
            title="Português"
          >
            PT
          </button>
          <button
            type="button"
            className={`lang-option ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLangAndNotify('en')}
            aria-pressed={lang === 'en'}
            title="English"
          >
            EN
          </button>
        </div>

        <ul
          className={`flex flex-wrap justify-center items-center gap-6 navbar-list ${
            menuOpen ? 'open' : ''
          }`}
        >
          {navIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
              >
                {translations[lang][id] ?? id}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}