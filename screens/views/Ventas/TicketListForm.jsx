import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTotal } from '../../Global State/TotalContext';
import useClient from '../../hooks/useClient';
import useDiscount from '../../hooks/useDiscount';
import useImpuesto from '../../hooks/useImpuesto';

const TicketListForm = () => {
    const navigation = useNavigation();
    const { client } = useClient();
    const { discounts } = useDiscount();
    const { listImpuesto } = useImpuesto();

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedTaxes, setSelectedTaxes] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);
    const { total, setTotal } = useTotal();
    const [taxValue, setTaxValue] = useState(0);

    const [selectedClient, setSelectedClient] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useState('');
    const [selectedImport, setSelectedImport] = useState('');
    const [clientType, setClientType] = useState(null);
    const [showClientPicker, setShowClientPicker] = useState(false);

    const fetchData = async () => {
        try {
            const item = await AsyncStorage.getItem('selectedItems');
            const discount = await AsyncStorage.getItem('selectedDiscounts');
            const tax = await AsyncStorage.getItem('selectedTaxes');
            const cli = await AsyncStorage.getItem('selectedClients');

            if (item !== null) setSelectedItems(JSON.parse(item));
            if (discount !== null) setSelectedDiscounts(JSON.parse(discount));
            if (tax !== null) setSelectedTaxes([JSON.parse(tax)]);
            if (cli !== null) setSelectedClients([JSON.parse(cli)]);
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        calculateTotal();
    }, [selectedItems, selectedDiscounts, selectedTaxes]);

    const calculateTotal = () => {
        const totalPrice = selectedItems.reduce((acc, item) => {
            const subtotal = item.precio * item.quantity;
            return acc + subtotal;
        }, 0);

        let discountedTotal = totalPrice;

        selectedDiscounts.forEach(discount => {
            if (discount.tipo_descuento === 'MONTO') {
                discountedTotal -= discount.valor;
            } else if (discount.tipo_descuento === 'PORCENTAJE') {
                discountedTotal -= discountedTotal * (discount.valor / 100);
            }
        });

        let totalWithTaxes = discountedTotal;
        let valor = 0;

        selectedTaxes.forEach(tax => {
            if (tax.tipo_impuesto === 'Anadido_al_precio') {
                valor = discountedTotal * (tax.tasa / 100);
                totalWithTaxes += valor;
                setTaxValue(valor);
            }
        });

        setTotal(totalWithTaxes);
    };

    const calculateSubtotalWithDiscount = (item) => {
        let subtotal = item.precio * item.quantity;
        return subtotal.toFixed(2);
    };

    const handleClientTypeChange = (type) => {
        if (clientType === type) {
            setClientType(null);
            setShowClientPicker(false);
        } else {
            setClientType(type);
            setShowClientPicker(type === 'clienteExistente');
        }
    };

    const handleDiscountChange = (itemValue) => {
        const selectedDiscount = discounts.find(discount => discount.id === itemValue);
        setSelectedDiscount(selectedDiscount);
        setSelectedDiscounts([selectedDiscount]);
    };

    const handleImportChange = (itemValue) => {
        const selectedImport = listImpuesto.find(impuesto => impuesto.id === itemValue);
        setSelectedImport(selectedImport);
        setSelectedTaxes([selectedImport]);
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <TouchableOpacity style={styles.cobrarButton}>
                    <View style={styles.totalTextContainer}>
                        <Icon name="cart" size={35} color="#517EF2" />
                        <Text style={styles.cobrarText}>Total</Text>
                        <Text style={styles.amountText}>S/ {total.toFixed(2)}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.itemList}>
                    {selectedItems.map(itm => (
                        <View key={itm.id} style={styles.item}>
                            <Text style={styles.itemText}>{itm.nombre} x{itm.quantity}</Text>
                            <Text style={styles.subtotalText}>Subtotal: S/ {calculateSubtotalWithDiscount(itm)}</Text>
                        </View>
                    ))}
                </View>

                {selectedDiscounts.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Descuentos:</Text>
                        {selectedDiscounts.map((discount, index) => (
                            <Text key={index} style={styles.sectionItem}>
                                {discount.tipo_descuento === 'MONTO' ? `${discount.nombre}: S/ ` : `${discount.nombre}: `}
                                {discount.tipo_descuento === 'PORCENTAJE' ? `${discount.valor}%` : discount.valor}
                            </Text>
                        ))}
                    </View>
                )}

                {selectedTaxes !== null && selectedTaxes.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Impuestos:</Text>
                        {selectedTaxes.map((tax, index) => (
                            <Text key={index} style={styles.sectionItem}>
                                {tax.nombre}: {tax.tasa}% {tax.tipo_impuesto === 'Anadido_al_precio' ? `(S/ ${taxValue.toFixed(2)})` : ''}
                            </Text>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.divider} />
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
                    onPress={() => navigation.navigate("Crear Cliente")}
                />
                <Text style={styles.radioText}>Cliente No Existente</Text>
            </View>
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
                    selectedValue={selectedDiscount ? selectedDiscount.id : ''}
                    style={styles.picker}
                    onValueChange={handleDiscountChange}
                >
                    <Picker.Item label="Seleccion Descuento:" value="" />
                    {discounts.map((discountItem) => (
                        <Picker.Item key={discountItem.id} label={discountItem.nombre} value={discountItem.id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedImport ? selectedImport.id : ''}
                    style={styles.picker}
                    onValueChange={handleImportChange}
                >
                    <Picker.Item label="Seleccion Importe:" value="" />
                    {listImpuesto.map((impuestoItem) => (
                        <Picker.Item key={impuestoItem.id} label={impuestoItem.nombre} value={impuestoItem.id} />
                    ))}
                </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SaleTicket', { selectedClient, selectedDiscount, selectedImport })}>
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF',
    },
    totalTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    cobrarButton: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 30,
        paddingHorizontal: 5,
        alignItems: 'center',
        borderRadius: 2,
        margin: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    },
    cobrarText: {
        color: '#666666',
        fontSize: 24,
        fontWeight: 'bold',
    },
    amountText: {
        color: '#517EF2',
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 15,
    },
    itemList: {
        marginTop: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 16,
        color: '#000000',
    },
    subtotalText: {
        fontSize: 16,
        color: '#666666',
        fontWeight: '500'
    },
    sectionContainer: {
        marginTop: 10,
        marginLeft: 25,
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    sectionItem: {
        fontSize: 14,
        color: '#666666',
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
