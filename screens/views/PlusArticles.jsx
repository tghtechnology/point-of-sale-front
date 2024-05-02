import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FlatList, Image,Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useArticle from "../hooks/useArticle";
import { useNavigation } from '@react-navigation/native';
import useCategory from "../hooks/useCategory";
import CustomAlert from '../componentes/CustomAlert';


export default function PlusArticle() {
  const {listArticle,handleDeleteArticle,setListArticle} = useArticle();
  const [deletedClientId, setDeletedClientId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null)
  const [showAlert, setShowAlert] = useState(false);
  const [modal, setModal] = useState(false);
  const [articles, setArticles] = useState(null); 
  const navigation = useNavigation();
  const {listCategoria} = useCategory();

  useEffect(() => {
    setArticles(listArticle); 
  }, [listArticle]);


  const handleEdit = () => { 
    navigation.navigate("Editar Articulo", {  article: selectedItem, });
    setModal(false);
  };
  const handleDelete = async (id) => { 
    try {
      await handleDeleteArticle(id);
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
      
    setListArticle(articles.filter(article => article.id !== deletedClientId));
  }
}, [deletedClientId]);

  const handleOptionsPress = (item) => {
    setSelectedItem(item); 
    setModal(true);
  };

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


  return (
    <View style={styles.container}>
      <FlatList
        data={listArticle}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {/* Verificar si el artículo tiene imagen o color */}
            {item.imagen ? (
           <Image source={{ uri: item.imagen }} style={styles.image} /> // Mostrar imagen
) : item.color ? (
  <View style={{ ...styles.colorSquare, backgroundColor: item.color }} /> // Mostrar color
) : (
  <Text>No hay representación</Text> // Alternativa si no hay imagen ni color
)}
            <View style={styles.colorContainer}>
                <View style={{...styles.colorSquare, backgroundColor: colorMapping[item.color]}} />
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.itemText}>{item.nombre}</Text>
                <Text style={styles.itemText1}>S/.{item.precio}</Text>
                
            </View>
            <TouchableOpacity style={styles.optionsButton} onPress={() => handleOptionsPress(item)}>
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </TouchableOpacity>                 
        </View>
    )}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={{ paddingHorizontal: 16 }}
    ListEmptyComponent={() => (
      <View>
          
        <MaterialCommunityIcons name="content-copy" size={100} color="#808080" />
        <Text style={styles.text}>Todavía no tiene Articulos</Text>
        <Text style={styles.text_}>Para agregar un artículo pulse (+)</Text>
        </View>
        )}
        />
      <TouchableOpacity style={styles.addButton} onPress= {() => navigation.navigate("Crear Articulo")}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Articulo Eliminado"
        message="El articulo se ha eliminado correctamente."
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
 
  colorContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
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
    backgroundColor: '#0258FE', 
    borderRadius: 20,
    padding: 10,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  optionButton: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#007bff', 
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
   marginLeft:40,
    marginBottom: 5,
    textAlign: 'justify',
  },
  itemText1: {
    fontSize: 18,
    color: '#C30000',
    fontWeight: 'bold',
    marginLeft:40,
    marginBottom: 5,
    textAlign: 'justify',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  colorSquare: {
    width: 50,
    height: 50,
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
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
 
  
  },

  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop:10,
  }, 
  optionsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
},  
image: {
  width: 50,
  height: 50,
  borderRadius: 25, // Para imágenes circulares
  marginRight: 10, // Espacio entre la imagen y el contenido
},
colorSquare: {
  width: 50,
  height: 50, // Tamaño del cuadrado de color
  borderRadius: 25, // Para mantener consistencia con imágenes
  marginRight: 10,
},
itemContent: {
  justifyContent: 'center',
  flex: 1,
},
itemText: {
  fontSize: 18,
  fontWeight: 'bold',
},
itemText1: {
  fontSize: 18,
  color: '#C30000', // Color del precio
},
});