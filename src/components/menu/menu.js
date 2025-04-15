import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './stylesMenu.css';
import Logo from '../../assets/Logo_LABMATER.png';
import { useAuth } from '../../contexts/AuthContext';

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { logout } = useAuth();
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const menuItems = [
        { name: "Operações", href: "/operacao" },
        { name: "Reforma", href: "/reforma" },
        { name: "Armazenamento PSA", href: "/tq03_04_05" },
        { name: "CaC", href: "/cac" },
        { name: "Sistema Especialista", href: "/conhecimento" },
        { name: "Dashboard", href: "/dashboard" }
    ];

    return (
        <nav className="menu-color">
            <div className="menu-container">
                <a href="/" className="menu-logo">
                    <img src={Logo} alt="Logo LABMATER" />
                </a>
                
                <div className="menu-content">
                    <ul className={`center-menu ${menuOpen ? 'open' : ''}`}>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a href={item.href}>
                                    <FontAwesomeIcon className="margin-icon" icon={faCircle} size="xs" /> {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    
                    <button className="logout-button" onClick={logout} title="Sair do sistema">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Sair</span>
                    </button>
                </div>
                
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                    ☰
                </button>
            </div>
        </nav>
    );
};

export default Menu;