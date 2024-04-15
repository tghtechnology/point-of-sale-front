import React, { useEffect, FlatList } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useArticle from "../hooks/useArticle";
import useDiscount from '../hooks/useDiscount'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../componentes/CustomAlert';

const TicketFormHome = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { listArticle } = useArticle();
  const { discounts } = useDiscount();
  const [selectedValue, setSelectedValue] = useState('default');
  //Prueba guardar Productos en Asyng Storage
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigation = useNavigation();

  const handleSelectItem = async (item) => {
    setSelectedItem(item);
    // Agregar el artículo seleccionado a la lista de seleccionados
    setSelectedItems(prevItems => [...prevItems, item]);
    // Guardar el artículo seleccionado en AsyncStorage si es necesario
    try {
      await AsyncStorage.setItem('selectedItem', JSON.stringify(selectedItems));
      console.log('Artículo seleccionado guardado:', item);
      setShowAlert(true);
    } catch (error) {
      console.error('Error saving item to AsyncStorage:', error);
    }
  };
  //

  const showListArticles = () => {
    navigation.navigate('ListarTicket');
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cobrarButton} onPress={showListArticles}>
        <Text style={styles.cobrarText}>COBRAR</Text>
        <Text style={styles.amountText}>S/0.00</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <Picker
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedValue(itemValue)
          }>
          <Picker.Item label="Todos los artículos" value="default" />
          <Picker.Item label="Descuentos" value="discounts" />
        </Picker>
        <TouchableOpacity style={styles.magnifies}>
          <Icon name="magnify" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* List Items */}
      {selectedValue === 'default' && (
        <View style={styles.itemList}>
          <FlatList
            data={listArticle.filter(item => !selectedItems.some(selectedItem => selectedItem.id === item.id))}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectItem(item)}>
                <View style={styles.item}>
                  <View style={styles.circle} />
                  <Text style={styles.itemText}>{item.nombre}</Text>
                  <Text style={styles.priceText}>S/ {item.precio}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* List Discounts */}
      {selectedValue === 'discounts' && (
        <View style={styles.itemList}>
          <FlatList
            data={discounts}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.circle} />
                <Text style={styles.itemText}>{item.nombre}</Text>
                <Text style={styles.priceText}>{item.valor} %</Text>
              </View>
            )}
          />
        </View>
      )}


      {/* Footer Navigation */}
      <View style={styles.footer}>
        {/* Icons like home, search, etc. */}
      </View>

      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Producto Seleccionado"
        message="El producto se guardo correctamente."
        buttonColor="#FF0000"
        iconName="list" // Puedes cambiar el icono según lo desees
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  cobrarButton: {
    backgroundColor: 'red',
    padding: 25,
    alignItems: 'center',
    borderRadius: 2,
    margin: 15,
  },
  cobrarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  itemList: {
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  magnifies: {
    border: 1,
    marginRight: 10,
    padding: 15,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 10,
  },
  itemText: {
    flex: 1,
  },
  priceText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    // Define the rest of your footer styles here
  },
});
export default TicketFormHome