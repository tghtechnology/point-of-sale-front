import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TicketSaleForm = (total) => {
    const [receivedAmount, setReceivedAmount] = useState('');
    const [change, setChange] = useState('');

    useEffect(() => {
        if (receivedAmount && total) {
            const calculatedChange = parseFloat(receivedAmount) - parseFloat(total);
            setChange(calculatedChange.toFixed(2));
        }
    }, [receivedAmount, total]);

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

      <TouchableOpacity style={styles.button} onPress={() => {}}>
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
});

export default TicketSaleForm;