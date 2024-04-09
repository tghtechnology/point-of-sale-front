import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function RecibosScreen() {
    return (
        <View style={styles.container}>
            <MaterialIcons name="search" size={24} color="black" />
            <TextInput style={styles.input} placeholder="Buscar" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
    },
});
