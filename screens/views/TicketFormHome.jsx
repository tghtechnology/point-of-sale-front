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
  const [showSaveChangesAlert, setShowSaveChangesAlert] = useState(false);
  const [showAlertDeselect, setShowAlertDeselect] = useState(false);
  const { listArticle } = useArticle();
  const { discounts } = useDiscount();
  const [selectedValue, setSelectedValue] = useState('default');
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]); // Nuevo estado para los descuentos seleccionados
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

    const fetchSelectedDiscounts = async () => {
      try {
        const storedDiscounts = await AsyncStorage.getItem('selectedDiscount');
        if (storedDiscounts !== null) {
          setSelectedDiscounts(JSON.parse(storedDiscounts));
        }
      } catch (error) {
        console.error('Error fetching selected discounts from AsyncStorage:', error);
      }
    };

    fetchSelectedItems();
    fetchSelectedDiscounts();
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

  const handleSelectDiscount = async (discount) => {
    let updatedDiscounts = [...selectedDiscounts];
    const discountIndex = updatedDiscounts.findIndex((d) => d.id === discount.id);
  
    if (discountIndex !== -1) {
      // Si el descuento ya está seleccionado, deseleccionarlo
      updatedDiscounts.splice(discountIndex, 1);
    } else {
      // Si el descuento no está seleccionado, deseleccionar cualquier descuento previamente seleccionado y luego seleccionarlo
      updatedDiscounts = [discount];
    }
  
    setSelectedDiscounts(updatedDiscounts);
  
    try {
      await AsyncStorage.setItem('selectedDiscount', JSON.stringify(updatedDiscounts));
      console.log('Descuento seleccionado guardado:', discount);
    } catch (error) {
      console.error('Error saving discount to AsyncStorage:', error);
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
    const updatedItems = selectedItems.map((selectedItem) => {
      if (selectedItem.id === item.id) {
        const newQuantity = selectedItem.quantity - 1;
        if (newQuantity >= 1) {
          return { ...selectedItem, quantity: newQuantity };
        } else {
          return { ...selectedItem, quantity: 1 };
        }
      } else {
        return selectedItem;
      }
    });

    setSelectedItems(updatedItems);
  };

  const handleQuantityChange = (item, text) => {
    const newQuantity = parseInt(text) || 0;
    if (newQuantity >= 1) {
      const updatedItems = selectedItems.map((selectedItem) => {
        if (selectedItem.id === item.id) {
          return { ...selectedItem, quantity: newQuantity };
        } else {
          return selectedItem;
        }
      });

      setSelectedItems(updatedItems);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('selectedItem', JSON.stringify(selectedItems));
      console.log('Cambios guardados exitosamente');
      setShowSaveChangesAlert(true);
      // Puedes mostrar una alerta o mensaje de éxito aquí si lo deseas
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      // Puedes mostrar una alerta o mensaje de error aquí si lo deseas
    }
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
          editable={false}
        />
        <TouchableOpacity onPress={() => handleAddQuantity(item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.priceText}>S/ {item.precio}</Text>
    </View>
  );

  const renderItemDiscounts = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={[styles.circle,
          selectedDiscounts.some(selectedDiscount => selectedDiscount.id === item.id) && styles.circleSelected]}
          onPress={() => handleSelectDiscount(item)}
        />
        <Text style={styles.itemText}>{item.nombre}</Text>
        <Text style={styles.priceText}>{item.valor} %</Text>
      </View>
    );
  };

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
            renderItem={renderItemDiscounts}
          />
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Icon name="content-save" size={27} color="white" /> {/* Icono de guardar */}
        </TouchableOpacity>
      </View>

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

      <CustomAlert
        isVisible={showSaveChangesAlert}
        onClose={() => setShowSaveChangesAlert(false)}
        title="Cambios Guardados"
        message="Los cambios se guardaron correctamente."
        buttonColor="#008CBA"
        iconName="check" // Puedes cambiar el icono según lo desees
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  divider: {
    width: '120%',
    height: 1,
    backgroundColor: 'black',
    marginBottom: 10, // Espacio entre la línea divisoria y el botón
  },
  buttonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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