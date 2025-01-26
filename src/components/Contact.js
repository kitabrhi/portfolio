import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Send, Loader2 } from "lucide-react";

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
                    }) => (
    <div className="space-y-1">
        <div className="relative">
            {isTextArea ? (
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    rows={5}
                    required
                    className={`w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-transparent peer resize-none ${error ? "border-red-500 focus:ring-red-500" : ""}`}
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
                    className={`w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-transparent peer ${error ? "border-red-500 focus:ring-red-500" : ""}`}
                    placeholder={placeholder}
                    aria-invalid={error ? "true" : "false"}
                />
            )}
            <label
                htmlFor={id}
                className={`absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm transition-all ${error ? "text-red-500" : "text-gray-400 peer-focus:text-blue-500"} peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-gray-900`}
            >
                {label}
            </label>
        </div>
        {error && <p className="text-red-500 text-sm pl-1" role="alert">{error}</p>}
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
    const [formStatus, setFormStatus] = useState(null);

    // Validate each field dynamically
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

            // Sending email via EmailJS with your Template ID and Service ID
            const result = await emailjs.sendForm(
                "service_hpakz8s", // Your Service ID (Gmail configured service)
                "template_9b6yzk9", // Your Template ID
                e.target,           // Form element
                "XJxqhOT1910SZmViN" // Your Public API Key (Replace this with your actual API Key)
            );

            console.log("Message sent:", result.text);
            // Reset form and show success status
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

        // Validate field on change
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
            <div className="container mx-auto px-6 lg:px-20">
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Form Section */}
                    <div className="lg:w-1/2 w-full">
                        <div className="space-y-6 mb-12">
                            <h2 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 text-transparent bg-clip-text">
                                Démarrons votre projet
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Vous avez une idée brillante ? Parlons-en ! Je suis là pour vous aider à la concrétiser.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-gray-800/50 p-8 rounded-xl shadow-xl space-y-6 backdrop-blur-sm">
                            <InputField
                                id="name"
                                name="name"
                                label="Votre nom"
                                placeholder="Votre nom"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                                onBlur={handleBlur}
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
                                onBlur={handleBlur}
                                error={errors.message}
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Envoi en cours...</span>
                                    </>
                                ) : formStatus === "success" ? (
                                    <>
                                        <span>Message envoyé avec succès !</span>
                                    </>
                                ) : formStatus === "error" ? (
                                    <>
                                        <span className="text-red-500">Une erreur est survenue</span>
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
                </div>
            </div>
        </section>
    );
};

export default Contact;
