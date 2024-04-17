import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useArticle from "../hooks/useArticle";
import useDiscount from '../hooks/useDiscount';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../componentes/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TicketFormHome = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertDeselect, setShowAlertDeselect] = useState(false);
  const { listArticle } = useArticle();
  const { discounts } = useDiscount();
  const [selectedValue, setSelectedValue] = useState('default');
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSelectedItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('selectedItem');
        if (storedItems !== null) {
          setSelectedItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Error fetching selected items from AsyncStorage:', error);
      }
    };

    fetchSelectedItems();
  }, []);

  useEffect(() => {
    // Calculate total amount
    let total = 0;
    selectedItems.forEach(item => {
      total += item.precio * item.quantity;
    });
    setTotalAmount(total);
  }, [selectedItems]);

  const handleSelectItem = async (item) => {
    let updatedItems = [...selectedItems];
    const itemIndex = updatedItems.findIndex((i) => i.id === item.id);
  
    if (itemIndex !== -1) {
      // Si el elemento ya está seleccionado, deseleccione
      updatedItems.splice(itemIndex, 1);
      setShowAlertDeselect(true);
    } else {
      // Si el elemento no está seleccionado, seleccione con una cantidad predeterminada
      updatedItems.push({ ...item, quantity });
      setShowAlert(true);
    }
  
    setSelectedItems(updatedItems);
  
    try {
      await AsyncStorage.setItem('selectedItem', JSON.stringify(updatedItems));
      console.log('Artículo seleccionado guardado:', item);
    } catch (error) {
      console.error('Error saving item to AsyncStorage:', error);
    }
  };

  const showListArticles = () => {
    navigation.navigate('ListarTicket');
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseAlertDeselect = () => {
    setShowAlertDeselect(false);
  };

  const handleAddQuantity = (item) => {
    setSelectedItems(selectedItems.map(selectedItem =>
      selectedItem.id === item.id ? { ...item, quantity: selectedItem.quantity + 1 } : selectedItem
    ));
  };
  
  const handleSubtractQuantity = (item) => {
    setSelectedItems(selectedItems.map(selectedItem =>
      selectedItem.id === item.id ? { ...item, quantity: selectedItem.quantity - 1 } : selectedItem
    ));
  };
  
  const handleQuantityChange = (item, text) => {
    const quantity = parseInt(text) || 0;
    setSelectedItems(selectedItems.map(selectedItem =>
      selectedItem.id === item.id ? { ...item, quantity } : selectedItem
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={[styles.circle,
        selectedItems.some(selectedItem => selectedItem.id === item.id) && styles.circleSelected]}
        onPress={() => handleSelectItem(item)}
      />
      <Text style={styles.itemText}>{item.nombre}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleSubtractQuantity(item)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          value={selectedItems.find(selectedItem => selectedItem.id === item.id)?.quantity || ''}
          onChangeText={(text) => handleQuantityChange(item, text)}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={() => handleAddQuantity(item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.priceText}>S/ {item.precio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cobrarButton} onPress={showListArticles}>
        <Text style={styles.cobrarText}>COBRAR</Text>
        <Text style={styles.amountText}>S/{totalAmount.toFixed(2)}</Text>
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
            data={listArticle}
            renderItem={renderItem}
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

      <CustomAlert
        isVisible={showAlertDeselect}
        onClose={handleCloseAlertDeselect}
        title="Producto Deseleccionado"
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
    borderColor: '#000', // Color del borde del círculo no seleccionado
    backgroundColor: '#FFF', // Color del círculo no seleccionado
    marginRight: 10,
  },
  circleSelected: {
    backgroundColor: 'blue', // Color del círculo seleccionado
    borderColor: 'blue', // Color del borde del círculo seleccionado
  }, quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginRight: 5,
    width: 40,
    textAlign: 'center',
  },
  quantityButton: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
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