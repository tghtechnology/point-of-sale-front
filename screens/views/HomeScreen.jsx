import { View, Text,StyleSheet, Button, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen(props) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity  onPress= {() => props.navigation.navigate("Profile")}style ={styles.container}>
    <MaterialCommunityIcons name="account-circle-outline" size={24} color="#708090" />
      <Text style ={styles.text}>Cuenta</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        margin:20,
      },
      text: {
        marginLeft: 20,
      },
});