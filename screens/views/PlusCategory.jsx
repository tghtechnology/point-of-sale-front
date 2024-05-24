import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useCategory from '../hooks/useCategory';
import CustomAlert from '../componentes/Alertas/CustomAlert';

const PlusCategory = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deletedClientId, setDeletedClientId] = useState(null);
  const [categoria, setCategoria] = useState([]);
  const { listCategoria, handleDeleteCategory, setListCategoria } = useCategory();

  useEffect(() => {
    setCategoria(listCategoria);
  }, [listCategoria]);

  const handleEdit = () => {
    navigation.navigate("Editar Categoria", { categorias: selectedItem });
    setModal(false);
  };

  const handleDelete = async (id) => {
    try {
      await handleDeleteCategory(id);
      setShowAlert(true);
      setDeletedClientId(id);
      setModal(false);
    } catch (error) {
      console.error('Error al borrar al cliente:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setDeletedClientId(null);
  };

  useEffect(() => {
    if (deletedClientId !== null) {
      setListCategoria(categoria.filter(categorias => categorias.id !== deletedClientId));
    }
  }, [deletedClientId]);

  const handleOptionsPress = (item) => {
    setSelectedItem(item);
    setModal(true);
  };

  const getColorHexadecimal = (colorName) => {
    const colorMapping = {
      'Rojo': '#FF0000',
      'Verde_limon': '#00FF00',
      'Azul': '#0000FF',
      'Amarillo': '#FFFF00',
      'Turquesa': '#00FFFF',
      'Fucsia': '#FF00FF',
      'Gris_claro': '#C0C0C0',
      'Gris_oscuro': '#808080',
    };
    return colorMapping[colorName] || '#FFFFFF'; // Valor predeterminado blanco si el color no está en el mapeo
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listCategoria}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.colorContainer}>
              <View style={{ ...styles.colorSquare, backgroundColor: getColorHexadecimal(item.color) }} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemText}>{item.nombre}</Text>
              <TouchableOpacity style={styles.optionsButton} onPress={() => handleOptionsPress(item)}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={() => (
          <View>
            <MaterialCommunityIcons name="content-copy" size={100} color="#808080" />
            <Text style={styles.text}>Todavía no tiene Categorias</Text>
            <Text style={styles.text_}>Para agregar un artículo pulse (+)</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Crear Categoria")}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Categoria Eliminada"
        message="La categoria se ha eliminado correctamente."
        buttonColor="#2196F3"
        iconName="check-circle"
      />
      <Modal visible={modal} animationType="slide" transparent onRequestClose={() => setModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleEdit(selectedItem)}>
              <Text style={styles.optionButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleDelete(selectedItem.id)}>
              <Text style={styles.optionButtonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModal(false)}>
              <Text style={styles.optionButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 170,
    height: 170,
    borderRadius: 170,
    backgroundColor: '#E7E7E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSquare: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    color: '#808080',
  },
  colorContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_: {
    marginTop: 5,
    fontSize: 16,
    color: '#808080',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0258FE',
    borderRadius: 20,
    padding: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 40,
    textAlign: 'justify',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: '#007bff',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  optionsButton: {
    position: 'absolute',
    right: 10,
  },
});

export default PlusCategory;
