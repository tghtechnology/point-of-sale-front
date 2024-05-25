import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTotal } from '../../Global State/TotalContext';
import useRecibos from "../../hooks/useRecibos";

export default function Rembolsar() {
  const { articleNames, articleQuantities, ventaId, articleIds } = useTotal(); // Asegúrate de obtener articleIds del contexto global
  const { handleRembolsar } = useRecibos();
  const [selectedArticles, setSelectedArticles] = useState(articleNames.map((name, index) => ({
    id: articleIds[index],
    name,
    quantity: articleQuantities[index],
    selected: false,
  })));

  const toggleSelection = (id) => {
    setSelectedArticles(selectedArticles.map(article => 
      article.id === id ? { ...article, selected: !article.selected } : article
    ));
  };

  const incrementQuantity = (id, maxQuantity) => {
    setSelectedArticles(selectedArticles.map(article => 
      article.id === id && article.quantity < maxQuantity ? { ...article, quantity: article.quantity + 1 } : article
    ));
  };

  const decrementQuantity = (id) => {
    setSelectedArticles(selectedArticles.map(article => 
      article.id === id && article.quantity > 1 ? { ...article, quantity: article.quantity - 1 } : article
    ));
  };

  const handleReembolso = async () => {
    try {
      console.log(ventaId);
      const detallesReembolso = selectedArticles
        .filter(article => article.selected)
        .map(article => ({
          cantidad: article.quantity,
          articuloId: article.id,
        }));
      console.log(detallesReembolso);
  
      const res = await handleRembolsar(ventaId, detallesReembolso);
      console.log('Response:', res);
      console.log(res.status) // Agregar esta línea para imprimir el objeto de respuesta
      
      if (res && (res.status === 200 || res.status === 201)) {
        console.log('Reembolso realizado exitosamente:', res.data);
      } else {
        console.error('Error al realizar el reembolso:', res ? res.status : 'Respuesta nula');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de reembolso:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      {selectedArticles.length > 0 ? (
        selectedArticles.map((article, index) => (
          <View key={index} style={styles.articleContainer}>
            <TouchableOpacity onPress={() => toggleSelection(article.id)} style={styles.articleTouchable}>
              <View
                style={[
                  styles.square,
                  article.selected && styles.selectedSquare
                ]}
              />
              <Text style={styles.articleText}>{article.name}</Text>
            </TouchableOpacity>
            {article.selected && (
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => decrementQuantity(article.id)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{article.quantity}</Text>
                <TouchableOpacity
                  onPress={() => incrementQuantity(article.id, articleQuantities[index])}
                  style={[
                    styles.quantityButton,
                    article.quantity >= articleQuantities[index] && styles.disabledButton
                  ]}
                  disabled={article.quantity >= articleQuantities[index]}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text>No hay artículos</Text>
      )}
      <TouchableOpacity onPress={handleReembolso} style={styles.buttonContainer}>
        <Text style={styles.submitButtonText}>Realizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  articleContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  articleTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#0258FE',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  quantityText: {
    fontSize: 16,
    width: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 25,
    borderRadius: 5,
    backgroundColor: '#0258FE',
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
});
