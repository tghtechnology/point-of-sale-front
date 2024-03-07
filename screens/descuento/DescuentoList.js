// DescuentoList.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const DescuentoList = ({ descuentos, cambiarEstadoDescuento }) => {
  const renderDescuentoItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.nombre}</Text>
      <Text style={styles.itemText}>{item.valor}</Text>
      <Text style={styles.itemText}>{item.tipo_descuento}</Text>
      <Text style={styles.itemText}>{item.estado}</Text>
      <Switch
        value={item.estado === 1}
        onValueChange={() => {
          const nuevoEstado = item.estado === 1 ? 0 : 1;
          cambiarEstadoDescuento(item.id, nuevoEstado);
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {descuentos.length === 0 ? (
        <View style={styles.mensajeContainer}>
          <Text style={styles.mensaje}>No hay descuento </Text>
          <Icon name="frown-o" size={70} color="gray" />
        </View>
      ) : (
        <FlatList
          style={styles.flatListContainer}
          data={descuentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDescuentoItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 20,
    marginTop: 16,
  },
  mensajeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mensaje: {
    fontSize: 20,
    marginBottom: 20,
    color: 'gray',
  },
  flatListContainer: {
    padding: 16,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DescuentoList;
