import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { Send, Loader2, Mail, MessageSquare, User, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const InputField = ({
                        id,
                        name,
                        type = "text",
                        value,
                        onChange,
                        label,
                        placeholder,
                        isTextArea = false,
                        error,
                        onBlur,
                        icon: Icon
                    }) => (
    <motion.div
        className="space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon className="w-5 h-5" />
            </div>
            {isTextArea ? (
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    rows={5}
                    required
                    className={`w-full bg-gray-800/40 border border-gray-600 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer resize-none backdrop-blur-sm
                    ${error ? "border-red-500 focus:ring-red-500/50" : "hover:border-gray-500"}
                    `}
                    placeholder={placeholder}
                    aria-invalid={error ? "true" : "false"}
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                    className={`w-full bg-gray-800/40 border border-gray-600 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-transparent peer backdrop-blur-sm
                    ${error ? "border-red-500 focus:ring-red-500/50" : "hover:border-gray-500"}
                    `}
                    placeholder={placeholder}
                    aria-invalid={error ? "true" : "false"}
                />
            )}
            <label
                htmlFor={id}
                className={`absolute left-12 -top-2.5 bg-gray-900 px-2 text-sm transition-all
                ${error ? "text-red-500" : "text-gray-400 peer-focus:text-blue-500"}
                peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base
                peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gray-900`}
            >
                {label}
            </label>
        </div>
        <AnimatePresence>
            {error && (
                <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-sm pl-1"
                    role="alert"
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </motion.div>
);

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [formStatus, setFormStatus] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (formStatus === "success") {
            setShowSuccessMessage(true);
            const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [formStatus]);

    const validateField = (name, value) => {
        let errorMessage = "";
        if (name === "name" && !value.trim()) {
            errorMessage = "Le nom est requis";
        } else if (name === "email") {
            if (!value.trim()) {
                errorMessage = "L'email est requis";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = "L'email n'est pas valide";
            }
        } else if (name === "message" && !value.trim()) {
            errorMessage = "Le message est requis";
        }
        return errorMessage;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setFormStatus("error");
            return;
        }

        try {
            setIsSubmitting(true);
            setFormStatus("submitting");

            const result = await emailjs.sendForm(
                "service_hpakz8s",
                "template_9b6yzk9",
                e.target,
                "XJxqhOT1910SZmViN"
            );

            console.log("Message sent:", result.text);
            setFormData({ name: "", email: "", message: "" });
            setErrors({});
            setFormStatus("success");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);
            setFormStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    return (
        <section
            id="contact"
            className="relative min-h-screen bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                className="container mx-auto px-6 lg:px-20 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-4xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full"
                        >
                            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-sm font-medium text-blue-300">Disponible pour de nouveaux projets</span>
                            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                        </motion.div>

                        <motion.h2
                            className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 text-transparent bg-clip-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Démarrons votre projet
                        </motion.h2>

                        <motion.p
                            className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Vous avez une idée brillante ? Parlons-en ! Je suis là pour vous aider à la concrétiser.
                        </motion.p>
                    </div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-gray-800/30 p-8 rounded-2xl shadow-xl space-y-6 backdrop-blur-sm border border-gray-700/50"
                        >
                            <InputField
                                id="name"
                                name="name"
                                label="Votre nom"
                                placeholder="Votre nom"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.name}
                                icon={User}
                            />
                            <InputField
                                id="email"
                                name="email"
                                type="email"
                                label="Votre email"
                                placeholder="Votre email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email}
                                icon={Mail}
                            />
                            <InputField
                                id="message"
                                name="message"
                                isTextArea
                                label="Votre message"
                                placeholder="Votre message"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.message}
                                icon={MessageSquare}
                            />

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Envoi en cours...</span>
                                    </>
                                ) : formStatus === "success" ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        <span>Message envoyé avec succès !</span>
                                    </motion.div>
                                ) : formStatus === "error" ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="flex items-center gap-2 text-red-400"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        <span>Une erreur est survenue</span>
                                    </motion.div>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        <span>Envoyer le message</span>
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <AnimatePresence>
                            {showSuccessMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg backdrop-blur-sm border border-green-500/30 flex items-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Message envoyé avec succès !
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;