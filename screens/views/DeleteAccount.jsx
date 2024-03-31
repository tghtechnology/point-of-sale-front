import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import useAuth from '../hooks/useAuth';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeleteAccount() {
    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const { handleDeleteTemporary } = useAuth();

    const handleDeleteAccount = (type) => {
        setDeleteType(type);
        setModalVisible(true);
    };

    const handleContinue = async () => {
        
        if (deleteType === 'temporary') {
            const success = await handleDeleteTemporary(password);
            if (success) {
                
                console.log("La cuenta temporal se ha eliminado exitosamente.");
            } else {
                alert("No se pudo eliminar la cuenta temporal. La contraseña es incorrecta o ha ocurrido un error.");
            }
        }
        setModalVisible(false);
        setPassword('');
    }

    return (
        <View>
            <TouchableOpacity onPress={() => handleDeleteAccount('permanent')}>
                <Text style={styles.text}>Eliminar Cuenta Permanente</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteAccount('temporary')}>
                <Text style={styles.text}>Eliminar Cuenta Temporal</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Introduzca su contraseña</Text>
                        <Text style={styles.subText}>Por temas de seguridad, por favor introduzca su contraseña para continuar</Text>
                        <View style={[styles.inputContainer, { borderBottomColor: isFocused ? 'red' : 'red' }]}>
                            <Text style={[styles.inputLabel, { top: isFocused || password ? -25 : 10 }]}>Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                value={password}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleContinue}>
                                <Text style={styles.buttonText}>Continuar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        margin: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        marginBottom: 20,
        color: 'gray',
        textAlign: 'center',
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 15,
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    inputLabel: {
        marginTop:2,
        position: 'absolute',
        left: 5,
        color: 'gray',
    },
    input: {
        padding: 5,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',  
        marginHorizontal: 40, 
        marginTop: 15,
        
    },
    buttonText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold'
    },
});
