import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTotal } from '../Global State/TotalContext';

export default function Rembolsar() {
  const { articleNames } = useTotal();
  const [selectedArticles, setSelectedArticles] = useState([]);

  const toggleSelection = (name) => {
    if (selectedArticles.includes(name)) {
      setSelectedArticles(selectedArticles.filter(article => article !== name));
    } else {
      setSelectedArticles([...selectedArticles, name]);
    }
  };

  return (
    <View>
      {articleNames.length > 0 ? (
        articleNames.map((name, index) => (
          <TouchableOpacity
            key={index}
            style={styles.articleContainer}
            onPress={() => toggleSelection(name)}
          >
            <View
              style={[
                styles.square,
                selectedArticles.includes(name) && styles.selectedSquare
              ]}
            />
            <Text style={styles.articleText}>{name}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No hay artículos</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  square: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  selectedSquare: {
    backgroundColor: 'blue',
  },
  articleText: {
    fontSize: 16,
  },
});
