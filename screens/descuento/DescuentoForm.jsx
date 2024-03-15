import React,{useState} from 'react';
import { View, Text, TextInput, TouchableOpacity,Modal  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DescuentoForm = ({EnviarDesc,cerrarFormulario,tipoDescuento,setTipoDescuento,datosFormulario,setDatosFormulario,}) => {
  const [focoNombre, setFocoNombre] = useState(false);
  const [focoMonto, setFocoMonto] = useState(false);

  const handleFocusNombre = () => setFocoNombre(true);
  const handleBlurNombre = () => setFocoNombre(false);

  const handleFocusMonto = () => setFocoMonto(true);
  const handleBlurMonto = () => setFocoMonto(false);
  return (
    <Modal transparent animationType="slide" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.formularioContainer}>
          {/* Contenido del formulario */}
          <Text style={styles.formularioTitle}>Crear Descuento</Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#FF6347" />
            <TextInput
              style={[styles.input, focoNombre ? styles.inputFoco : null]}
              placeholder="Nombre"
              value={datosFormulario.nombre}
              onChangeText={(text) => setDatosFormulario({ ...datosFormulario, nombre: text })}
              onFocus={handleFocusNombre}
              onBlur={handleBlurNombre}
            />
          </View>
          <View style={styles.inputContainer}>
            {tipoDescuento === 'dollar' && <Text style={styles.dollarSign}>$</Text>}
            <TextInput
              style={[styles.input, focoMonto ? styles.inputFoco : null]}
              placeholder="Valor"
              value={datosFormulario.valor}
              onChangeText={(decimal) => {
                const nuevoValor = decimal.replace(/^0+(?=\d)/, '');
                setDatosFormulario({ ...datosFormulario, valor: nuevoValor });
              }}
              onFocus={handleFocusMonto}
              onBlur={handleBlurMonto}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => setTipoDescuento(tipoDescuento === 'percent' ? 'dollar' : 'percent')}>
              <Icon
                name={tipoDescuento === 'percent' ? 'percent' : 'dollar'}
                size={20}
                color={tipoDescuento === 'percent' ? 'green' : 'gray'}
                style={styles.iconoDescuento}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.botonesContainer}>
            <TouchableOpacity onPress={EnviarDesc} style={[styles.boton, { fontSize: 20, height: 50 }]}>
              <Text style={styles.texto}>Enviar</Text>
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity onPress={cerrarFormulario} style={[styles.boton, { fontSize: 20, height: 50 }]}>
              <Text style={styles.texto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formularioContainer: {
    position: 'absolute',
    top: 100,
    left: '5%',
    backgroundColor: 'white',
    padding: 80,
    borderRadius: 10,
  },
  formularioTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF6347',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF6347',
    paddingHorizontal: 10,
    marginBottom: 16,
    shadowColor: '#FF6347',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  inputFoco: {
    borderColor: '#FF4500',
    shadowColor: '#FF4500',
  },
  dollarSign: {
    fontSize: 30,
    color: '#546574',
    marginLeft: 5,
  },
  iconoDescuento: {
    marginLeft: 5,
    marginRight: 5,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  texto: {
    fontSize: 20,
    color: 'white',
  },
  boton: {
    borderRadius: 5,
    backgroundColor: 'red',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },

};

export default DescuentoForm;