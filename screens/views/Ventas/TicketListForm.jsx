import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useTotal } from '../../Global State/TotalContext'; 
import useClient from '../../hooks/useClient';
import useDiscount from '../../hooks/useDiscount';
import useImpuesto from'../../hooks/useImpuesto'
import ListVent from '../../componentes/Venta/ListVent';

const TicketListForm = (props) => {
    const navigation = useNavigation();
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [selectedImport, setSelectedImport] = useState('');
    const [clientType, setClientType] = useState(null);
    const [showClientPicker, setShowClientPicker] = useState(false); // Nuevo estado para controlar la visibilidad del Picker
    const {client} = useClient();
    const {discounts} = useDiscount();
    const {listImpuesto} = useImpuesto();

    const handleClientTypeChange = (type) => {
        if (clientType === type) {
            // Si el tipo de cliente ya está seleccionado, deseleccionarlo
            setClientType(null);
            setShowClientPicker(false);
        } else {
            setClientType(type);
            setShowClientPicker(type === 'clienteExistente');
        }
    };

    const showSaleTicket = () => {
        navigation.navigate('SaleTicket',{
            selectedClient,
            selectedDiscount,
            selectedImport
        });
    };

    return (
        <View style={styles.container}>
            <ListVent />
            <View style={styles.divider}/>
            <View style={styles.radioButtonContainer}>
                <RadioButton
                    status={clientType === 'clienteExistente' ? 'checked' : 'unchecked'}
                    onPress={() => handleClientTypeChange('clienteExistente')}
                />
                <Text style={styles.radioText}>Cliente Existente</Text>
            </View>
            <View style={styles.radioButtonContainer}>
                <RadioButton
                    value="clienteNoExistente"
                    status={clientType === 'clienteNoExistente' ? 'checked' : 'unchecked'}
                    onPress= {() => props.navigation.navigate("Crear Cliente")}
                />
                <Text style={styles.radioText}>Cliente No Existente</Text>
            </View>
            {/* Picker de selección de cliente */}
            {showClientPicker && clientType === 'clienteExistente' && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedClient}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setSelectedClient(itemValue)}
                    >
                        <Picker.Item label="Seleccione Cliente:" value="" />
                        {client && client.map((clientItem) => (
                            <Picker.Item key={clientItem.id} label={clientItem.nombre} value={clientItem.id} />
                        ))}
                    </Picker>
                </View>
            )}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedDiscount}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setSelectedDiscount(itemValue)}
                >
                    <Picker.Item label="Seleccion Descuento:" value="" />
                    {discounts.map((discountItem) => (
                        <Picker.Item key={discountItem.id} label={discountItem.nombre && discountItem.valor} value={discountItem.id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedImport}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setSelectedImport(itemValue)}
                >
                    <Picker.Item label="Seleccion Importe:" value="" />
                    {listImpuesto.map((impuestoItem) => (
                        <Picker.Item key={impuestoItem.id} label={impuestoItem.nombre} value={impuestoItem.id} />
                    ))}
                </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={showSaleTicket}>
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '3%',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '2%',
    },
    picker: {
        borderRadius: 8,
        color: '#517EF2',
        padding: '2%',
        fontSize: 16,
        marginBottom: '5%',
        width: '80%',
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#D0D0D0',
        marginVertical: '3%',
    },
    button: {
        width: '80%',
        padding: '3%',
        backgroundColor: '#0258FE',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        left: '10%',
        marginBottom: '5%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
    },
    radioText: {
        fontSize: 16,
        color: '#517EF2',
        fontWeight: '700',
    },
});

export default TicketListForm;