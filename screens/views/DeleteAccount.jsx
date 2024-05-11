import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser';
import CustomAlert from '../componentes/CustomAlert';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeleteAccount(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [showAlertTemporary, setShowAlertTemporary] = useState(false);
    const [showAlertPermanent, setShowAlertPermanent] = useState(false);
    const [password, setPassword] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [deleteType, setDeleteType] = useState('');
    const { handleDeleteTemporary,handleDeletePermanent } = useUser();
    const navigation = useNavigation();
    

    const handleDeleteAccount = (type) => {
        setDeleteType(type);
        setModalVisible(true);
    };

    const handleContinue = async () => {
        console.log("Datos enviados al servidor: ",  {deleteType,password});
            
        if (deleteType === 'temporary') {
            const success = await handleDeleteTemporary(password);
            if (success) {
                navigation.navigate("Main")
                setShowAlertTemporary(true);
                console.log("La cuenta temporal se ha eliminado exitosamente."); 
            } else {
                alert("No se pudo eliminar la cuenta temporal. La contraseña es incorrecta o ha ocurrido un error.");
            }
        } // Cierra el bloque 'if (deleteType === 'temporary')'
    
        if (deleteType === 'permanent') {
            const success = await handleDeletePermanent(password);
            if (success) {
                navigation.navigate("Main")
                setShowAlertPermanent(true);
                console.log("La cuenta permanente se ha eliminado exitosamente.");
            } else {
                alert("No se pudo eliminar la cuenta permanente. La contraseña es incorrecta o ha ocurrido un error.");
            }
        } // Cierra el bloque 'if (deleteType === 'permanent')'
    
        setModalVisible(false);
        setPassword('');
    };

    return (
        <View>
            <TouchableOpacity onPress={() => props.navigation.navigate ("perfil")} style={styles.container}>
            <MaterialCommunityIcons name="account" size={24} color="#708090" />
                <Text style={styles.text}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate ("Contraseña")} style={styles.container}>
            <MaterialCommunityIcons name="lock-reset" size={24} color="#708090" />
                <Text style={styles.text}>Cambiar Contraseña</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container} onPress={() => handleDeleteAccount('permanent')}>
            <MaterialCommunityIcons name="account-remove-outline" size={24} color="#708090" />
                <Text style={styles.text}>Eliminar Cuenta Permanente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container} onPress={() => handleDeleteAccount('temporary')}>
            <MaterialCommunityIcons name="account-remove" size={24} color="#708090" />
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
                        <Text style={styles.subText}>Por favor introduzca su contraseña para continuar</Text>
                        <View style={[styles.inputContainer, { borderBottomColor: isFocused ? '#0258FE' : '#0258FE' }]}>
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
            <CustomAlert
                isVisible={showAlertTemporary}
                onClose={() => setShowAlertTemporary(false)}
            />

            <CustomAlert
                isVisible={showAlertPermanent}
                onClose={() => setShowAlertPermanent(false)}
            />
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
        paddingBottom: 5,
    },
    inputLabel: {
        marginTop:2,
        position: 'absolute',
        left: 5,
        color: 'blue',
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
        color: '#0258FE',
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
      },
      text: {
        marginLeft: 20,
      },
});

