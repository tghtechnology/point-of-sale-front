import React, { FlatList } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';



const TicketListForm = () => {
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedTaxes, setSelectedTaxes] = useState([]); // New state for selected taxes
    const [selectedClients, setSelectedClients] = useState([]); // Estado para almacenar el cliente seleccionado
    const [total, setTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0); // Nuevo estado para almacenar el precio total sin descuento

    useEffect(() => {
        const fetchData = async () => {
            try {
                const item = await AsyncStorage.getItem('selectedItem');
                const discount = await AsyncStorage.getItem('selectedDiscount');
                const tax = await AsyncStorage.getItem('selectedTax');
                const cli = await AsyncStorage.getItem('selectedClient')

                if (item !== null) {
                    setSelectedItem(JSON.parse(item));
                }

                if (discount !== null) {
                    setSelectedDiscounts(JSON.parse(discount));
                }

                if (tax !== null) {
                    setSelectedTaxes(JSON.parse(tax));
                }

                if (cli !== null) {
                    setSelectedClients(JSON.parse(cli))
                }

            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        console.log('Selected clients:', selectedClients); // Log the selected clients to the console
        console.log('Selected Tax:', selectedTaxes); // Log the selected clients to the console
        const totalPrice = selectedItem.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
        setTotalPrice(totalPrice);
    }, [selectedItem]);

    useEffect(() => {
        const totalDiscountedPrice = applyDiscount(totalPrice, selectedDiscounts);
        setTotal(totalDiscountedPrice);
    }, [totalPrice, selectedDiscounts]);


    const applyDiscount = (total, discounts) => {
        return total - discounts.reduce((acc, discount) => {
            if (discount.tipo_descuento === 'MONTO') {
                return acc + discount.valor;
            } else if (discount.tipo_descuento === 'PORCENTAJE') {
                return acc + (total * (discount.valor / 100));
            }
            return acc;
        }, 0);
    };

    return (
        <ScrollView>
            <View>
                <TouchableOpacity style={styles.cobrarButton}>
                    <View style={styles.totalTextContainer}>
                        <Icon name="cart" size={35} color="#517EF2" />
                        <Text style={styles.cobrarText}>Total</Text>
                        <Text style={styles.amountText}>S/ {totalPrice.toFixed(2)}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.itemList}>
                    {selectedItem.map(itm => (
                        <LinearGradient
                            key={itm.id}
                            colors={['#FFD700', '#FFA500']}
                            style={styles.item}
                        >
                            <View style={styles.itemTextContainer}>
                                <Text style={styles.itemText}>{itm.nombre}</Text>
                                <Text style={styles.quantityText}>Cantidad: {itm.quantity}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceText}>Precio: S/ {itm.precio}</Text>
                                <Text style={styles.subtotalText}>Subtotal: S/ {(itm.precio * itm.quantity).toFixed(2)}</Text>
                            </View>
                        </LinearGradient>
                    ))}
                </View>

                <LinearGradient
                    colors={['#87CEEB', '#4682B4']}
                    style={styles.totalContainer}
                >
                    <Text style={[styles.totalText, { color: '#006400', marginTop: 1 }]}>Total: S/ {totalPrice.toFixed(2)}</Text>

                    {selectedTaxes.length > 0 && (
                        <Text style={[styles.totalText, { color: '#006400', marginTop: 1 }]}>
                            Impuestos:
                            {selectedTaxes.map((impuesto, index) => (
                                <Text key={index} style={{ marginLeft: 5 }}>
                                    {index > 0 && ','} {impuesto.tasa}%
                                </Text>
                            ))}
                        </Text>
                    )}

                    {selectedClients.length > 0 && (
                        <Text style={[styles.totalText, { color: '#006400', marginTop: 2 }]}>
                            Cliente:
                            {selectedClients.map((cliente, index) => (
                                <Text key={index} style={{ marginLeft: 5 }}>
                                    {index > 0 && ','} {cliente.nombre}
                                </Text>
                            ))}
                        </Text>
                    )}
                    {selectedDiscounts.length > 0 && (
                        <Text style={[styles.totalText, { color: '#800080', marginTop: 3, fontWeight: 'bold' }]}>
                            {selectedDiscounts.map(discount => (
                                `Descuento: ${discount.tipo_descuento === 'MONTO' ? 'S/ ' : ''}${discount.valor}${discount.tipo_descuento === 'PORCENTAJE' ? '%' : ''}`
                            ))}
                        </Text>
                    )}
                    <Text style={[styles.totalText, { color: '#006400', marginTop: 1 }]}>
                        Total con descuento: S/ {total.toFixed(2)}
                    </Text>
                </LinearGradient>
            </View>
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
        // Ajusta el espacio horizontal entre los elementos
        justifyContent: 'space-between', // Esto distribuirá los elementos a lo largo del contenedor
        paddingHorizontal: 30, // Ajusta el espacio horizontal dentro del contenedor
    },
    itemTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    totalContainer: {
        backgroundColor: 'transparent', // Hacer el fondo transparente para que el gradiente sea visible
        paddingVertical: 3, // Reducir el espacio vertical
        paddingHorizontal: 12, // Reducir el espacio horizontal
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    priceContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginLeft: 20,
    },
    quantityText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    total: {
        alignItems: 'flex-end',
        marginTop: 20,
    },
    totalText: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        textAlign: 'right',
    },
    cobrarButton: {
        backgroundColor: '#F5F5F5',
        padding: 25,
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
        marginHorizontal: 15, // Ajusta el espacio horizontal entre los elementos hijos
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        marginBottom: 10,
    },
    picker: {
        flex: 1,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
    },
    itemList: {
        marginTop: 10,
    },
    item: {
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
    },
    magnifies: {
        border: 1,
        marginRight: 10,
        padding: 15,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        marginRight: 10,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    priceText: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtotalText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        // Define the rest of your footer styles here
    },
});
export default TicketListForm