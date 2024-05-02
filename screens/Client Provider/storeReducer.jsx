import React, { useReducer } from 'react';

const storeReducer = (state, action) => {
    switch (action.type) {
        case 'SELECCIONAR_PRODUCTO':
            return { ...state, selectedProductId: action.payload.productId };
        case 'SELECCIONAR_DESCUENTO':
            return { ...state, selectedDiscountId: action.payload.discountId };
        case 'SELECCIONAR_CLIENTE':
            return { ...state, selectedClientId: action.payload.clientId };
        case 'SELECCIONAR_IMPUESTO':
            return { ...state, selectedTaxId: action.payload.taxId };
        default:
            return state;
    }
};

export const TicketFormStoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(storeReducer, {});

    return (
        <TicketFormStoreContext.Provider value={{ state, dispatch }}>
            {children}
        </TicketFormStoreContext.Provider>
    );
};