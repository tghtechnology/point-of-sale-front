import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useArticle from "../hooks/useArticle";
import useDiscount from '../hooks/useDiscount';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../componentes/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useClient from '../hooks/useClient'
import useImpuesto from "../hooks/useImpuesto";

const TicketFormHome = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showSaveChangesAlert, setShowSaveChangesAlert] = useState(false);
  const [showAlertDeselect, setShowAlertDeselect] = useState(false);
  const { listArticle } = useArticle();
  const { discounts } = useDiscount();
  const { client } = useClient();
  const { listImpuesto } = useImpuesto();
  const [selectedValue, setSelectedValue] = useState('default');
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
const [selectedTaxes, setSelectedTaxes] = useState(null);
const [selectedClients, setSelectedClients] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0);
  const navigation = useNavigation();
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  useEffect(() => {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.removeItem('selectedItems');
        await AsyncStorage.removeItem('selectedDiscounts');
        await AsyncStorage.removeItem('selectedClients');
        await AsyncStorage.removeItem('selectedTaxes');
        setSelectedItems([]);
        setSelectedDiscounts([]);
        setSelectedClients([]);
        setSelectedTaxes([]);
        console.log('Datos de AsyncStorage eliminados al iniciar sesión');
      } catch (error) {
        console.error('Error al eliminar datos de AsyncStorage al iniciar sesión:', error);
      }
    };

    clearAsyncStorage();
  }, []);
  useEffect(() => {
    calculateSelectedProductIds();
  }, [selectedItems]);

  const calculateSelectedProductIds = () => {
    const productIds = selectedItems.map(item => item.id);
    setSelectedProductIds(productIds);
  };

  const cartCount = selectedProductIds.length;

  useEffect(() => {
  const fetchDataFromAsyncStorage = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('selectedItems');
      const storedDiscounts = await AsyncStorage.getItem('selectedDiscounts');
      const storedClient = await AsyncStorage.getItem('selectedClients');
      const storedTaxes = await AsyncStorage.getItem('selectedTaxes');

      if (storedItems !== null) {
        setSelectedItems(JSON.parse(storedItems));
      }
      if (storedDiscounts !== null) {
        setSelectedDiscounts(JSON.parse(storedDiscounts));
      }
      if (storedClient !== null) {
        setSelectedClients(JSON.parse(storedClient));
      }
      if (storedTaxes !== null) {
        setSelectedTaxes(JSON.parse(storedTaxes));
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  fetchDataFromAsyncStorage();
}, []);

 

  useEffect(() => {
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
    updatedItems.splice(itemIndex, 1);
    setShowAlertDeselect(true);
  } else {
    updatedItems.push({ ...item, quantity });
    setShowAlert(true);
  }

  setSelectedItems(updatedItems);

  try {
    if (updatedItems.length > 0) {
      await AsyncStorage.setItem('selectedItems', JSON.stringify(updatedItems));
      console.log('Lista de artículos seleccionados guardada en AsyncStorage:', updatedItems);
    } else {
      await AsyncStorage.removeItem('selectedItems');
      console.log('Lista de artículos seleccionados eliminada de AsyncStorage');
    }
  } catch (error) {
    console.error('Error al guardar/eliminar la lista de artículos seleccionados en AsyncStorage:', error);
  }
};

const handleSelectDiscount = async (discount) => {
  let updatedDiscounts = [...selectedDiscounts];
  const discountIndex = updatedDiscounts.findIndex((d) => d.id === discount.id);

  if (discountIndex !== -1) {
    updatedDiscounts.splice(discountIndex, 1);
  } else {
    updatedDiscounts = [discount];
  }

  setSelectedDiscounts(updatedDiscounts);

  try {
    if (updatedDiscounts.length > 0) {
      await AsyncStorage.setItem('selectedDiscounts', JSON.stringify(updatedDiscounts));
      console.log('Lista de descuentos seleccionados guardada en AsyncStorage:', updatedDiscounts);
    } else {
      await AsyncStorage.removeItem('selectedDiscounts');
      console.log('Lista de descuentos seleccionados eliminada de AsyncStorage');
    }
  } catch (error) {
    console.error('Error al guardar/eliminar la lista de descuentos seleccionados en AsyncStorage:', error);
  }
};


const handleSelectClient = async (client) => {
  if (selectedClients && selectedClients.id === client.id) {
    setSelectedClients(null);
    try {
      await AsyncStorage.removeItem('selectedClients');
      console.log('Cliente deseleccionado eliminado del AsyncStorage.');
    } catch (error) {
      console.error('Error al eliminar cliente deseleccionado del AsyncStorage:', error);
    }
  } else {
    setSelectedClients(client);
    try {
      await AsyncStorage.setItem('selectedClients', JSON.stringify(client)); 
      console.log('Cliente seleccionado guardado en AsyncStorage:', client);
    } catch (error) {
      console.error('Error al guardar cliente seleccionado en AsyncStorage:', error);
    }
  }
};

  
const handleSelectTax = async (tax) => {
  if (selectedTaxes && selectedTaxes.id === tax.id) {
    setSelectedTaxes(null);
    try {
      await AsyncStorage.removeItem('selectedTaxes'); 
      console.log('Impuesto deseleccionado eliminado del AsyncStorage.');
    } catch (error) {
      console.error('Error al eliminar impuesto deseleccionado del AsyncStorage:', error);
    }
  } else {
    setSelectedTaxes(tax);
    try {
      await AsyncStorage.setItem('selectedTaxes', JSON.stringify(tax));
      console.log('Impuesto seleccionado guardado en AsyncStorage:', tax);
    } catch (error) {
      console.error('Error al guardar impuesto seleccionado en AsyncStorage:', error);
    }
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

  const RemoveItem = async () => {
    await AsyncStorage.setItem('selectedItem', JSON.stringify(selectedItems));
  }

 const handleSaveChanges = async () => {
    try {
      await RemoveItem();
      await AsyncStorage.setItem('selectedDiscount', JSON.stringify(selectedDiscounts));
      await AsyncStorage.setItem('selectedTax', JSON.stringify(selectedTaxes));
      console.log('Cambios guardados exitosamente');
      showListArticles();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={[styles.circle,
        selectedItems.some(selectedItem => selectedItem.id === item.id) && styles.circleSelected]}
        onPress={() => handleSelectItem(item)}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>{item.nombre}</Text>
        <Text style={styles.priceText}>S/ {item.precio}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleSubtractQuantity(item)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <TextInput
            style={styles.quantityInput}
            value={String(selectedItems.find(selectedItem => selectedItem.id === item.id)?.quantity) || '0'}
            onChangeText={(text) => handleQuantityChange(item, text)}
            keyboardType="numeric"
            editable={false}
          />


        <TouchableOpacity onPress={() => handleAddQuantity(item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItemDiscounts = ({ item }) => {
    let discountValue = '';
    if (item.tipo_descuento === 'MONTO') {
      discountValue = `S/ ${parseFloat(item.valor).toFixed(2)}`;
    } else if (item.tipo_descuento === 'PORCENTAJE') {
      discountValue = `${item.valor}%`;
    }
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={[styles.circle,
          selectedDiscounts.some(selectedDiscount => selectedDiscount.id === item.id) && styles.circleSelected]}
          onPress={() => handleSelectDiscount(item)}
        />
        <Text style={styles.itemText}>{item.nombre}</Text>
        <Text style={styles.priceText}>{discountValue}</Text>
      </View>
    );
  };

  const renderItemClient = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={[
          styles.circle,
          selectedClients && selectedClients.id === item.id && styles.circleSelected
        ]}
        onPress={() => handleSelectClient(item)}
      />
      <Text style={styles.itemText}>{item.nombre}</Text>
      <Text style={styles.priceText}>{item.email}</Text>
    </View>
  );
  
  const renderItemTaxes = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={[
          styles.circle,
          selectedTaxes && selectedTaxes.id === item.id && styles.circleSelected
        ]}
        onPress={() => handleSelectTax(item)}
      />
      <Text style={styles.itemText}>{item.nombre}</Text>
      <Text style={styles.priceText}>{item.tasa} %</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.magnifies}>
          <Icon name="magnify" size={30} color="#517EF2" />
        </TouchableOpacity>

        {/* Icono del carrito con contador */}
        <TouchableOpacity style={styles.cartButton} onPress={handleSaveChanges}>
          <Icon name="cart" size={24} color="black" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <Picker
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedValue(itemValue)
          }>
          <Picker.Item label="Todos los artículos" value="default" />
          <Picker.Item label="Descuentos" value="discounts" />
          <Picker.Item label="Clientes" value="clients" />
          <Picker.Item label="Impuestos" value="impuestos" />
        </Picker>
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

      {/* List Client */}
      {selectedValue === 'clients' && (
        <View style={styles.itemList}>
          <FlatList
            data={client}
            renderItem={renderItemClient}
          />
        </View>
      )}

      {/* List Client */}
      {selectedValue === 'impuestos' && (
        <View style={styles.itemList}>
          <FlatList
            data={listImpuesto}
            renderItem={renderItemTaxes}
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
        iconName="list" 
      />

      <CustomAlert
        isVisible={showAlertDeselect}
        onClose={handleCloseAlertDeselect}
        title="Producto Deseleccionado"
        message="El producto se guardo correctamente."
        buttonColor="#FF0000"
        iconName="list"
      />

      <CustomAlert
        isVisible={showSaveChangesAlert}
        onClose={() => setShowSaveChangesAlert(false)}
        title="Cambios Guardados"
        message="Los cambios se guardaron correctamente."
        buttonColor="#008CBA"
        iconName="check" 
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
    marginBottom: 10, 
  },
  buttonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 200,
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
    backgroundColor: '#EAEAEA',
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
  itemInfo: {
    flex: 1, 
  },
  magnifies: {
    flexDirection: 'row', 
    alignItems: 'center', 
    border: 1,
    marginRight: 10,
    padding: 15,
  },
  circle: {
    width: 23.59, 
    height: 19.59,
    borderWidth: 2,
    borderColor: '#517EF2',
    backgroundColor: '#FFF',
    marginRight: 10,
  },
  circleSelected: {
    backgroundColor: 'blue', 
    borderColor: 'blue', 
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
    width: 30,
    height: 30, 
    textAlign: 'center',
  },
  quantityButton: {
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 30,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
  },
  priceText: {
    color: '#C30000',
    fontWeight: 'bold',
    fontSize: 11,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  cartBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
export default TicketFormHome