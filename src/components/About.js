import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Code2, Rocket, Zap, Download, Mail, ExternalLink, ChevronRight } from 'lucide-react';

function About() {
    const targetRef = useRef(null);
    const sphereRef = useRef(null);
    const isInView = useInView(targetRef, { once: false, margin: "-100px" });

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (sphereRef.current) {
                const rect = sphereRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.01;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.01;
                setMousePosition({ x, y });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
    const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

    const features = [
        {
            title: "Développement Créatif",
            description: "Création d'interfaces uniques et innovantes qui se démarquent tout en restant intuitives et fonctionnelles.",
            icon: Code2,
            color: "from-yellow-400 to-orange-500",
            details: [
                "Interfaces sur mesure",
                "Animations fluides",
                "Design responsive",
                "Expérience utilisateur optimale"
            ]
        },
        {
            title: "Performance Optimale",
            description: "Développement d'applications rapides et optimisées pour une expérience utilisateur fluide et agréable.",
            icon: Zap,
            color: "from-blue-400 to-cyan-500",
            details: [
                "Chargement rapide",
                "Optimisation SEO",
                "Code propre et maintenable",
                "Tests automatisés"
            ]
        },
        {
            title: "Solutions Évolutives",
            description: "Conception de solutions robustes et évolutives qui s'adaptent à vos besoins croissants.",
            icon: Rocket,
            color: "from-purple-400 to-pink-500",
            details: [
                "Architecture scalable",
                "Intégration continue",
                "Déploiement automatisé",
                "Maintenance facilitée"
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section
            id="about"
            ref={targetRef}
            className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden"
        >
            {/* Animated background patterns */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    style={{ y: smoothY, opacity: smoothOpacity }}
                    className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-yellow-500/5 via-yellow-400/5 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: smoothY, opacity: smoothOpacity }}
                    className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 via-blue-400/5 to-transparent rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-4"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "auto" } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800/5 to-gray-800/0 px-4 py-2 rounded-full overflow-hidden"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-800/40" />
                        <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                            Découvrez mon parcours
                        </h2>
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-800/40" />
                    </motion.div>

                    <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text">
                        À propos de moi
                    </h3>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left side - Text content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-8"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="prose prose-lg"
                        >
                            <p className="text-gray-600 leading-relaxed">
                                En tant que{' '}
                                <span className="relative inline-block group">
                                    <span className="relative z-10 font-semibold text-gray-800">
                                        développeur passionné
                                    </span>
                                    <span className="absolute inset-x-0 bottom-0 h-2 bg-yellow-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </span>,
                                je m'efforce de créer des expériences web exceptionnelles qui allient esthétique et fonctionnalité.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Ma stack technique inclut{' '}
                                {['React', 'TypeScript', 'TailwindCSS'].map((tech, index) => (
                                    <span key={tech} className="relative inline-block group mx-1">
                                        <span className="relative z-10 font-semibold text-gray-800">
                                            {tech}
                                        </span>
                                        <span className="absolute inset-x-0 bottom-0 h-2 bg-blue-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                    </span>
                                ))}
                                , me permettant de développer des applications modernes et performantes.
                            </p>
                        </motion.div>

                        <div className="grid gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                                    <div className="relative flex items-center gap-4">
                                        <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                                {feature.title}
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                                        </div>
                                    </div>

                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        whileHover={{ height: "auto", opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="mt-4 grid grid-cols-2 gap-2">
                                            {feature.details.map((detail, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full bg-current`}
                                                          style={{ color: feature.color.split(' ')[1] }}
                                                    />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href="/assets/CV_youssef_KITABRHI.pdf"                                download

                                className="group relative px-8 py-3 bg-gray-900 text-white rounded-lg font-medium
                                         overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20"
                            >
                                <span className="absolute inset-0 bg-gray-800 transform origin-left -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-2">
                                    Télécharger CV
                                    <Download className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
                                </span>
                            </a>
                            <a
                                href="#contact"
                                className="group relative px-8 py-3 bg-white text-gray-900 rounded-lg font-medium
                                         overflow-hidden transition-all duration-300 hover:shadow-lg
                                         border border-gray-200"
                            >
                                <span className="absolute inset-0 bg-gray-50 transform origin-left -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-2">
                                    Me Contacter
                                    <Mail className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right side - 3D Animation */}
                    <motion.div
                        ref={sphereRef}
                        style={{ scale: smoothScale }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] hidden lg:block"
                    >
                        <Canvas className="absolute inset-0">
                            <OrbitControls
                                enableZoom={false}
                                autoRotate
                                autoRotateSpeed={3}
                                rotateSpeed={0.5}
                            />
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[2, 3, 1]} intensity={1.5} />
                            <Sphere args={[1, 100, 200]} scale={2}>
                                <MeshDistortMaterial
                                    color="#111827"
                                    attach="material"
                                    distort={0.5}
                                    speed={1.5}
                                    roughness={0.2}
                                    metalness={0.8}
                                />
                            </Sphere>
                        </Canvas>

                        {/* Interactive glow effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                x: mousePosition.x * 20,
                                y: mousePosition.y * 20,
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default About;
