import React, { useState, useEffect } from "react";
import { Menu, X, Code, Home } from "lucide-react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
    };

    const handleLinkClick = (e: React.MouseEvent, targetId: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            setIsOpen(false);
        }
    };

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-blue-600/95 shadow-lg backdrop-blur-sm"
                    : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <a
                            href="#home"
                            className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToTop();
                            }}
                        >
                            <Code className="w-6 h-6" />
                            <span className="text-xl font-bold">MonPortfolio</span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {[
                            ["À propos", "#about"],
                            ["Projets", "#projects"],
                            ["Compétences", "#skills"],
                            ["Contact", "#contact"],
                        ].map(([label, href]) => (
                            <a
                                key={href}
                                href={href}
                                className="text-white hover:text-blue-200 transition-colors duration-200 text-sm font-medium"
                                onClick={(e) => handleLinkClick(e, href)}
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-blue-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isOpen
                            ? "max-h-64 opacity-100"
                            : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                >
                    <nav className="pt-4 pb-6">
                        <ul className="space-y-4">
                            {[
                                ["À propos", "#about"],
                                ["Projets", "#projects"],
                                ["Compétences", "#skills"],
                                ["Contact", "#contact"],
                            ].map(([label, href]) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        className="block text-white hover:text-blue-200 transition-colors duration-200 text-sm font-medium py-2"
                                        onClick={(e) => handleLinkClick(e, href)}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;