import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Menu = () => {
  const navigation = useNavigation();

  return (
      <View style={styles.Container}>
        <Text style={styles.HeaderText}>MENU</Text>
        
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Trash</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
        
      </View>
   
  );
};

export default Menu;

const styles = StyleSheet.create({
  Container: { 
    flex: 1, 
    backgroundColor: "white", 
    paddingTop: 55, 
    paddingHorizontal: 20, 
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  HeaderText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black'
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 18,
    color: 'black',
  },
});