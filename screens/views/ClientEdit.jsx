import {useState} from "react";
import {  View, Text ,TextInput ,StyleSheet, TouchableOpacity} from 'react-native'
import useClient from '../hooks/useClient';
import ClientProvider from '../context/cliente/ClientProvider';
import CustomAlert from '../componentes/CustomAlert';
const ClientEdit = () => {
    const {handleEditClient, handleUpdateClient} = useClient()
    const [editedData, setEditedData] = useState({});
    const [selectedClient, setselectedClient] = useState(null);

    const handleEdit = (client) => {
        setselectedClient(client);
        setEditedData({
          ...client,
          nombre: client.nombre,
          email: client.email,
          telefono: client.telefono,
          direccion: client.direccion,
          cuidad: client.cuidad,
          region: client.region,
          codigo_postal: client.codigo_postal,
          pais: client.pais,
        });
    }
    const handleChange = (name, value) => {
        setEditedData({
        ...editedData,
        [name]: value,
        });
    };
      
    const handleSubmit = async () => {
        try {
        await handleEditClient(selectedClient.id, editedData);
        console.log('Descuento editado exitosamente');
        await handleUpdateClient(selectedClient.id, editedData);
        setShowAlert(true);
        setShowModal(false);
        } catch (error) {
        console.error('Error al editar el descuento:', error);
        }
    };
return (
<View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar cliente</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={editedData.nombre}
              onChangeText={(text) => handleChange('nombre', text)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="email"
              value={editedData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefono</Text>
            <TextInput
              style={styles.input}
              placeholder="telefono"
              value={editedData.telefono}
              onChangeText={(text) => handleChange('telefono', text)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Direccion</Text>
            <TextInput
              style={styles.input}
              placeholder="direccion"
              value={editedData.direccion}
              onChangeText={(text) => handleChange('direccion', text)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Ciudad</Text>
            <TextInput
              style={styles.input}
              placeholder="ciudad"
              value={editedData.ciudad}
              onChangeText={(text) => handleChange('ciudad', text)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Region</Text>
            <TextInput
              style={styles.input}
              placeholder="region"
              value={editedData.region}
              onChangeText={(text) => handleChange('region', text)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Codigo Postal</Text>
            <TextInput
              style={styles.input}
              placeholder="codigo_postal"
              value={editedData.codigo_postal}
              onChangeText={(text) => handleChange('codigo_postal', text)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Pais</Text>
            <TextInput
              style={styles.input}
              placeholder="pais"
              value={editedData.pais}
              onChangeText={(text) => handleChange('pais', text)}
            />
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20 ,
      },
      itemContainer: {
        marginBottom: 10,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        flexDirection: 'row', // Para alinear elementos horizontalmente
        alignItems: 'center', // Para alinear elementos verticalmente
      },
      clientData: {
        flex: 1, // Para que ocupe el espacio restante
      },
      itemText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 5,
      },
      addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ff0000', // Color del botón
        borderRadius: 20,
        padding: 10,
      },
      descButton:{
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: 'blue', // Color del botón
        borderRadius: 20,
        padding: 10,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 400,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      inputContainer: {
        marginBottom: 15,
      },
      label: {
        marginBottom: 5,
        fontSize: 16,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
      },
      button: {
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'green',
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      },
      editButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop:10,
      },
      optionButton: {
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: '#007bff', // Color del botón de opciones
      },
      optionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      },
      cancelButton: {
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: 'gray', // Color del botón de cancelar
      },
      optionsButton: {
          position: 'absolute',
          top: 10,
          right: 10,
      },
      
})
export default ClientEdit