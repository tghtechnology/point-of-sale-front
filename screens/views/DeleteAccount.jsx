import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import useUser from '../hooks/useUser';

export default function DeleteAccount() {
    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const {handleChangePassword} = useUser();

    // const handleDeleteAccount = (type) => {
    //     setDeleteType(type);
    //     setModalVisible(true);
    // };

    const handleDeleteAccount = async () => {
        const response = await handleChangePassword(localStorage.getItem('id'),password);
        if(response === true){
            alert("eliminado correctamente")
            setPassword('');
        }else{
            alert("problema")
        }

    }

    const handleContinue = () => {
        console.log(`Entered Password for ${deleteType}:`, password);
        // Aquí puedes implementar la lógica para eliminar la cuenta según el tipo
        setModalVisible(false);
    };

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
                        <View style={[styles.inputContainer, { borderBottomColor: isFocused ? 'blue' : 'gray' }]}>
                            <Text style={[styles.inputLabel, { top: isFocused || password ? -25 : 10 }]}>Contraseña</Text>
                            {/* input password */}
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
    },
    modalText: {
        fontSize: 18,
        marginBottom: 5,
    },
    subText: {
        fontSize: 14,
        marginBottom: 15,
        color: 'gray',
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 15,
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    inputLabel: {
        marginTop:20,
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
        color: 'black',
        fontSize: 16,
    },
});
