import React, { useState, useEffect } from 'react';
import {createImpuesto} from "../../services/ImpuestoService"
import ImpuestoContext from "./ImpuestoContext";


const ImpuestoProvider = ({children}) => {
    const handleCreateImp = async (newImpuesto) => {
        const {nombre, tasa, tipo_impuesto} = newImpuesto; 
        try {
            const { status } = await createImpuesto({nombre, tasa, tipo_impuesto}); 
            if(status === 200 || status === 201){
            return true;
            } else {
            return false;
            }
        } catch (error) {
            console.error("Error creating impuesto:", error);
            return false; 
        }
    }
    return (
        <ImpuestoContext.Provider value={{ handleCreateImp }}>
            {children}
        </ImpuestoContext.Provider>
    )
    }

export default ImpuestoProvider;
