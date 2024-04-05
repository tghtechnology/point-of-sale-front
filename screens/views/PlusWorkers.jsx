import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Picker, Modal, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useWorker from '../hooks/useWorker';
import WorkerProvider from '../context/worker/WorkerProvider';



//Contante para Seleccionar Cargos
const cargosDisponibles = ['Administrador', 'Gerente', 'Cajero'];
//

export default function PlusWorkers() {
    const navigation = useNavigation();
    const { worker, handleEditWorker, handleDeleteworker, handleUpdateWorker} = useWorker()
    const [showModal, setShowModal] = useState(false);
    const [workers, setWorkers] = useState(worker)
    const [modal, setModal] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [selectedWorker, setselectedWorker] = useState({});
    const [cargo, setCargo] = useState(''); // Estado para el valor seleccionado del cargo en el formulario de edición

    const handleEdit = (worker) => {
        setselectedWorker(worker);
        setEditedData({
            ...worker,
            nombre: worker.nombre,
            correo: worker.correo,
            telefono: worker.telefono,
            cargo: worker.cargo,
        });
        setCargo(worker.cargo); // Establecer el valor inicial del cargo seleccionado del trabajador
        setShowModal(true);
        setModal(false);
    };

    //
    const handleCargoChange = (cargoSeleccionado) => {
        setCargo(cargoSeleccionado);
        handleChange('cargo', cargoSeleccionado);
    };
    //

    const handleChange = (name, value) => {
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await handleEditWorker(selectedWorker.id, editedData);
            console.log('Empleado editado exitosamente');
            await handleUpdateWorker(selectedWorker.id, editedData);
            setShowModal(false);
        } catch (error) {
            console.error('Error al editar el empleado:', error);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };


    const handleDelete = async (id) => {
        try {
            const success = await handleDeleteworker(id);
            if (success) {
                setWorkers(workers.filter(workers => workers.id !== id));
            }
            setModal(false);
        } catch (error) {
            console.error('Error al borrar al empleado:', error);
        }
    }

    const handleOptionsPress = (item) => {
        setselectedWorker(item);
        setModal(true);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={worker}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.clientData}>
                            <TouchableOpacity style={styles.optionsButton} onPress={() => handleOptionsPress(item)} >
                                <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.itemText}>Nombre: {item.nombre}</Text>
                            <Text style={styles.itemText}>Correo: {item.correo}</Text>
                            <Text style={styles.itemText}>Telefono: {item.telefono}</Text>
                            <Text style={styles.itemText}>Cargo: {item.cargo}</Text>
                            <View style={styles.container}>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ListEmptyComponent={() => (
                    <View style={styles.circle}>
                        <MaterialCommunityIcons name="account" size={100} color="#808080" />
                        <Text style={styles.text}>Aun no tiene empleados en esta tienda</Text>
                        <Text style={styles.text}>Para agregar un empleado pulse (+)</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Registrar Empleado")}>
                <MaterialCommunityIcons name="plus" size={24} color="white" />
            </TouchableOpacity>

            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCancel}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Empleado</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre"
                                value={editedData.nombre}
                                onChangeText={(text) => handleChange('nombre', text)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="email"
                                value={editedData.correo}
                                onChangeText={(text) => handleChange('correo', text)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Telefono</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="telefono"
                                value={editedData.telefono}
                                onChangeText={(text) => handleChange('telefono', text)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Cargo</Text>
                            <Picker
                                selectedValue={cargo}
                                onValueChange={handleCargoChange}
                                style={styles.input}>
                                {cargosDisponibles.map((cargo, index) => (
                                    <Picker.Item label={cargo} value={cargo} key={index} />
                                ))}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            <Modal visible={modal} animationType="slide" transparent onRequestClose={() => setModal(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleEdit(selectedWorker)}>
                            <Text style={styles.optionButtonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={() => handleDelete(selectedWorker.id)}>
                            <Text style={styles.optionButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModal(false)}>
                            <Text style={styles.optionButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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