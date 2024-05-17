import { View, Text, FlatList,StyleSheet} from 'react-native'
import React from 'react'
import useDetalle from '../hooks/useDetalle';


export default function DetailsReceipt() {
  const { listDetalles } = useDetalle();
  return (
    <View>
      <FlatList
       data={listDetalles}
       renderItem={({ item }) => (
        <Text style={styles.itemText}>{item.id}</Text>
       )}
      />
    </View>
  )
  
}
const styles = StyleSheet.create({
  itemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 5,
  },
});