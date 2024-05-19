import React from 'react';
import { View, Text } from 'react-native';
import { useTotal } from '../Global State/TotalContext';

export default function Rembolsar() {
  const { articleNames } = useTotal();

  return (
    <View>
      
      {articleNames.length > 0 ? (
        articleNames.map((name, index) => (
          <Text key={index}>{name}</Text>
        ))
      ) : (
        <Text>No hay artículos</Text>
      )}
    </View>
  );
}
