import { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero', label: 'Início' },
  { id: 'biomassa', label: 'Biomassa Residual' },
  { id: 'biodigestor', label: 'Biogás' },
  { id: 'syngas', label: 'Reforma Catalítica a Seco' },
  { id: 'psa', label: 'Hidrogênio' },
  { id: 'fuelcell', label: 'Célula PEM' },
  { id: 'amonia', label: 'Amônia' },
  { id: 'bike', label: 'Bicicleta' },
  { id: 'automation', label: 'Automação' },
  { id: 'ml', label: 'Inteligência Artificial' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

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

    navItems.forEach(({ id }) => {
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
        <ul
          className={`flex flex-wrap justify-center items-center gap-6 navbar-list ${
            menuOpen ? 'open' : ''
          }`}
        >
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}