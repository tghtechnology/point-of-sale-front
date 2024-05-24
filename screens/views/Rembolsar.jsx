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
      <TouchableOpacity  style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Realizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft:55,
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
  buttonContainer: {
    marginTop: 25,
    overflow: "hidden",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0258FE',
    backgroundColor: '#0258FE',
    width: 237,
    height: 39,
    marginLeft: 90,
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
