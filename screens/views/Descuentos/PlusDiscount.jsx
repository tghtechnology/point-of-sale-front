import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import useDiscount from '../../hooks/useDiscount';
import CustomAlert from '../../componentes/Alertas/CustomAlert';
import SearchBar from '../../componentes/Busqueda/SearchBar';

const PlusDiscount = (props) => {
  const navigation = useNavigation();
  const { discounts, setDiscounts, toggleDiscountStatus, handleEditDiscount, handleUpdateDiscount } = useDiscount();
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [modal, setModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedDiscount, setSelectedDiscount] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDiscounts, setFilteredDiscounts] = useState(discounts);

  useEffect(() => {
    setFilteredDiscounts(discounts);
  }, [discounts]); 

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = discounts.filter(discount => 
        discount.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDiscounts(filtered);
    } else {
      setFilteredDiscounts(discounts);
    }
  };

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
      const newStatus = !currentStatus;
      await toggleDiscountStatus(id, newStatus);
      const updatedDiscounts = discounts.map(discount => {
        if (discount.id === id) {
          return { ...discount, estado: newStatus };
        }
        return discount;
      });
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
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <FlatList
        data={filteredDiscounts}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.optionsButton} onPress={() => handleOptionsPress(item)}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </TouchableOpacity> 
              <MaterialIcons name="discount" size={24} color="#517EF2" />
            <View>
              <Text style={styles.itemText1}>{item.nombre}</Text>

              <Text style={styles.itemText}>{(item.tipo_descuento === 'MONTO' ? 'S/. ' : '') + item.valor + (item.tipo_descuento !== 'MONTO' ? ' %' : '')}</Text>
            </View>
            <View style={styles.toggle}>
              <Switch
                value={item.estado == true}
                onValueChange={() => handleToggleStatus(item.id, item.estado)}
              />
            </View>
            <View style={styles.container}>
            </View>
          </View>


        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name='frown-o' size={70} color="gray" />
            <Text style={styles.mensaje}>No hay descuento.</Text>
            <Text style={styles.mensaje}>Pulse (+) para agregar un nuevo descuento.</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => props.navigation.navigate("Crear Descuento")}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.descButton} onPress={() => props.navigation.navigate("Descuentos Desactivados")}>
        <MaterialCommunityIcons name="trash-can" size={30} color="white" />
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
              <Picker
                selectedValue={editedData.tipo_descuento}
                style={styles.picker}
                onValueChange={(itemValue) => handleChange('tipo_descuento', itemValue)}
              >
                <Picker.Item label="Monto" value="MONTO" />
                <Picker.Item label="Porcentaje" value="PORCENTAJE" />
              </Picker>
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
    padding: 20,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
    height: 130,
  },

  itemText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'justify',
    marginLeft: 40,
    top: -23,
  },

  itemText1: {
    fontSize: 20,
    color: '#517EF2',
    fontWeight: '900',
    marginBottom: 5,
    textAlign: 'justify',
    marginLeft: 40,
    top: -25,
  },
  toggle: {
    top: -20,
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
    top: 5,
    right: 10,
    padding:5,
  }, 

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  mensaje: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  }
})
export default PlusDiscount