import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Switch} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import useDiscount from '../hooks/useDiscount';
import DiscountProvider from '../context/discount/DiscountProvider';

function PlusFalseDiscount() {
    const navigation = useNavigation();
    const {Cerodiscounts,toggleDiscountStatus} = useDiscount();

    const handleToggleStatus = async (id, currentStatus) => {
        try {
          // Invierte el estado actual del descuento
          const newStatus = !currentStatus;
          await toggleDiscountStatus(id, newStatus);
        } catch (error) {
          setError('Error al actualizar el estado del descuento');
        }
      };
  return (
    <View style={styles.container}>
    <FlatList
      data={Cerodiscounts}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Text style={styles.itemText}>{item.valor + (item.tipo_descuento === 'MONTO' ? ' $' : ' %')}</Text>
         
          <Switch
          value={item.estado === true}
          onValueChange={() => handleToggleStatus(item.id, item.estado)}
      />          
      </View>
  )}
  keyExtractor={(item, index) => index.toString()}
  contentContainerStyle={{ paddingHorizontal: 16 }}
  ListEmptyComponent={() => (
  <View style={styles.mensajeContainer}>
      <Icon name='frown-o' size={70} color="gray" />
      <Text style={styles.mensaje}>No hay descuentos desactivados</Text>
  </View>
      )}
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
        bottom: 20,
        left: 20,
        backgroundColor: '#ff0000', // Color del botón
        borderRadius: 20,
        padding: 10,
      }
    })
export default PlusFalseDiscount