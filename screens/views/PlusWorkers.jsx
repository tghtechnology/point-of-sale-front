import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useWorker from '../hooks/useWorker';
import WorkerProvider from '../context/worker/WorkerProvider';
import CustomAlert from "../componentes/Alertas/CustomAlert";
import ErrorAlert from "../componentes/Alertas/ErrorAlert";


//Contante para Seleccionar Cargos
const PlusWorkers = (props) => {
    const navigation = useNavigation();
    const { worker,setWorker, handleDeleteworker } = useWorker()
    const [modal, setModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedWorker, setselectedWorker] = useState(null);
    const [deletedWorkerId, setDeletedWorkerId] = useState(null); // Estado para el valor seleccionado del cargo en el formulario de edición
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);

    const handleEdit = () => {
        navigation.navigate('Editar empleado', { work: selectedWorker });
        setModal(false);
    };
    

    const handleDelete = async (id) => {
        try {
            await handleDeleteworker(id);
            setShowAlert(true);
            setDeletedWorkerId(id);
            setModal(false);
        } catch (error) {
            setErrorAlertVisible(true);
            console.error('Error al borrar al empleado:', error);
        }
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
        setDeletedWorkerId(null);
    };
    
    useEffect(() => {
      if (deletedWorkerId !== null) {
          // Actualiza la lista de clientes excluyendo al cliente eliminado
          setWorker(worker.filter(worker => worker.id !== deletedWorkerId));
      }
    }, [deletedWorkerId]);


    const handleOptionsPress = (item) => {
        setselectedWorker(item);
        console.log("Selected worker:", item);
        setModal(true);
    };

    return (
        <View style={styles.container}>
      <FlatList
        data={worker}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.phone}>{item.telefono}</Text>
            <Text style={styles.role}>{item.cargo}</Text>
            <TouchableOpacity style={styles.optionsButton} onPress={() => handleOptionsPress(item)}>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item && item.id ? item.id.toString() : ''}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="account" size={100} color="#808080" />
            <Text style={styles.emptyText}>Aún no hay empleados</Text>
            <Text style={styles.emptyText}>Para agregar, pulse el botón (+)</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Registrar Empleado")}>
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={modal} animationType="slide" transparent onRequestClose={() => setModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.optionButton} onPress={handleEdit}>
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

      <CustomAlert isVisible={showAlert} onClose={() => setShowAlert(false)}/>
      <ErrorAlert isVisible={errorAlertVisible} onClose={() => setErrorAlertVisible(false)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    padding: 16,
    marginVertical: 10,
    position: 'relative',
  },
  name: {
    fontSize: 20,
    color: '#517EF2',
    fontWeight: '700',
  },
  email: {
    fontSize: 15,
    color: '#717171',
  },
  phone: {
    fontSize: 15,
    color: '#717171',
  },
  role: {
    fontSize: 15,
    color: '#717171',
    fontWeight: '700',
  },
  optionsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0258FE',
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
  optionButton: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007bff', // Color del botón de opciones
    alignItems: 'center',
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
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  emptyText: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
  },
});

export default PlusWorkers