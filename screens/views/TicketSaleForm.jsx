import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { useTotal } from '../Global State/TotalContext';

const TicketSaleForm = () => {
    const [receivedAmount, setReceivedAmount] = useState('');
    const [change, setChange] = useState('');
    const { total } = useTotal();
    const [selectedPayment, setSelectedPayment] = useState(null);
    console.log("Valor de total:", total);

    const handleChangeReceivedAmount = (amount) => {
        setReceivedAmount(amount);
        const calculatedChange = parseFloat(amount) - parseFloat(total);
        setChange(calculatedChange.toFixed(2));
    };

    const handlePaymentSelection = (paymentType) => {
        setSelectedPayment(paymentType);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Monto"
                    value={receivedAmount}
                    onChangeText={handleChangeReceivedAmount}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    value={change}
                    editable={false}
                />
            </View>

            <View style={styles.paymentContainer}>
                <TouchableOpacity
                    style={[styles.circleLeft, selectedPayment === 'Efectivo' && styles.circleSelectedLeft]}
                    onPress={() => handlePaymentSelection('Efectivo')}
                />
                <Text style={styles.itemTextLeft}>Efectivo</Text>

                <TouchableOpacity
                    style={[styles.circleRight, selectedPayment === 'Tarjeta' && styles.circleSelectedRight]}
                    onPress={() => handlePaymentSelection('Tarjeta')}
                />
                <Text style={styles.itemTextRight}>Tarjeta</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText}>Completar Venta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    paymentContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Centra los elementos horizontalmente
        marginBottom: 10,
        marginTop: 30
    },
    inputContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#0258FE', // Color de la línea azul debajo del título
        marginBottom: 10,
    },
    input: {
        color: 'black',
        paddingHorizontal: 10,
        padding: 10,
        fontSize: 15
    },
    button: {
        backgroundColor: '#0258FE',
        padding: 10,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 95,
        width: '50%'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    itemList: {
        marginTop: 10,
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    circleLeft: {
        width: 23.59,
        height: 19.59,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: '#FFF',
        marginLeft: 70,
    },
    circleRight: {
        width: 23.59,
        height: 19.59,
        borderWidth: 2,
        borderColor: '#FF0000',
        backgroundColor: '#FFF',
        marginRight: 10,
    },
    circleSelectedLeft: {
        backgroundColor: '#00FF00', // Color del círculo seleccionado
        borderColor: '#00FF00', // Color del borde del círculo seleccionado
    },
    circleSelectedRight: {
        backgroundColor: '#FF0000', // Color del círculo seleccionado
        borderColor: '#FF0000', // Color del borde del círculo seleccionado
    },
    itemTextLeft: {
        flex: 1,
        fontSize: 14,
        marginLeft: 15
    },
    itemTextRight: {
        flex: 1,
        fontSize: 14,
    },
});

export default TicketSaleForm;
