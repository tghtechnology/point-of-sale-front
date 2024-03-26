import React, { useState } from "react";
import useAuth from "../hooks/useAuth";


const LogoutButton = () => {
    const { logautAccess } = useAuth();
    const [credentials] = useState({
        token: localStorage.getItem("token") || "",
    });

    const handleLogout = async () => {
        try {
            const response = await logautAccess(credentials);
            if (response === true) {
                // Realizar cualquier acción adicional después de cerrar sesión
                console.log("Sesión cerrada exitosamente");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default LogoutButton;