import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useArticle from "../../hooks/useArticle";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTotal } from '../../Global State/TotalContext';
import AuthContext from "../../context/auth/AuthContext"

const TicketFormHome = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { listArticle } = useArticle();
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const navigation = useNavigation();
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const {role } = useContext(AuthContext)

  const fetchDataFromAsyncStorage = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('selectedItems');
      console.log("storedItems:", storedItems); 
      if (storedItems !== null) {
        setSelectedItems(JSON.parse(storedItems));
        console.log('Elementos recuperados del AsyncStorage:', JSON.parse(storedItems));
      } else {
        setSelectedItems([]);
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDataFromAsyncStorage();
    }, [])
  );

  useEffect(() => {
    let total = 0;
    selectedItems.forEach(item => {
      total += item.precio * item.quantity;
    });
    setTotalAmount(total);
  }, [selectedItems]);

  useEffect(() => {
    calculateSelectedProductIds();
  }, [selectedItems]);

  const calculateSelectedProductIds = () => {
    const productIds = selectedItems.map(item => item.id);
    setSelectedProductIds(productIds);
  };

  const cartCount = selectedProductIds.length;

  const handleSelectItem = async (item) => {
    let updatedItems = [...selectedItems];
    const selectedItemIndex = updatedItems.findIndex((i) => i.id === item.id);

    if (selectedItemIndex !== -1) {
      updatedItems.splice(selectedItemIndex, 1);
    } else {
      updatedItems.push({ ...item, quantity });
    }

    setSelectedItems(updatedItems);

    try {
      if (updatedItems.length > 0) {
        await AsyncStorage.setItem('selectedItems', JSON.stringify(updatedItems));
        console.log('Lista de artículos seleccionados guardada en AsyncStorage:', updatedItems);
      } else {
        await AsyncStorage.removeItem('selectedItems');
        console.log('Lista de artículos seleccionados eliminada de AsyncStorage');
        setSelectedItems([]);
      }
    } catch (error) {
      console.error('Error al guardar/eliminar la lista de artículos seleccionados en AsyncStorage:', error);
    }
  };

  const handleAddQuantity = async (item) => {
    const updatedItems = selectedItems.map(selectedItem =>
      selectedItem.id === item.id ? { ...selectedItem, quantity: selectedItem.quantity + 1 } : selectedItem
    );
    setSelectedItems(updatedItems);
    try {
      await AsyncStorage.setItem('selectedItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Error al guardar la lista de artículos seleccionados en AsyncStorage:', error);
    }
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
      await AsyncStorage.setItem('selectedItems', JSON.stringify(selectedItems));
      console.log('Cambios guardados exitosamente');
      navigation.navigate('Ticket');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const renderItem = ({ item }) => {
    const selectedItem = selectedItems.find(selectedItem => selectedItem.id === item.id);
    const quantity = selectedItem ? selectedItem.quantity : 0;

    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={[styles.circle, selectedItem && styles.circleSelected]}
          onPress={() => handleSelectItem(item)}
        />
        <View style={styles.leftContainer}>
          {item.imagen ? (
            <Image source={{ uri: item.imagen }} style={styles.image} />
          ) : item.color ? (
            <View style={{ ...styles.colorSquare, backgroundColor: colorMapping[item.color] }} />
          ) : (
            <Text>No hay representación</Text>
          )}
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.itemText}>{item.nombre}</Text>
          <Text style={styles.priceText}>S/ {item.precio}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleSubtractQuantity(item)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.quantityInput, selectedItem && { color: 'black' }]}
            value={String(quantity)}
            onChangeText={(text) => handleQuantityChange(item, text)}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => handleAddQuantity(item)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.magnifies}>
          <Icon name="magnify" size={30} borderRadius={2} color="#fff" />
        </TouchableOpacity>

        {/* Icono del carrito con contador */}
        <TouchableOpacity style={styles.cartButton} onPress={handleSaveChanges}>
          <Icon name="cart" size={32} color="#517EF2" borderRadius={2} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.Sections}/>
      </View>
      <View style={styles.divider} />
      {listArticle.length === 0 ? (
        <View style={styles.noArticlesContainer}>
          <Text style={styles.noArticlesText}>No hay artículos disponibles</Text>
          {role === "Propietario" && (
          <TouchableOpacity onPress={() => navigation.navigate('Crear Articulo')}>
          <Text style={styles.createArticleButton}>Crea tu artículo</Text>
          </TouchableOpacity>
          )}
        </View>
        
      ) : (
        <View style={styles.itemList}>
          <FlatList
            data={listArticle}
            renderItem={renderItem}
          />
        </View>
      )}
      {/* Footer Navigation */}
      <View style={styles.footer}>
        {/* Icons like home, search, etc. */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 0,
    margin:0,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#D0D0D0',
    marginHorizontal: 0,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%', // Usando porcentaje en lugar de valor fijo
  },
  itemList: {
    flex: 1,
    paddingHorizontal: '2%', // Usando porcentaje en lugar de valor fijo
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: '2%', // Usando porcentaje en lugar de valor fijo
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
    borderRadius:3,
  },
  circleSelected: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 40,
    height: 30,
    textAlign: 'center',
  },
  quantityButton: {
    backgroundColor: '#DDD',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 5,
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
    bottom: 10,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
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
  leftContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 3,
  },
  colorSquare: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  noArticlesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noArticlesText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginBottom: 10,
  },
  createArticleButton: {
    color: '#517EF2',
    fontWeight: 'bold',
    fontSize: 18,
    justify: 'center',
  },
});

export default TicketFormHome;
