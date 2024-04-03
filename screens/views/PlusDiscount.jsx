import React,{useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Switch,Modal,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useDiscount from '../hooks/useDiscount';
import DiscountProvider from '../context/discount/DiscountProvider';
import CustomAlert from '../componentes/CustomAlert';

const PlusDiscount = (props) => {
    const navigation = useNavigation();
    const {discounts,setDiscounts,toggleDiscountStatus,handleEditDiscount,handleUpdateDiscount} = useDiscount();
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [modal, setModal] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [selectedDiscount, setSelectedDiscount] = useState({});

    const handleEdit = (discount) => {
        setSelectedDiscount(discount);
        setEditedData({
          ...discount,
          nombre: discount.nombre,
          tipo_descuento: discount.tipo_descuento,
          valor: discount.valor,
        });
        setShowModal(true);
        setModal(false);
      };

      const handleChange = (name, value) => {
        setEditedData({
          ...editedData,
          [name]: value,
        });
      };

    const handleSubmit = async () => {
    try {
      await handleEditDiscount(selectedDiscount.id, editedData);
      await handleUpdateDiscount(selectedDiscount.id, editedData);
      setShowAlert(true);
      setShowModal(false);
    } catch (error) {
      console.error('Error al editar el descuento:', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleToggleStatus = async (id, currentStatus) => {
        try {
          // Invierte el estado actual del descuento
          const newStatus = !currentStatus;
          await toggleDiscountStatus(id, newStatus);
          const updatedDiscounts = discounts.map(discount => {
            if (discount.id === id) {
              return { ...discount, estado: newStatus };
            }
            return discount;
          });
          // Actualiza la lista de descuentos
          setDiscounts(updatedDiscounts);
        } catch (error) {
          setError('Error al actualizar el estado del descuento');
        }
  };

  const handleOptionsPress = (item) => {
    setSelectedDiscount(item);
    setModal(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={discounts}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.clientData}>
            <TouchableOpacity style={styles.optionsButton} onPress={() => handleOptionsPress(item)}>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </TouchableOpacity> 
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Text style={styles.itemText}>Tipo: {item.tipo_descuento}</Text>
            <Text style={styles.itemText}>Valor: {item.valor}</Text>
            <Text>Estado: {item.estado ? 'Activado' : 'Desactivado'}</Text>
            <Switch
            value={item.estado == true}
            onValueChange={() => handleToggleStatus(item.id, item.estado)}/>      
            <View style={styles.container}>
            </View>
            </View>
    </View>
    )}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={{ paddingHorizontal: 16 }}
    ListEmptyComponent={() => (
    <View>
      <Icon name='frown-o' size={70} color="gray" />
        <Text style={styles.mensaje}>No hay descuento.</Text>
        <Text style={styles.mensaje}>Pulse (+) para agregar un nuevo descuento.</Text>
    </View>
        )}
        />
      <TouchableOpacity style={styles.addButton} onPress= {() => props.navigation.navigate("Crear Descuento")}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
       </TouchableOpacity>
       <TouchableOpacity style={styles.descButton} onPress= {() => props.navigation.navigate("Descuentos Desactivados")}>
        <MaterialCommunityIcons name="close-circle" size={30} color="white" />
       </TouchableOpacity>

       <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Descuento</Text>
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
            <Text style={styles.label}>Tipo de Descuento</Text>
            <TextInput
              style={styles.input}
              placeholder="Tipo de descuento"
              value={editedData.tipo_descuento}
              onChangeText={(text) => handleChange('tipo_descuento', text)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Valor</Text>
            <TextInput
              style={styles.input}
              placeholder="Valor"
              value={editedData.valor}
              onChangeText={(text) => handleChange('valor', text)}
            />
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
            <TouchableOpacity style={styles.optionButton} onPress={() => handleEdit(selectedDiscount)}>
              <Text style={styles.optionButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModal(false)}>
              <Text style={styles.optionButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Edicion Correcta"
        message="Se ha editado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle" // Puedes cambiar el icono según lo desees
        />
    </View>

    
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20 ,
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
      descButton:{
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
        marginTop:10,
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
    })
export default PlusDiscount