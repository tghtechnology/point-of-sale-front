import { View, Text } from 'react-native'
import React from 'react'
import useSale from '../hooks/useSale';

export default function DetailsReceipt() {
  const { listSale } = useSale();
  return (
    <View>
      <Text>DetailsReceipt</Text>
    </View>
  )
}