import { View, Text, FlatList,StyleSheet} from 'react-native'
import React from 'react'
import useDetalle from '../hooks/useDetalle';
import { useRoute } from '@react-navigation/native';


export default function DetailsReceipt() {
  const { listDetalles } = useDetalle();
  const route = useRoute();
  const { recibo } = route.params;

  const detallesDelRecibo = listDetalles.filter(detalle => detalle.id_recibo === recibo.id); 

  return (
    <View>
      <FlatList
       data={detallesDelRecibo}
       renderItem={({ item }) => (
        <Text style={styles.itemText}>{item.subtotal}</Text>
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