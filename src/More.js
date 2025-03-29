import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from './AuthContext'; // Import useAuth

const More = ({ navigation }) => {
  const { setIsLoggedIn } = useAuth(); // Get setIsLoggedIn from AuthContext

  const handleLogout = () => {
    setIsLoggedIn(false); // Logout the user
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 20, padding: 20 }}>More</Text>
      
      {/* Styled Logout Button */}
      <TouchableOpacity 
        onPress={handleLogout} 
        style={{
          backgroundColor: '#f07e65', // Button color
          padding: 10,
          borderRadius: 8,
          width: 150,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#d85b45', // Darker border color
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default More;
