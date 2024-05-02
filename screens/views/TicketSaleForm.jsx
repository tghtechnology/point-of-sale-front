import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TicketSaleForm = (total) => {
    const [receivedAmount, setReceivedAmount] = useState('');
    const [change, setChange] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);


    useEffect(() => {
        if (receivedAmount && total) {
            const calculatedChange = parseFloat(receivedAmount) - parseFloat(total);
            setChange(calculatedChange.toFixed(2));
        }
    }, [receivedAmount, total]);

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
                    onChangeText={setReceivedAmount}
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
                <TouchableOpacity
                    style={[styles.circle, selectedPayment === 'Efectivo' && styles.circleSelected]}
                    onPress={() => handlePaymentSelection('Efectivo')}
                >
                    <Text style={styles.itemText}>Efectivo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemList}>
                <TouchableOpacity
                    style={[styles.circle, selectedPayment === 'Tarjeta' && styles.circleSelected]}
                    onPress={() => handlePaymentSelection('Tarjeta')}
                >
                    <Text style={styles.itemText}>Tarjeta</Text>
                </TouchableOpacity>
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
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: 'gray',
    },
    iconContainer: {
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 120,
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
    //Estilos para el Select
    itemList: {
        marginTop: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center', // Align items in a row
    },
    circle: {
        width: 20, // Adjust size of the circle if necessary
        height: 20,
        borderWidth: 2,
        borderColor: '#517EF2',
        backgroundColor: '#FFF',
        marginRight: 5, // Add some space between circle and text
        justifyContent: 'center', // Center the content inside the circle
        alignItems: 'center', // Center the content inside the circle
        borderRadius: 10, // Make the circle half the size of width and height to create a perfect circle
    },
    circleSelected: {
        backgroundColor: 'blue',
        borderColor: 'blue',
    },
    itemText: {
        fontSize: 14,
        marginLeft: 90
    },
    //
});

export default TicketSaleForm;