import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTotal } from '../Global State/TotalContext'; 
import ListVent from '../componentes/Venta/ListVent';

const TicketListForm = () => {
    const navigation = useNavigation();  

    const showSaleTicket = () => {
        navigation.navigate('SaleTicket');
    };
    return (
           <View>
            <ListVent></ListVent>
            <TouchableOpacity onPress={showSaleTicket} style={styles.button}>
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF',
    },
    button: {
        backgroundColor: '#517EF2',
        paddingVertical: 20,
        paddingHorizontal: 50,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 25,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TicketListForm;
