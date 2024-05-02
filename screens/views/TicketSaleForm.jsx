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
                <Text style={styles.label}>Ingresa Monto Recibido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Monto"
                    value={receivedAmount}
                    onChangeText={handleChangeReceivedAmount}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Vuelto</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    value={change}
                    editable={false}
                />
            </View>

            <View style={styles.itemList}>
                <View style={styles.item}>
                    <TouchableOpacity
                        style={[styles.circle, selectedPayment === 'Efectivo' && styles.circleSelected]}
                        onPress={() => handlePaymentSelection('Efectivo')}
                    />
                    <Text style={styles.itemText}>Efectivo</Text>
                </View>
            </View>

            <View style={styles.itemList}>
                <View style={styles.item}>
                    <TouchableOpacity
                        style={[styles.circle, selectedPayment === 'Tarjeta' && styles.circleSelected]}
                        onPress={() => handlePaymentSelection('Tarjeta')}
                    />
                    <Text style={styles.itemText}>Tarjeta</Text>
                </View>
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
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 10,
    },
    input: {
        color: 'black',
        paddingHorizontal: 10,
        padding: 10,
        fontSize: 15
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 20,
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
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
    circle: {
        width: 23.59,
        height: 19.59,
        borderWidth: 2,
        borderColor: '#517EF2',
        backgroundColor: '#FFF',
        marginRight: 10,
    },
    circleSelected: {
        backgroundColor: 'blue', // Color del círculo seleccionado
        borderColor: 'blue', // Color del borde del círculo seleccionado
      },
    itemText: {
        flex: 1,
        fontSize: 14,
    },
});

export default TicketSaleForm;
