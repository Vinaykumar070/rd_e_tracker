import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext'; // Import useAuth from AuthContext

const Login = () => {
  const [agentId, setAgentId] = useState('');
  const [error, setError] = useState('');
  const { setIsLoggedIn } = useAuth(); // Use global setIsLoggedIn function

  const handleLogin = () => {
    if (agentId === '00003') {
      setIsLoggedIn(true); // Update login state
    } else {
      setError('Invalid Agent ID');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RD e-Tracker</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Agent ID"
        placeholderTextColor="#888"
        value={agentId}
        onChangeText={setAgentId}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#007BFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default Login;
