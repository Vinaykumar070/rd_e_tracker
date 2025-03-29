import React, { useState, useEffect,  useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
  Modal,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { fetchAccounts } from './database';
import { useFocusEffect } from '@react-navigation/native';

const db = SQLite.openDatabase(
  { name: 'app.db', location: 'default' },
  () => console.log('Database opened successfully'),
  error => console.error('Database error:', error),
);

const RenderAccountItem = ({ item, selectedUsers, toggleUserSelection }) => {
  const isSelected = selectedUsers.includes(item.id);

  return (
    <TouchableOpacity
      onPress={() => toggleUserSelection(item)}
      activeOpacity={0.7}>
      <View style={[styles.card, { borderColor: isSelected ? 'green' : '#ddd' }]}>
        <View style={styles.cardContent}>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title}>Name:  {item?.name}</Text>
            <Text style={styles.title}>Opening Date:  {item?.account_open_date}</Text>
            <Text style={styles.title}>Maturity Date:  {item?.maturity_date}</Text>
            <Text style={styles.title}>Aslass No:  {item?.asalas_num}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListView = ({ searchQuery }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchAccounts(setAccounts);
    }, [])
  );

  console.log("Accounts Loaded:", accounts); // Debugging line

  const toggleUserSelection = user => {
    setSelectedUsers(prev =>
      prev.includes(user.id)
        ? prev.filter(id => id !== user.id)
        : [...prev, user.id],
    );
    setSelectedAccounts(prev =>
      prev.some(acc => acc.id === user.id)
        ? prev.filter(acc => acc.id !== user.id)
        : [...prev, user],
    );
  };

  const insertSelectedAccounts = () => {
    db.transaction(tx => {
      selectedAccounts.forEach(user => {
        tx.executeSql(
          `INSERT INTO selected_accounts (account_id, name, account_no, account_open_date, maturity_date, asalas_num) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            user.id,
            user.name,
            user.account_no,
            user.account_open_date,
            user.maturity_date,
            user.asalas_num
            ,
          ],
          () => console.log(`Inserted account ${user.id}`),
          error => console.error('Error inserting account:', error),
        );
      });
    });
    alert('Selected accounts added successfully!');
    setSelectedUsers([]);
    setSelectedAccounts([]);
    setReferenceNumber('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Add Accounts Button */}
      <View style={styles.addButton}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          disabled={selectedUsers.length === 0}>
          <Text style={styles.buttonText}>Add Accounts</Text>
        </TouchableOpacity>
      </View>

      {/* Show a message if accounts are empty */}
      {accounts.length === 0 ? (
        <Text style={styles.emptyText}>No accounts found</Text>
      ) : (
        <FlatList
          data={accounts.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <RenderAccountItem
              item={item}
              selectedUsers={selectedUsers}
              toggleUserSelection={toggleUserSelection}
            />
          )}
        />
      )}

      {/* Modal for Reference Number */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Reference Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Reference Number"
              value={referenceNumber}
              onChangeText={setReferenceNumber}
            />
            <Button
              title="Submit"
              onPress={insertSelectedAccounts}
              disabled={!referenceNumber}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full screen height
    backgroundColor: '#F5FCFF',
  },
  addButton: {
    width: '90%',
    backgroundColor: '#f07e65',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: '5%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default ListView;
