import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Palette, FileJson, Blocks, Server, GitFork, ExternalLink } from "lucide-react";

function Skills() {
    const [selectedSkill, setSelectedSkill] = useState(null);

    const skills = [
        {
            name: "HTML",
            icon: <Code2 className="w-16 h-16 text-orange-500" />,
            description: "Structure et sémantique web",
            level: 90,
            details: [
                "HTML5 sémantique",
                "Accessibilité WAI-ARIA",
                "SEO optimisé",
                "Formulaires avancés"
            ]
        },
        {
            name: "CSS",
            icon: <Palette className="w-16 h-16 text-blue-500" />,
            description: "Styles et animations modernes",
            level: 85,
            details: [
                "Flexbox & Grid",
                "Animations & Transitions",
                "Responsive Design",
                "SASS/SCSS"
            ]
        },
        {
            name: "JavaScript",
            icon: <FileJson className="w-16 h-16 text-yellow-500" />,
            description: "Programmation dynamique",
            level: 88,
            details: [
                "ES6+",
                "Async/Await",
                "DOM Manipulation",
                "Web APIs"
            ]
        },
        {
            name: "React",
            icon: <Blocks className="w-16 h-16 text-blue-400" />,
            description: "Développement d'interfaces",
            level: 92,
            details: [
                "Hooks & Context",
                "Redux/Zustand",
                "Next.js",
                "Performance"
            ]
        },
        {
            name: "Node.js",
            icon: <Server className="w-16 h-16 text-green-500" />,
            description: "Backend JavaScript",
            level: 82,
            details: [
                "Express.js",
                "API REST",
                "WebSocket",
                "MongoDB/SQL"
            ]
        },
        {
            name: "Git/GitHub",
            icon: <GitFork className="w-16 h-16 text-red-500" />,
            description: "Gestion de versions",
            level: 87,
            details: [
                "Git Flow",
                "CI/CD",
                "Pull Requests",
                "Code Review"
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const progressVariants = {
        initial: { width: 0 },
        animate: (level) => ({
            width: `${level}%`,
            transition: { duration: 1.5, ease: "easeOut" }
        })
    };

    return (
        <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                        Mes Compétences
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Une expertise approfondie dans les technologies web modernes
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className={`relative bg-white rounded-2xl overflow-hidden backdrop-blur-sm ${
                                selectedSkill === index ? 'ring-2 ring-offset-2' : ''
                            }`}
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                boxShadow: selectedSkill === index
                                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                    : '0 10px 30px -12px rgba(0, 0, 0, 0.15)'
                            }}
                            variants={itemVariants}
                            onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div
                                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
                                style={{ color: skill.icon.props.className.split(' ')[2] }}
                            />

                            <div className="p-8">
                                <motion.div
                                    className="bg-gray-50 p-6 rounded-2xl mb-6 relative group"
                                    whileHover={{ rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <motion.div
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        {skill.icon}
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                                </motion.div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{skill.name}</h3>
                                <p className="text-gray-600 mb-6">{skill.description}</p>

                                <div className="relative pt-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-sm font-semibold text-gray-600">
                                            Niveau de maîtrise
                                        </div>
                                        <div className="text-sm font-bold text-gray-800">
                                            {skill.level}%
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-100">
                                        <motion.div
                                            custom={skill.level}
                                            variants={progressVariants}
                                            initial="initial"
                                            animate="animate"
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full"
                                            style={{
                                                backgroundColor: skill.icon.props.className.split(' ')[2].replace('text-', 'bg-')
                                            }}
                                        />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {selectedSkill === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-6 pt-6 border-t border-gray-100"
                                        >
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                Détails <ExternalLink className="w-4 h-4" />
                                            </h4>
                                            <ul className="space-y-2">
                                                {skill.details.map((detail, idx) => (
                                                    <motion.li
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="text-sm text-gray-600 flex items-center gap-2"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-current"
                                                              style={{ color: skill.icon.props.className.split(' ')[2] }}
                                                        />
                                                        {detail}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Skills;
