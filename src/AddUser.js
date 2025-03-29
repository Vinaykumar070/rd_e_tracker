import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';  // 📌 Import Date Picker
import { insertAccount } from './database';

const AddUser = ({ navigation }) => {
  const [name, setName] = useState('');
  const [accountNumber, setAcccountNumber] = useState('');
  const [accountOpenDate, setAcccountOpenDate] = useState('');
  const [accountMaturityDate, setAcccountMaturityDate] = useState('');
  const [aslasNumber, setAslasNumber] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null); // 📌 Track which field is selected

  const showDatePicker = (field) => {
    setSelectedField(field);
    setDatePickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      if (selectedField === 'openDate') setAcccountOpenDate(formattedDate);
      else if (selectedField === 'maturityDate') setAcccountMaturityDate(formattedDate);
    }
  };

  const handleSave = () => {
    if (!name || !accountNumber || !accountOpenDate || !accountMaturityDate || !aslasNumber) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    insertAccount(name, accountNumber, accountOpenDate, accountMaturityDate, aslasNumber, success => {
      if (success) {
        Alert.alert('Success', 'Account saved successfully!');
        setName('');
        setAcccountNumber('');
        setAcccountOpenDate('');
        setAcccountMaturityDate('');
        setAslasNumber('');
      } else {
        Alert.alert('Error', 'Failed to save account');
      }
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/user.png')} style={styles.userIcon} />
      <Text style={styles.heading}>Add User</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Account Number"
        value={accountNumber}
        onChangeText={setAcccountNumber}
        keyboardType="numeric"
      />

      {/* Account Open Date */}
      <TouchableOpacity style={styles.inputContainer} onPress={() => showDatePicker('openDate')}>
        <TextInput
          style={styles.dateInput}
          placeholder="Account Open Date"
          value={accountOpenDate}
          editable={false}  // Prevent manual typing
        />
        <Image source={require('../assets/calendar.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Account Maturity Date */}
      <TouchableOpacity style={styles.inputContainer} onPress={() => showDatePicker('maturityDate')}>
        <TextInput
          style={styles.dateInput}
          placeholder="Account Maturity Date"
          value={accountMaturityDate}
          editable={false}  // Prevent manual typing
        />
        <Image source={require('../assets/calendar.png')} style={styles.icon} />
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Aslass Number" value={aslasNumber} onChangeText={setAslasNumber} />

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      {datePickerVisible && (
        <DateTimePicker mode="date" display="calendar" value={new Date()} onChange={handleDateChange} />
      )}
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
  },
  userIcon: {
    width: 44,
    height: 44,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '90%',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateInput: {
    flex: 1,
    height: 40,
  },
  icon: {
    width: 30,
    height: 30,
  },
  button: {
    width: '90%',
    backgroundColor: '#f07e65',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
