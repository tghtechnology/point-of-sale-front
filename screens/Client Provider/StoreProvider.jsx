import React, { createContext, useContext, useReducer } from "react";
import storeReducer from "./storeReducer";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(storeReducer, {});

    const seleccionarProducto = (productId) => {
        dispatch({ type: 'SELECCIONAR_PRODUCTO', payload: { productId } });
    };

    const seleccionarDescuento = (discountId) => {
        dispatch({ type: 'SELECCIONAR_DESCUENTO', payload: { discountId } });
    };

    const seleccionarCliente = (clientId) => {
        dispatch({ type: 'SELECCIONAR_CLIENTE', payload: { clientId } });
    };

    const seleccionarImpuesto = (taxId) => {
        dispatch({ type: 'SELECCIONAR_IMPUESTO', payload: { taxId } });
    };

    return (
        <StoreContext.Provider value={{ store, seleccionarProducto, seleccionarDescuento, seleccionarCliente, seleccionarImpuesto }}>
            {children}
        </StoreContext.Provider>
    );
};

const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};

export { StoreProvider, useStore };