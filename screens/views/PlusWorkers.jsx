import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch, Modal, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useWorker from '../hooks/useWorker';
import WorkerProvider from '../context/worker/WorkerProvider';




export default function PlusWorkers() {
    const navigation = useNavigation();
    const { worker } = useWorker()

    return (
        <View style={styles.container}>
            <FlatList
                data={worker}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.clientData}>
                            <Text style={styles.itemText}>{item.nombre}</Text>
                            <Text style={styles.itemText}>{item.correo}</Text>
                            <Text style={styles.itemText}>{item.telefono}</Text>
                            <Text style={styles.itemText}>{item.cargo}</Text>
                            <View style={styles.container}>
                            </View>
                        </View>
                    </View>
                )}
            />
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ListEmptyComponent={() => (
            <View style={styles.circle}>
                <MaterialCommunityIcons name="account" size={100} color="#808080" />
                <Text style={styles.text}>Aun no tiene empleados en esta tienda</Text>
                <Text style={styles.text}>Para agregar un empleado pulse (+)</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Registrar Empleado")}>
                <MaterialCommunityIcons name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    circle: {
        width: 170,
        height: 170,
        borderRadius: 170,
        backgroundColor: '#E7E7E7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 5,
        fontSize: 16,
        color: '#808080',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ff0000',
        borderRadius: 20,
        padding: 10,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    itemContainer: {
        marginBottom: 10,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        flexDirection: 'row', // Para alinear elementos horizontalmente
        alignItems: 'center', // Para alinear elementos verticalmente
    },
    clientData: {
        flex: 1, // Para que ocupe el espacio restante
    },
    itemText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ff0000', // Color del botón
        borderRadius: 20,
        padding: 10,
    },
    descButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: 'blue', // Color del botón
        borderRadius: 20,
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    button: {
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'green',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    editButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    optionButton: {
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: '#007bff', // Color del botón de opciones
    },
    optionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    cancelButton: {
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: 'gray', // Color del botón de cancelar
    },
    optionsButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});