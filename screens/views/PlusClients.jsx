import React,{useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Switch,Modal,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const PlusClients = (props) => {
    const navigation = useNavigation();

  return (
   <View style={styles.container}>
      <FlatList
        data={discounts}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Text style={styles.itemText}>Tipo: {item.tipo_descuento}</Text>
            <Text style={styles.itemText}>Valor: {item.valor}</Text>
            <Text>Estado: {item.estado === true ? 'Activado' : 'Desactivado'}</Text>
            <Switch
            value={item.estado === true}
            onValueChange={() => handleToggleStatus(item.id, item.estado)}/>      
            <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
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
      <TouchableOpacity style={styles.addButton} onPress= {() => props.navigation.navigate("Crear Cliente")}>
        <MaterialCommunityIcons name="plus" size={30} color="white" />
       </TouchableOpacity>
       
    </View>
  )
}

export default PlusClients