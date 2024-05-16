import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import useDiscount from '../../hooks/useDiscount';
import DiscountProvider from '../../context/discount/DiscountProvider';

function PlusFalseDiscount() {
  const navigation = useNavigation();
  const { Cerodiscounts, toggleDiscountStatus } = useDiscount();

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
            <Text style={styles.itemText1}>{item.nombre}</Text>
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
    padding: 20,
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
  clientData: {
    flex: 1, // Para que ocupe el espacio restante
  },
  itemText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'justify',
  },
  itemText1: {
    fontSize: 20,
    color: '#517EF2',
    fontWeight: '900',
    marginBottom: 5,
    textAlign: 'justify',
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
    top: 10,
    right: 10,
  },
  mensajeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  mensaje: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
  }

})
export default PlusFalseDiscount