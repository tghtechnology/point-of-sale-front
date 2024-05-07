import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DataUser = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleEdit = () => {
    navigation.navigate('Editar usuario', { user });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
        <MaterialCommunityIcons name="account-circle" size={150} color="black" />
        <Text style={styles.name}>{user.nombre}</Text>
        </View>
        <Text style={styles.label}><MaterialCommunityIcons name="at" size={20} color="#517EF2"/> {user.email}</Text>
        <Text style={styles.label}><MaterialCommunityIcons name="phone" size={20} color="#517EF2"/> {user.telefono}</Text>
        <Text style={styles.label}><MaterialCommunityIcons name="map" size={20} color="#517EF2"/> {user.pais}</Text>
        <Text style={styles.label}><MaterialCommunityIcons name="purse-outline" size={20} color="#517EF2"/> {user.cargo}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <MaterialCommunityIcons name="pencil" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  topBanner: {
    position:'absolute',
    width: '100%',
    height: '50%',
    backgroundColor: '#0258FE',
    justifyContent: 'center',
    borderBottomLeftRadius : 8,
    borderBottomRightRadius: 8,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  smallCircle: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFDFD',
    borderRadius: 10,
    position: 'absolute',
    top: 20,
    left: 8,
  },
  profileCard: {
    backgroundColor: '#F9F7F7',
    borderRadius: 10,
    shadowColor: '#000',
    height: '80%',
    top: 50, 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 15,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2
  },
  editButton: {
    position: 'absolute',
    right: 20,
    top:'80%',
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DataUser;
