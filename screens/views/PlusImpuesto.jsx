import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Switch,Modal,TextInput} from 'react-native';
import { MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useImpuesto from "../hooks/useImpuesto";


export default function PlusImpuesto() {
  const {listImpuesto, handleDeleteImp} = useImpuesto();
  const [impuestos, setImpuestos] = useState(listImpuesto); 
  const navigation = useNavigation();

  const handleEdit = (item) => {
    navigation.navigate("Editar Impuestos", { impuesto: item});
    console.log(item)
  };

  const handleDelete = async (id) => {
    const success = await handleDeleteImp(id);
    if (success) {
      setImpuestos(impuestos.filter(impuesto => impuesto.id !== id));
    }
  };


 
  return (
    <View style={styles.container}>
      <FlatList
        data={listImpuesto}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}> 
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Text style={styles.itemText}>{item.tasa}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDelete (item.id)}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
          
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={() => (
          <View>
            <View style={styles.circle}>
              <FontAwesome5 name="percentage" size={100} color="#808080" />
            </View>
            <Text style={styles.text}>Aun no tiene impuestos en esta tienda</Text>
            <Text style={styles.text_}>Para agregar un artículo pulse (+)</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress= {() => navigation.navigate("Creación de un impuesto")}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>

      
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
  itemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
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
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'red',
  },

});
