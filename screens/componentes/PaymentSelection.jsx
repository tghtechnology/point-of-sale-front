import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PaymentSelection = ({ selectedPayment, onSelectPayment }) => {
    const paymentOptions = [
        { type: 'Efectivo', label: 'Efectivo', icon: 'cash' },
        { type: 'Tarjeta', label: 'Tarjeta', icon: 'credit-card' },
    ];

    return (
        <View style={styles.container}>
            {paymentOptions.map(option => (
                <TouchableOpacity
                    key={option.type}
                    style={[styles.paymentButton, selectedPayment === option.type && styles.selectedPaymentButton]}
                    onPress={() => onSelectPayment(option.type)}
                >
                    <MaterialCommunityIcons
                        name={option.icon}
                        size={24}
                        color={selectedPayment === option.type ? '#FFF' : '#666666'}
                    />
                    <Text style={[styles.paymentButtonText, selectedPayment === option.type && styles.selectedPaymentButtonText]}>
                        {option.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 150,
    },
    paymentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#517EF2',
        backgroundColor: '#FFF',
        marginBottom: 10,
    },
    selectedPaymentButton: {
        backgroundColor: '#517EF2',
    },
    paymentButtonText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666666',
    },
    selectedPaymentButtonText: {
        color: '#FFF',
    },
});

export default PaymentSelection;
