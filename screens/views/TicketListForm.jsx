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
import { useNavigation } from '@react-navigation/native';



const TicketListForm = () => {
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedTaxes, setSelectedTaxes] = useState([]); // New state for selected taxes
    const [selectedClients, setSelectedClients] = useState([]); // Estado para almacenar el cliente seleccionado
    const [total, setTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0); // Nuevo estado para almacenar el precio total sin descuento
    const navigation = useNavigation();

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


    const calculateSubtotalWithDiscount = (item) => {
        let subtotal = item.precio * item.quantity;
        let itemDiscount = 0;
    
        // Aplicar descuentos al subtotal del artículo
        selectedDiscounts.forEach(discount => {
            if (discount.tipo_descuento === 'MONTO') {
                // No hacer nada para descuentos de tipo "MONTO" ya que se aplican al total
            } else if (discount.tipo_descuento === 'PORCENTAJE') {
                // Aplicar descuentos de tipo "PORCENTAJE" al subtotal del artículo
                itemDiscount += subtotal * (discount.valor / 100);
            }
        });
    
        return (subtotal - itemDiscount).toFixed(2);
    };
    
    useEffect(() => {
        // Calcular el precio total sin descuento sumando los subtotales de los artículos
        const totalPrice = selectedItem.reduce((acc, item) => {
            const subtotal = calculateSubtotalWithDiscount(item);
            return acc + parseFloat(subtotal);
        }, 0);
        setTotalPrice(totalPrice);
    }, [selectedItem, selectedDiscounts]); // Ajusta los dependencias del efecto
    
    useEffect(() => {
        // Aplicar descuentos tipo "MONTO" al total
        let discountedTotal = totalPrice;
        selectedDiscounts.forEach(discount => {
            if (discount.tipo_descuento === 'MONTO') {
                discountedTotal -= discount.valor;
            }
        });
        setTotal(discountedTotal);
    }, [totalPrice, selectedDiscounts]); // Ajusta los dependencias del efecto
    //

    const showSaleTicket = () => {
        navigation.navigate('SaleTicket');
      };


    return (
        <ScrollView>
            <View>
                <TouchableOpacity style={styles.cobrarButton}>
                    <View style={styles.totalTextContainer}>
                        <Icon name="cart" size={35} color="#517EF2" />
                        <Text style={styles.cobrarText}>Total</Text>
                        <Text style={styles.amountText}>S/ {total.toFixed(2)}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.itemList}>
                    {selectedItem.map(itm => (
                        <View key={itm.id} style={styles.item}>
                            <View style={styles.leftContainer}>
                                {/* Icono de imagen */}
                                <Icon name="image" size={70} color="black" style={styles.icon} />
                            </View>

                            <View style={styles.rightContainer}>

                                {/* Nombre del artículo */}
                                <Text style={styles.itemText}>{itm.nombre}</Text>

                                <Text style={styles.quantityText}>Cantidad: {itm.quantity}</Text>

                                {/* Descuento */}
                                {selectedDiscounts.length > 0 && (
                                    <Text style={[styles.discountText]}>
                                        {selectedDiscounts.map(discount => (
                                            `Descuento: ${discount.tipo_descuento === 'MONTO' ? 'S/ ' : ''}${discount.valor}${discount.tipo_descuento === 'PORCENTAJE' ? '%' : ''}`
                                        ))}
                                    </Text>
                                )}

                                {/* Precio */}
                                <Text style={styles.priceText}>Precio: S/ {itm.precio}</Text>

                                {/* Subtotal */}
                                <Text style={styles.subtotalText}>Subtotal: S/ {calculateSubtotalWithDiscount(itm)}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={showSaleTicket} style={styles.cobrarButton}>Continuar</TouchableOpacity>
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
        paddingHorizontal: 10, // Ajusta el espacio horizontal dentro del contenedor
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
        fontSize: 14,
        fontWeight: 'bold',
    },
    total: {
        alignItems: 'flex-end',
        marginTop: 20,
    },
    icon: {
        marginRight: 10,
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
        paddingVertical: 30, // Ajusta la altura del botón aumentando el valor
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
        flexDirection: 'row', // Para alinear los elementos en línea recta
        alignItems: 'center', // Para alinear verticalmente los elementos
        padding: 10,
        marginBottom: 10,
    },
    leftContainer: {
        alignItems: 'flex-start', // Cambia a 'flex-start' para alinear los elementos a la izquierda
        flex: 1, // Mantiene el contenedor como flexible para ocupar todo el espacio disponible
        marginLeft: 0, // Ajusta el margen izquierdo a cero para que esté completamente a la izquierda
    },
    rightContainer: {
        flex: 2, // Cambia el factor de flexibilidad para que este contenedor ocupe más espacio
        marginLeft: 5, // Añade un margen izquierdo para separarlo del contenedor izquierdo
    },
    imageIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
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
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: -2,
    },
    discountText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 1, // Añade un margen arriba del descuento
        color: '#A6A0A0',
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 3, // Añade un margen arriba del precio
        color: '#4CAF50',
    },
    subtotalText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 3, // Añade un margen arriba del subtotal
        color: '#C30000',
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