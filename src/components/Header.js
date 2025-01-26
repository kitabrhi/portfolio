import React, { useState, useEffect } from "react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Détecter si l'utilisateur a défilé la page
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Fonction pour faire défiler la page en haut (scrollToTop)
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Défilement fluide
        });
    };

    // Animation sur clic
    const handleLinkClick = (e, targetId) => {
        e.preventDefault(); // Empêcher le comportement par défaut du lien
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Ajouter une animation visuelle au clic (par exemple, opacité réduite)
            targetElement.style.transition = "opacity 0.3s ease";
            targetElement.style.opacity = "0.5";
            setTimeout(() => {
                targetElement.style.opacity = "1";
            }, 300);

            // Défilement fluide vers l'élément ciblé
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <header
            className={`fixed w-full top-0 z-50 backdrop-blur-lg ${
                isScrolled ? "bg-blue-600/80 shadow-lg" : "bg-transparent"
            } transition-all duration-300`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <a
                        href="#home" // Ajoute un #home pour le lien
                        className="hover:text-gray-300"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToTop(); // Appelle la fonction scrollToTop
                        }} // Gère le clic pour revenir au début de la page
                    >
                        MonPortfolio
                    </a>
                </div>

                {/* Menu desktop */}
                <nav className="hidden md:flex space-x-6">
                    <a
                        href="#about"
                        className="hover:text-gray-300 transition"
                        onClick={(e) => handleLinkClick(e, "#about")}
                    >
                        À propos
                    </a>
                    <a
                        href="#projects"
                        className="hover:text-gray-300 transition"
                        onClick={(e) => handleLinkClick(e, "#projects")}
                    >
                        Projets
                    </a>
                    <a
                        href="#skills"
                        className="hover:text-gray-300 transition"
                        onClick={(e) => handleLinkClick(e, "#skills")}
                    >
                        Compétences
                    </a>
                    <a
                        href="#contact"
                        className="hover:text-gray-300 transition"
                        onClick={(e) => handleLinkClick(e, "#contact")}
                    >
                        Contact
                    </a>
                </nav>

                {/* Burger Menu Button (mobile) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menu mobile */}
            {isOpen && (
                <nav className="md:hidden bg-blue-700/90 backdrop-blur-lg">
                    <ul className="space-y-4 px-6 py-4">
                        <li>
                            <a
                                href="#about"
                                className="block hover:text-gray-300"
                                onClick={(e) => handleLinkClick(e, "#about")}
                            >
                                À propos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#projects"
                                className="block hover:text-gray-300"
                                onClick={(e) => handleLinkClick(e, "#projects")}
                            >
                                Projets
                            </a>
                        </li>
                        <li>
                            <a
                                href="#skills"
                                className="block hover:text-gray-300"
                                onClick={(e) => handleLinkClick(e, "#skills")}
                            >
                                Compétences
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="block hover:text-gray-300"
                                onClick={(e) => handleLinkClick(e, "#contact")}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;
