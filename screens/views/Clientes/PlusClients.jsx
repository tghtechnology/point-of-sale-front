import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Modal,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useClient from '../../hooks/useClient';
import ClientProvider from '../../context/cliente/ClientProvider';
import CustomAlert from '../../componentes/Alertas/CustomAlert';
import ErrorAlert from '../../componentes/Alertas/ErrorAlert';

const PlusClients = (props) => {
    const navigation = useNavigation();
    const {client,setClient, handleDeleteClient} = useClient()
    const [showAlert, setShowAlert] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [deletedClientId, setDeletedClientId] = useState(null);
    

    const handleEdit = () => {
      navigation.navigate('Editar Cliente', { client: selectedClient });
      setModal(false);
    };

    const handleDelete = async (id) => {
      try {
          await handleDeleteClient(id);
          setShowAlert(true);
          setDeletedClientId(id);
          setModal(false);
      } catch (error) {
          setErrorAlertVisible(true);
          console.error('Error al borrar al cliente:', error);
      }
  };
    
  const handleCloseAlert = () => {
    setShowAlert(false);
    setDeletedClientId(null);
};

useEffect(() => {
  if (deletedClientId !== null) {
      // Actualiza la lista de clientes excluyendo al cliente eliminado
      setClient(client.filter(client => client.id !== deletedClientId));
  }
}, [deletedClientId]);

    const handleOptionsPress = (item) => {
      setSelectedClient(item);
      setModal(true);
    };
  return (
   <View style={styles.container}>
      <FlatList
        data={client}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.optionsButton} onPress={() => handleOptionsPress(item)}>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </TouchableOpacity> 
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.phone}>{item.telefono}</Text>
            <Text style={styles.pais}>{item.pais}</Text>
            <View style={styles.container}>
            </View>
    </View>
    )}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={{ paddingHorizontal: 16 }}
    ListEmptyComponent={() => (
    <View style={styles.emptyContainer}>
      <Icon name='frown-o' size={70} color="gray" />
        <Text style={styles.emptyText}>No hay clientes.</Text>
        <Text style={styles.emptyText}>Pulse (+) para agregar un nuevo cliente.</Text>
    </View>
        )}
        />
      <TouchableOpacity style={styles.addButton} onPress= {() => props.navigation.navigate("Crear Cliente")}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
       </TouchableOpacity>
       <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Cliente Eliminado"
        message="El cliente se ha eliminado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle" // Puedes cambiar el icono según lo desees
        />
      <Modal visible={modal} animationType="slide" transparent onRequestClose={() => setModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.optionButton} onPress={handleEdit }>
              <Text style={styles.optionButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleDelete(selectedClient.id)}>
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
  )
}

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
  pais: {
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
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#007bff', 
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
    marginTop:5,
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
  })

export default PlusClients