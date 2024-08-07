import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTotal } from '../../Global State/TotalContext';
import useRecibos from "../../hooks/useRecibos";
import CustomAlert from "../../componentes/Alertas/CustomAlert";
import { useNavigation } from '@react-navigation/native';
import ErrorAlert from '../../componentes/Alertas/ErrorAlert';

export default function Rembolsar() {
  const { articleNames, articleQuantities, ventaId, articleIds, articleQuantitiesReembolsadas, setarticleQuantitiesReembolsadas } = useTotal();
  const { handleRembolsar } = useRecibos();
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedArticles, setSelectedArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const initialSelectedArticles = articleNames.map((name, index) => {
      const remainingQuantity = articleQuantities[index] - articleQuantitiesReembolsadas[index];
      return {
        id: articleIds[index],
        name,
        quantity: remainingQuantity,
        selected: false,
        remainingQuantity: remainingQuantity,
      };
    });
    setSelectedArticles(initialSelectedArticles);
  }, [articleNames, articleQuantities, articleIds, articleQuantitiesReembolsadas]);

  const toggleSelection = (id) => {
    const selectedArticle = selectedArticles.find(article => article.id === id);
    if (selectedArticle.remainingQuantity <= 0) {
      return;
    }
  
    setSelectedArticles(selectedArticles.map(article =>
      article.id === id ? { ...article, selected: !article.selected } : article
    ));
  };

  const incrementQuantity = (id, maxQuantity, remainingQuantity) => {
    setSelectedArticles(selectedArticles.map(article =>
      article.id === id && article.quantity < maxQuantity && article.quantity < remainingQuantity
        ? { ...article, quantity: article.quantity + 1 }
        : article
    ));
  };

  const decrementQuantity = (id) => {
    setSelectedArticles(selectedArticles.map(article =>
      article.id === id && article.quantity > 1
        ? { ...article, quantity: article.quantity - 1 }
        : article
    ));
  };

  const handleReembolso = async () => {
    try {
      const selectedArticleIds = selectedArticles.filter(article => article.selected);

      if (selectedArticleIds.length === 0) {
        setErrorMessage('Debe seleccionar al menos un artículo para reembolsar.');
        setErrorAlertVisible(true);
        return;
      }

      const detallesReembolso = selectedArticles
        .filter(article => article.selected)
        .map(article => ({
          cantidad: article.quantity,
          articuloId: article.id,
        }));

      const res = await handleRembolsar(ventaId, detallesReembolso);
      if (res) {
        setShowAlert(true);
        const newArticleQuantitiesReembolsadas = [...articleQuantitiesReembolsadas];
        detallesReembolso.forEach(detalles => {
          const index = articleIds.indexOf(detalles.articuloId);
          newArticleQuantitiesReembolsadas[index] += detalles.cantidad;
        });
        setarticleQuantitiesReembolsadas(newArticleQuantitiesReembolsadas);
      } else {
        setErrorMessage('No se pudo hacer un reembolso.');
        setErrorAlertVisible(true);
      }
    } catch (error) {
      setErrorMessage('Problema interno del servidor.');
      setErrorAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigation.navigate("Recibos");
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
              <View style={styles.textContainer}>
                <Text style={[styles.articleText, article.remainingQuantity <= 0 && styles.noQuantityText]}>
                  {article.name}
                </Text>
                <Text style={[styles.reembolsadasText, article.remainingQuantity <= 0 && styles.noQuantityText]}>
                  Reembolsado: {articleQuantitiesReembolsadas[index]}
                </Text>
              </View>
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
                    onPress={() => incrementQuantity(article.id, articleQuantities[index], article.remainingQuantity)}
                    style={[
                      styles.quantityButton,
                      article.quantity >= article.remainingQuantity && styles.disabledButton
                    ]}
                    disabled={article.quantity >= article.remainingQuantity}
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
        <Text style={styles.submitButtonText}>Confirmar</Text>
      </TouchableOpacity>
      <CustomAlert
        isVisible={showAlert}
        onClose={handleCloseAlert}
        title="Rembolso realizado"
        message="Este producto a sido rembolsado"
        buttonColor="#2196F3"
        iconName="check-circle"
      />
      <ErrorAlert
        isVisible={errorAlertVisible}
        onClose={() => setErrorAlertVisible(false)}
        message={errorMessage}
      />
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
  textContainer: {
    flex: 1,
  },
  articleText: {
    fontSize: 16,
  },
  reembolsadasText: {
    fontSize: 12,
    color: 'gray', // Color gris para el texto de cantidad reembolsada
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
  noQuantityText: {
    color: 'gray', // Cambia el color del texto a gris cuando no hay cantidad disponible
  },
});
