import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTotal } from '../../Global State/TotalContext'; 

const ListVent = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedTaxes, setSelectedTaxes] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);
    const { total, setTotal } = useTotal();
    const [taxValue, setTaxValue] = useState(0);
    const navigation = useNavigation();

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
            const subtotal = calculateSubtotalWithDiscount(item);
            return acc + parseFloat(subtotal);
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
        let itemDiscount = 0;

        selectedDiscounts.forEach(discount => {
            if (discount.tipo_descuento === 'PORCENTAJE') {
                itemDiscount += subtotal * (discount.valor / 100);
            }
        });
        return (subtotal - itemDiscount).toFixed(2);
    };

    return (
        <ScrollView container={styles.container}>
            {/* Sección del total */}
            <TouchableOpacity style={styles.cobrarButton}>
                <View style={styles.totalTextContainer}>
                    <Icon name="cart" size={35} color="#517EF2" />
                    <Text style={styles.cobrarText}>Total</Text>
                    <Text style={styles.amountText}>S/ {total.toFixed(2)}</Text>
                </View>
            </TouchableOpacity>

            {/* Sección de artículos */}
            <View style={styles.itemList}>
                {selectedItems.map(itm => (
                   <View key={itm.id} style={styles.item}>
                     <Text style={styles.itemText}>{itm.nombre} x{itm.quantity}</Text>
                     <Text style={styles.subtotalText}> Subtotal: S/ {calculateSubtotalWithDiscount(itm)}</Text>
                 </View>                
                ))}
            </View>

            {/* Sección de descuentos */}
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

            {/* Sección de impuestos */}
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

            {/* Sección de clientes */}
            {selectedClients !== null && selectedClients.length > 0 && (
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Cliente:</Text>
                    {selectedClients.map((client, index) => (
                        <Text key={index} style={styles.sectionItem}>{client.nombre}</Text>
                    ))}
                </View> 
            )}
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
        fontWeight:'500'
    },
    sectionContainer: {
        marginTop: 10,
        marginLeft:25,
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
});

export default ListVent;
