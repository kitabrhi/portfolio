import React from "react";
import { useGLTF } from "@react-three/drei";

function MessageIcon() {
    const { scene } = useGLTF("/models/mail.glb"); // Assurez-vous que ce chemin est correct
    return <primitive object={scene} scale={1.5} />;
}

export default MessageIcon;
