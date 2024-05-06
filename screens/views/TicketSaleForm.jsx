import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TouchableOpacity, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useTotal } from '../Global State/TotalContext';
import useSale from '../hooks/useSale';

const INITIAL_STATE = {
    detalles:'',
    descuentoId: '',
    impuestoId:'',
    clienteId: '',
    tipoPago: '',
    dineroRecibido: '',
    usuarioId: '',
}
const TicketSaleForm = () => {
    const [receivedAmount, setReceivedAmount] = useState('');
    const [change, setChange] = useState('');
    const { total } = useTotal();
    const [data, setData] = useState(INITIAL_STATE);
    const [selectedPayment, setSelectedPayment] = useState(null);
    console.log("Valor de total:", total);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedTaxes, setSelectedTaxes] = useState(null);
    const [selectedClients, setSelectedClients] = useState(null);
    const { handleCreateSale } = useSale();

    useEffect(() => {
        const fetchDataFromAsyncStorage = async () => {
          try {
            const storedItems = await AsyncStorage.getItem('selectedItems');
            const storedDiscounts = await AsyncStorage.getItem('selectedDiscounts');
            const storedClient = await AsyncStorage.getItem('selectedClients');
            const storedTaxes = await AsyncStorage.getItem('selectedTaxes');
      
            if (storedItems !== null) {
              setSelectedItems(JSON.parse(storedItems));
            }
            if (storedDiscounts !== null) {
              setSelectedDiscounts(JSON.parse(storedDiscounts));
            }
            if (storedClient !== null) {
              setSelectedClients(JSON.parse(storedClient));
            }
            if (storedTaxes !== null) {
              setSelectedTaxes(JSON.parse(storedTaxes));
            }
          } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error);
          }
        };
      
        fetchDataFromAsyncStorage();
      }, []);
      
    const handleChangeReceivedAmount = (amount) => {
        setReceivedAmount(amount);
        const calculatedChange = parseFloat(amount) - parseFloat(total);
        setChange(calculatedChange.toFixed(2));
    };

    const handlePaymentSelection = (paymentType) => {
        setSelectedPayment(paymentType);
    };
    const handleCompleteSale = async () => {
        try {
            const data = {
                detalles: selectedItems.map(item => ({ cantidad: item.quantity, articuloId: item.id })),
                impuestoId: selectedTaxes ? selectedTaxes.id : null,
                descuentoId: selectedDiscounts.length > 0 ? selectedDiscounts[0].id : null,
                usuarioId: 1,
                clienteId: selectedClients ? selectedClients.id: null,
                tipoPago: selectedPayment,
                dineroRecibido: parseFloat(receivedAmount)
              };
              console.log('Sale data:', data);

            const newSale = await handleCreateSale(data);
            if (success) {
                Alert.alert("Venta completada correctamente");
            } else {
                Alert.alert("Error al completar la venta");
            }
        } catch (error) {
            console.error("Error al completar la venta:", error);
            Alert.alert("Error al completar la venta");
        }
    }

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

            <TouchableOpacity style={styles.button} onPress={handleCompleteSale}>
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
        backgroundColor: '#00FF00', 
        borderColor: '#00FF00', 
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