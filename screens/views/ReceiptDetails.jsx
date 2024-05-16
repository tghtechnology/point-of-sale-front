import { View, Text, FlatList} from 'react-native'
import React from 'react'
import useDetalle from '../hooks/useDetalle';


export default function DetailsReceipt() {
  const { listDetalles } = useDetalle();
  return (
    <View>
      <FlatList
       data={listDetalles}
       renderItem={({ item }) => (
        <Text style={styles.itemText}>{item.articuloId}</Text>
       )}
      />
    </View>
  )
}