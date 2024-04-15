import React, {FlatList } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import TicketFormHome from './TicketFormHome';

const TicketListForm = () => {
    const [savedItems, setSavedItems] = useState([]); // Nuevo estado para almacenar la lista de artículos guardados

    useEffect(() => {
        // Recuperar la lista de artículos guardados al cargar el componente
        const fetchSavedItems = async () => {
            try {
                const savedItemsJSON = await AsyncStorage.getItem('savedItems');
                if (savedItemsJSON !== null) {
                    setSavedItems(JSON.parse(savedItemsJSON));
                }
            } catch (error) {
                console.error('Error fetching saved items from AsyncStorage:', error);
            }
        };

        fetchSavedItems();
    }, []); // Ejecutar solo una vez al cargar el componente


    return (
        <View style={styles.container}>
            {/* Mostrar el nombre y precio del artículo guardado en otro formulario */}
            {savedItems.map((savedItem, index) => (
                <View key={index} style={styles.item}>
                    <TicketFormHome item={savedItem} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
        padding: 10,
        alignItems: 'center',
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
    },
    priceText: {
        color: '#4CAF50',
        fontWeight: 'bold',
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