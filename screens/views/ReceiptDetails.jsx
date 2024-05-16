import { View, Text } from 'react-native'
import React from 'react'
import useDetalle from '../hooks/useDetalle';


export default function DetailsReceipt() {
  const { listDetalles } = useDetalle();
  return (
    <View>
      <Text>DetailsReceipt</Text>
    </View>
  )
}