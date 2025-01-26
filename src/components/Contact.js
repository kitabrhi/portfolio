import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Send, Loader2 } from "lucide-react";
import MessageIcon from "./MessageIcon";

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
                    }) => (
    <div className="space-y-1">
        <div className="relative">
            {isTextArea ? (
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows={5}
                    required
                    className={`w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-300 placeholder-transparent peer resize-none
            ${error ? "border-red-500 focus:ring-red-500" : ""}`}
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
                    required
                    className={`w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-300 placeholder-transparent peer
            ${error ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder={placeholder}
                    aria-invalid={error ? "true" : "false"}
                />
            )}
            <label
                htmlFor={id}
                className={`absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm transition-all
          ${error ? "text-red-500" : "text-gray-400 peer-focus:text-blue-500"}
          peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent
          peer-placeholder-shown:text-base peer-focus:-top-2.5
          peer-focus:text-sm peer-focus:bg-gray-900`}
            >
                {label}
            </label>
        </div>
        {error && (
            <p className="text-red-500 text-sm pl-1" role="alert">
                {error}
            </p>
        )}
    </div>
);

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Le nom est requis";
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "L'email n'est pas valide";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Le message est requis";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("Formulaire invalide :", errors);
            return;
        }

        try {
            setIsSubmitting(true);
            // Simuler l'envoi du formulaire
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Réinitialiser le formulaire après succès
            setFormData({ name: "", email: "", message: "" });
            setErrors({});
            alert("Message envoyé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            alert("Une erreur est survenue lors de l'envoi du message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <section
            id="contact"
            className="relative min-h-screen bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-1/2 -left-40 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[80px] animate-pulse delay-1000"></div>
                <div className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-2000"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-20">
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Form Section */}
                    <div className="lg:w-1/2 w-full">
                        <div className="space-y-6 mb-12">
                            <h2 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 text-transparent bg-clip-text">
                                Démarrons votre projet
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Vous avez une idée brillante ? Parlons-en ! Je suis là pour vous
                                aider à la concrétiser.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-gray-800/50 p-8 rounded-xl shadow-xl space-y-6 backdrop-blur-sm"
                        >
                            <InputField
                                id="name"
                                name="name"
                                label="Votre nom"
                                placeholder="Votre nom"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <InputField
                                id="email"
                                name="email"
                                type="email"
                                label="Votre email"
                                placeholder="Votre email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <InputField
                                id="message"
                                name="message"
                                isTextArea
                                label="Votre message"
                                placeholder="Votre message"
                                value={formData.message}
                                onChange={handleChange}
                                error={errors.message}
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg
                  shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02]
                  transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2 relative overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Envoi en cours...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        <span>Envoyer le message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* 3D Icon Section */}
                    <div className="lg:w-1/2 w-full h-[500px] relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-md shadow-2xl">
                            <Suspense
                                fallback={
                                    <div className="h-full flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                    </div>
                                }
                            >
                                <Canvas
                                    camera={{ position: [1, 1, 15], fov: 100 }}
                                    className="w-full h-full"
                                >
                                    <OrbitControls
                                        enableZoom={false}
                                        autoRotate
                                        autoRotateSpeed={4}
                                        enablePan={false}
                                        minPolarAngle={Math.PI / 2}
                                        maxPolarAngle={Math.PI / 2}
                                    />
                                    <ambientLight intensity={0.8} />
                                    <directionalLight position={[2, 5, 2]} intensity={1.2} />
                                    <MessageIcon />
                                </Canvas>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
