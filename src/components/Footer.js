import React from 'react';
import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    ChevronRight,
    Heart,
    Code2,
    ArrowUp
} from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            const offset = 80; // Header height + padding
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        social: [
            { icon: <Github className="w-5 h-5" />, href: "https://github.com/kitabrhi", label: "GitHub" },
            { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/youssef-kitabrhi-50477b2a7/", label: "LinkedIn" },
            { icon: <Mail className="w-5 h-5" />, href: "mailto:kitabrhi.youssef.1@gmail.com", label: "Email" }
        ],
        contact: [
            { icon: <MapPin className="w-5 h-5" />, text: "Casablanca, Maroc" },
            { icon: <Phone className="w-5 h-5" />, text: "+212 771-302847" },
            { icon: <Mail className="w-5 h-5" />, text: "kitabrhi.youssef.1@gmail.com" }
        ],
        quickLinks: [
            { href: "#about", label: "À propos" },
            { href: "#projects", label: "Projets" },
            { href: "#skills", label: "Compétences" },
            { href: "#contact", label: "Contact" }
        ]
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="relative bg-white text-gray-800 pt-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-500 to-pink-500 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12"
                >
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Youssef KITABRHI
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Développeur passionné créant des expériences web exceptionnelles et des solutions innovantes.
                        </p>
                        <div className="flex items-center gap-4">
                            {footerLinks.social.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-800">Navigation Rapide</h4>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleSmoothScroll(e, link.href)}
                                        className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                                    >
                                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                        <span className="relative">
                                            {link.label}
                                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-800">Contact</h4>
                        <ul className="space-y-4">
                            {footerLinks.contact.map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-600 group">
                                    <span className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-300">
                                        {item.icon}
                                    </span>
                                    <span className="group-hover:text-blue-600 transition-colors duration-300">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="border-t border-gray-200 py-8 mt-12"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <motion.div variants={itemVariants} className="flex items-center gap-2 text-gray-600">
                            <Code2 className="w-5 h-5" />
                            <p>
                                © {currentYear} Youssef KITABRHI. Tous droits réservés.
                            </p>
                        </motion.div>

                        <motion.button
                            variants={itemVariants}
                            onClick={scrollToTop}
                            className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 bg-gray-100 hover:bg-blue-50 px-4 py-2 rounded-lg"
                        >
                            <span>Retour en haut</span>
                            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Made with Love Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 py-3"
            >
                <div className="container mx-auto px-6 lg:px-20">
                    <p className="text-center text-gray-600 flex items-center justify-center gap-2 text-sm">
                        Fait avec
                        <motion.span
                            animate={{
                                scale: [1, 1.2, 1],
                                color: ['#2563eb', '#4f46e5', '#2563eb']
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-4 h-4 fill-current" />
                        </motion.span>
                        par Youssef KITABRHI
                    </p>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;