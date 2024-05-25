import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { useTotal } from '../../Global State/TotalContext';
import useSale from '../../hooks/useSale';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomAlert from '../../componentes/Alertas/CustomAlert';
import ErrorAlert from '../../componentes/Alertas/ErrorAlert';
import PaymentSelection from '../../componentes/Venta/PaymentSelection';
import useRecibos from "../../hooks/useRecibos";

const INITIAL_STATE = {
    detalles: '',
    descuentoId: '',
    impuestoId: '',
    clienteId: '',
    tipoPago: '',
    dineroRecibido: '',
    usuarioId: '',
};

const TicketSaleForm = () => {
    const [receivedAmount, setReceivedAmount] = useState('');
    const [change, setChange] = useState('');
    //const { listRecibo,setListRecibo } = useRecibos();
    const { total } = useTotal();
    const [data, setData] = useState(INITIAL_STATE);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedTaxes, setSelectedTaxes] = useState(null);
    const [selectedClients, setSelectedClients] = useState(null);
    const { handleCreateSale } = useSale();
    const [showAlert, setShowAlert] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);

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
              clienteId: selectedClients ? selectedClients.id : null,
              tipoPago: selectedPayment,
              dineroRecibido: parseFloat(receivedAmount)
          };
          console.log('Sale data:', data);

          const success = await handleCreateSale(data);
          if (success) {
              setShowAlert(true);
              //const newRecibo = success; 

              // Actualiza la lista de recibos con el nuevo recibo
              //setListRecibo(prevList => [...prevList, newRecibo]);
              clearAsyncStorage();
          } else {
              setErrorAlertVisible(true);
              throw new Error("La respuesta del servidor no contiene un impuesto válido.");
          }
      } catch (error) {
          console.error('Error completing sale:', error);
          setErrorAlertVisible(true);
      }
  };
    const handleAlertClose = () => {
        setShowAlert(false); 
        clearAsyncStorage();
        navigation.navigate('Home');
    };
    useEffect(() => {
        clearAsyncStorage();
      }, []);
    
      const clearAsyncStorage = async () => {
        try {
          await AsyncStorage.removeItem('selectedItems');
          await AsyncStorage.removeItem('selectedDiscounts');
          await AsyncStorage.removeItem('selectedClients');
          await AsyncStorage.removeItem('selectedTaxes');
          console.log('Datos de AsyncStorage eliminados al iniciar sesión');
        } catch (error) {
          console.error('Error al eliminar datos de AsyncStorage al iniciar sesión:', error);
        }
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

            <PaymentSelection selectedPayment={selectedPayment} onSelectPayment={handlePaymentSelection} />

            <TouchableOpacity style={styles.button} onPress={handleCompleteSale}>
                <Text style={styles.buttonText}>Completar Venta</Text>
            </TouchableOpacity>
            <CustomAlert isVisible={showAlert} onClose={handleAlertClose} />
        <ErrorAlert isVisible={errorAlertVisible} onClose={() => setErrorAlertVisible(false)}/>
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
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#0258FE',
        marginTop: 40,
    },
    input: {
        color: 'black',
        paddingHorizontal: 10,
        padding: 10,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#0258FE',
        padding: 15,
        alignItems: 'center',
        borderRadius: 0,
        marginTop: 200,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    circleLeft: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0258FE',
    },
    circleRight: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0258FE',
    },
    circleSelected: {
        backgroundColor: '#0258FE',
    },
    paymentText: {
        fontSize: 16,
    },
});
export default TicketSaleForm;