import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DataUser = (props) => {
  const navigation = useNavigation();
  const {user} = useAuth()
  console.log('dats:',user)

  const handleEdit = () => {
    navigation.navigate('Editar usuario', {user});
};
return (
  <View style={styles.container}>
    <Text style={styles.header}>Perfil de Usuario</Text>
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.field}>{user.nombre}</Text>
    </View>
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.field}>{user.email}</Text>
    </View>
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>Teléfono:</Text>
      <Text style={styles.field}>{user.telefono}</Text>
    </View>
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>País:</Text>
      <Text style={styles.field}>{user.pais}</Text>
    </View>

    <TouchableOpacity style={styles.optionButton} onPress= {handleEdit}>
      <MaterialCommunityIcons name="pencil" size={30} color="white" />
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 16,
  backgroundColor: '#F5F5F5',
},
header: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  color: '#374151',
},
fieldContainer: {
  backgroundColor: '#FFFFFF',
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
label: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 5,
  color: '#374151',
},
field: {
  fontSize: 16,
  color: '#374151',
},
optionButton: {
  position: 'absolute',
  right: 20,
  bottom: 20,
  backgroundColor: '#1E90FF',
  padding: 10,
  borderRadius: 50,
  alignItems: 'center',
  justifyContent: 'center',
},
});

export default DataUser;