import { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero', label: 'Início' },
  { id: 'biomassa', label: 'Biomassa' },
  { id: 'biodigestor', label: 'Biodigestor' },
  { id: 'syngas', label: 'Syngas' },
  { id: 'psa', label: 'PSA' },
  { id: 'fuelcell', label: 'Célula PEM' },
  { id: 'automation', label: 'Automação' },
  { id: 'ml', label: 'Inteligência Artificial' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');

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
  };

  return (
    <nav className="navbar-glass">
      <div className="container navbar-content">
        <ul className="flex flex-wrap justify-center items-center gap-6">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`nav-link ${
                  activeSection === id ? 'active' : ''
                }`}
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