import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './stylesMenu.css';
import Logo from '../../assets/Logo_LABMATER.png';

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Array de objetos com nome e href para cada item do menu
    const menuItems = [
        { name: "Reforma", href: "/reforma" },
        { name: "TQ 01/02", href: "/tq01_02" },
        { name: "TQ 03/04/05", href: "/tq03_04_05" },
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
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                    ☰
                </button>
                <ul className={`center-menu ${menuOpen ? 'open' : ''}`}>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}> {/* Usando o href do objeto */}
                                <FontAwesomeIcon className="margin-icon" icon={faCircle} size="xs" /> {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Menu;