import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import ListView from './ListView';
import { createTable } from './database';

// Get screen height for dynamic calculations
const { height } = Dimensions.get('window');

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    createTable();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top 20% Colored Section */}
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Welcome to India Post RD Tracker</Text>
      </View>

      {/* Search Bar - Positioned 15% from Top */}
      <TextInput
        style={styles.input}
        placeholder="Search by name..."
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* ListView */}
      <View style={styles.bottomContainer}>
        <ListView searchQuery={searchQuery} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: height * 0.2, // 20% of screen height
    backgroundColor: '#DA291C', // India Post Red
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    position: 'absolute',
    top: height * 0.14, // Move 15% from top of screen
    left: '5%',
    width: '90%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  bottomContainer: {
    flex: 1,
    marginTop: '5%', // Adjust to prevent overlapping
    padding: 0,
    backgroundColor: '#F5FCFF',
  },
});

export default Home;
