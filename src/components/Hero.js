import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Github, Linkedin, ChevronDown, ExternalLink, Mail, Download } from "lucide-react";

const Hero = () => {
    const targetRef = useRef(null);
    const isInView = useInView(targetRef, { once: false, margin: "-100px" });

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
    const y = useTransform(scrollY, [0, 300], [0, 100]);

    // Smooth spring animation for parallax effect
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const smoothY = useSpring(y, springConfig);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false); // Track the click state

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) * 0.05,
                y: (e.clientY - window.innerHeight / 2) * 0.05
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 1000); // Reset click state after 1 second
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            const offset = 80; // You can adjust this offset if you have a fixed header
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

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

    const glowVariants = {
        initial: { opacity: 0.5, scale: 0.8 },
        animate: {
            opacity: [0.4, 0.6, 0.4],
            scale: [0.8, 1, 0.8],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section
            id="hero"
            ref={targetRef}
            className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
        >
            {/* Dynamic background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: mousePosition.x * 2,
                        y: mousePosition.y * 2,
                        transition: { type: "spring", damping: 50 }
                    }}
                    className="absolute top-1/4 -right-20 w-[600px] h-[600px]"
                >
                    <motion.div
                        variants={glowVariants}
                        initial="initial"
                        animate="animate"
                        className="w-full h-full bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-transparent rounded-full blur-3xl"
                    />
                </motion.div>
                <motion.div
                    animate={{
                        x: mousePosition.x * -2,
                        y: mousePosition.y * -2,
                        transition: { type: "spring", damping: 50 }
                    }}
                    className="absolute bottom-1/4 -left-20 w-[700px] h-[700px]"
                >
                    <motion.div
                        variants={glowVariants}
                        initial="initial"
                        animate="animate"
                        className="w-full h-full bg-gradient-to-tr from-yellow-500/15 via-yellow-400/5 to-transparent rounded-full blur-3xl"
                    />
                </motion.div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [null, "-100vh"],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 lg:px-20 min-h-screen flex flex-col">
                <motion.div
                    className="flex-1 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20"
                    style={{ opacity, scale, y: smoothY }}
                >
                    {/* Left side - Text content */}
                    <motion.div
                        className="lg:w-1/2 space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <div className="space-y-6">
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-2"
                            >
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: "3rem" }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="h-[2px] bg-yellow-400"
                                />
                                <h2 className="text-sm sm:text-base text-yellow-400 font-medium tracking-wide">
                                    Développeur Web Full Stack
                                </h2>
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                            >
                                Bonjour, je suis{" "}
                                <span className="relative inline-block group">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200">
                                        Youssef KITABRHI
                                    </span>
                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 1, duration: 0.8 }}
                                        className="absolute inset-x-0 bottom-0 h-3 bg-yellow-400/20 -skew-x-12 origin-left"
                                    />
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="text-lg text-gray-300 leading-relaxed"
                            >
                                Je suis étudiant ingénieur en informatique en 4ᵉ année à l'
                                <span className="relative inline-block group cursor-pointer">
                                    <span className="relative z-10 text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors duration-300">
                                        EMSI
                                    </span>
                                    <span className="absolute inset-x-0 bottom-0 h-2 bg-yellow-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </span>
                                . Passionné par le développement web et l'innovation technologique.
                            </motion.p>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToContact();
                                }}
                                className="group relative px-8 py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium
                                         overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20"
                            >
                                <span className="absolute inset-0 bg-yellow-300 transform origin-left -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-2">
                                    Me Contacter
                                    <Mail className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>
                            <a
                                href="/assets/Youssef.Kitabrhi.pdf"                                download
                                className="group relative px-8 py-3 bg-gray-800 text-white rounded-lg font-medium
                                         overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10
                                         border border-gray-700"
                            >
                                <span className="absolute inset-0 bg-yellow-400/10 transform origin-left -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                <span className="relative flex items-center gap-2">
                                    Télécharger CV
                                    <Download className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
                                </span>
                            </a>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-6"
                        >
                            {[
                                { icon: <Github className="w-7 h-7" />, href: "https://github.com/kitabrhi", label: "GitHub" },
                                { icon: <Linkedin className="w-7 h-7" />, href: "https://www.linkedin.com/in/youssef-kitabrhi-50477b2a7/", label: "LinkedIn" },
                                { icon: <Mail className="w-7 h-7" />, href: "mailto:kitabrhi.youssef.1@gmail.com", label: "Email" }
                            ].map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 + index * 0.1 }}
                                >
                                    <span className="absolute inset-0 bg-yellow-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                                    <span className="relative z-10">{social.icon}</span>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right side - Profile Picture */}
                    <motion.div
                        className="lg:w-1/2 w-full max-w-[500px]"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            x: mousePosition.x * 0.5,
                            y: mousePosition.y * 0.5
                        }}
                    >
                        <div className="relative aspect-square">
                            <motion.div
                                variants={glowVariants}
                                initial="initial"
                                animate="animate"
                                className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl"
                            />
                            <div className="relative w-[80%] aspect-square mx-auto">
                                <motion.div
                                    variants={glowVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-transparent rounded-full blur-xl"
                                />
                                <div className="relative group">
                                    <img
                                        src="/assets/IMG_5301.jpg"
                                        alt="Youssef KITABRHI"
                                        className="rounded-full object-cover w-full h-full shadow-2xl
                                                 border-4 border-yellow-400/50 group-hover:border-yellow-400
                                                 transition-all duration-300 transform group-hover:scale-[1.02]"
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        animate={{
                                            background: [
                                                "linear-gradient(to top right, rgba(234,179,8,0.2), transparent)",
                                                "linear-gradient(to bottom left, rgba(234,179,8,0.2), transparent)",
                                                "linear-gradient(to top right, rgba(234,179,8,0.2), transparent)"
                                            ]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="flex justify-center pb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                >
                    <motion.button
                        onClick={scrollToContact}
                        className="group text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                        aria-label="Scroll to contact section"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronDown className="w-8 h-8 animate-bounce" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
