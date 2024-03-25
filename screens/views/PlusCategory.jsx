import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList ,Modal,TextInput} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useCategory from '../hooks/useCategory';
import CategoryProvider from '../context/category/CategoryProvider';
import { listCategories } from '../services/CategoryService';


 const PlusCategory = () => {
  const navigation = useNavigation();
  const {categories, handleEditCategories, handleUpdateCategory,handleDeleteCategory } = useCategory();
  const [category, setCategory] = useState(categories); 
  const [showModal, setShowModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});

  const handleDelete = async (text_id) => {
    const success = await handleDeleteCategory (text_id);
    if (success) {
      setCategory(category.filter(category => category.text_id !== text_id));
    }
  };

    const handleEdit = (category) => {
      setSelectedCategories(category);
      setEditedData({
        ...category,
        nombre: category.nombre,
        color: category.color,
      });
      setShowModal(true);
    };

    const handleChange = (name, value) => {
      setEditedData({
        ...editedData,
        [name]: value,
      });
    };

  const handleSubmit = async () => {
  try {
    await handleEditCategories(selectedCategories.text_id, editedData);
    console.log('Categoria editado exitosamente');
    await handleUpdateCategory(selectedCategories.text_id, editedData);
    setShowModal(false);
  } catch (error) {
    console.error('Error al editar la Categoria:', error);
  }
};

const handleCancel = () => {
  setShowModal(false);
};
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nombre}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.text_id)}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
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
      <TouchableOpacity style={styles.addButton} onPress= {() => navigation.navigate("Crear Categoria")}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
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
            <Text style={styles.label}>Color</Text>
            <TextInput
              style={styles.input}
              placeholder="Color"
              value={editedData.color}
              onChangeText={(text) => handleChange('color', text)}
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
  text: {
    marginTop: 20,
    fontSize: 20,
    color: '#808080',
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
    backgroundColor: '#ff0000', 
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
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
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
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop:10,
  },   
});

export default PlusCategory;