import React, { FlatList } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';


const TicketListForm = () => {
    const [selectedItem, setSelectedItem] = useState([]); // Nuevo estado para almacenar la lista de artículos guardados
    const [selectedDiscounts, setSelectedDiscounts] = useState([]); // Nuevo estado para almacenar los descuentos seleccionados
    const getSubtotal = (item) => item.precio * item.quantity;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getSelectedItem = async () => {
            try {
                const item = await AsyncStorage.getItem('selectedItem');
                console.log("item", item)
                if (item !== null) {
                    setSelectedItem(JSON.parse(item));
                }
            } catch (error) {
                console.log('Error retrieving selected item:', error);
            }
        };

        const getSelectedDiscount = async () => {
            try {
                const discount = await AsyncStorage.getItem('selectedDiscount');
                if (discount !== null) {
                    setSelectedDiscounts(JSON.parse(discount));
                }
            } catch (error) {
                console.log('Error retrieving selected discount:', error);
            }
        };

        getSelectedItem();
        getSelectedDiscount();
    }, []); // Ejecutar solo una vez al cargar el componente

    useEffect(() => {
        const newTotal = selectedItem.reduce((total, itm) => {
            const precioConDescuento = itm.precio - (itm.precio * selectedDiscounts.reduce((total, discount) => total + (discount.valor / 100), 0));
            return total + (precioConDescuento * itm.quantity);
        }, 0);
        setTotal(newTotal);
    }, [selectedItem, selectedDiscounts]);

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
        <View>
            <View style={styles.itemList}>
                {selectedItem?.map(itm => (
                    <LinearGradient
                        key={itm.id}
                        colors={['#FFD700', '#FFA500']} // Colores del gradiente
                        style={styles.item}
                    >
                        <Text style={styles.itemText}>{itm.nombre}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceText}>Precio: S/ {itm.precio}</Text>
                            <Text style={styles.quantityText}>Cantidad: {itm.quantity}</Text>
                            <Text style={styles.subtotalText}>Subtotal: S/ {getSubtotal(itm).toFixed(2)}</Text>
                        </View>
                    </LinearGradient>
                ))}
            </View>

            <LinearGradient
                colors={['#87CEEB', '#4682B4']} // Dos colores diferentes para el fondo del total
                style={styles.totalContainer}
            >
                <Text style={[styles.totalText, { color: '#006400', marginTop: 1 }]}>Total: S/ {total.toFixed(2)}</Text>
                {selectedDiscounts.length > 0 && (
                    <Text style={[styles.totalText, { color: '#800080', marginTop: 3, fontWeight: 'bold' }]}>
                        {selectedDiscounts.map(discount => (
                            `Descuento: ${discount.tipo_descuento === 'MONTO' ? 'S/ ' : ''}${discount.valor}${discount.tipo_descuento === 'PORCENTAJE' ? '%' : ''}`
                        ))}
                    </Text>
                )}
                <Text style={[styles.totalText, { color: '#006400', marginTop: 1 }]}>
                    Total con descuento: S/ {applyDiscount(total, selectedDiscounts).toFixed(2)}
                </Text>
            </LinearGradient>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
        backgroundColor: 'red',
        padding: 25,
        alignItems: 'center',
        borderRadius: 2,
        margin: 15,
    },
    cobrarText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    amountText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
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
        padding: 15,
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