import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, Sparkles } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'Portfolio Personnel',
        description:
            'Portfolio moderne développé avec React, Three.js et TailwindCSS. Interface immersive avec animations 3D et transitions fluides.',
        image:
            'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80',
        tags: ['React', 'Three.js', 'TailwindCSS', 'Framer Motion'],
        codeLink: 'https://github.com/votre-utilisateur/portfolio',
        demoLink: 'https://portfolio-chhy.onrender.com/',
    },
    {
        id: 2,
        title: 'E-Commerce NextGen',
        description:
            'Application e-commerce moderne avec panier dynamique, paiement en ligne et gestion des commandes en temps réel.',
        image:
            'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        codeLink: 'https://github.com/kitabrhi/EcommerceProject_2-main',
        demoLink: 'https://ecommerce.example.com',
    },
    {
        id: 3,
        title: 'Dashboard Analytics',
        description:
            'Tableau de bord analytique avec visualisations de données en temps réel et rapports personnalisables.',
        image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
        tags: ['React', 'D3.js', 'Firebase', 'Material-UI'],
        codeLink: 'https://github.com/kitabrhi/stage',
        demoLink: 'https://stage-sjza.onrender.com/',
    },
];

function Projects() {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section
            id="projects"
            className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                        Réalisations
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                        Mes Projets
                    </h3>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="group relative bg-gray-800/60 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-700/50 hover:scale-105 transform transition-all duration-500"
                        >
                            {/* Project Image with Overlay */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                {/* Hover Actions */}
                                <div
                                    className={`absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                >
                                    <a
                                        href={project.codeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-gray-900/80 text-white rounded-full hover:bg-gray-800 transform hover:scale-110 transition-all duration-300"
                                    >
                                        <Github className="w-6 h-6" />
                                    </a>
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-gray-900/80 text-white rounded-full hover:bg-gray-800 transform hover:scale-110 transition-all duration-300"
                                    >
                                        <ExternalLink className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    {project.id % 2 === 0 ? (
                                        <Code2 className="w-5 h-5 text-blue-400" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 text-yellow-400" />
                                    )}
                                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-700/50 rounded-full border border-gray-600/50"
                                        >
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative gradient border on hover */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
