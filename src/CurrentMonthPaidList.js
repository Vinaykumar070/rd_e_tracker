import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useFocusEffect } from '@react-navigation/native';

// Open SQLite database
const db = SQLite.openDatabase(
  { name: 'app.db', location: 'default' },
  () => console.log("Database opened successfully"),
  (error) => console.error("Database error:", error)
);

// ✅ Ensure the table exists
const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS selected_accounts (
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        account_no TEXT,
        account_open_date TEXT,
        maturity_date TEXT,
        asalas_num TEXT NOT NULL
      );`,
      [],
      () => console.log("Table 'selected_accounts' verified/created"),
      (_, error) => console.error("Error creating table:", error)
    );
  });
};

const CurrentMonthPaidList = () => {
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [date, setDate] = useState("");

  // Generate reference number (random for demo)
  const generateRefNumber = () => {
    return `REF-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  // Fetch latest selected accounts
  const fetchSelectedAccounts = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM selected_accounts',
        [],
        (_, result) => {
          const accounts = result.rows.raw();
          console.log("Fetched selected accounts:", accounts);
          setSelectedAccounts(accounts);
          if (accounts.length > 0) {
            setDate(new Date().toLocaleDateString());
            setRefNumber(generateRefNumber());
          }
        },
        (_, error) => console.error("SQL Execution Error:", error)
      );
    });
  };

  // ✅ Create table on mount
  useEffect(() => {
    createTable();
  }, []);

  // Run fetch function every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchSelectedAccounts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selected Accounts Summary</Text>
      <View style={styles.summary}>
        <Text style={styles.infoText}>Total Selected: {selectedAccounts.length}</Text>
        <Text style={styles.infoText}>Date: {date || "N/A"}</Text>
        <Text style={styles.infoText}>Reference No: {refNumber || "N/A"}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setShowDetails(!showDetails)}
        disabled={selectedAccounts.length === 0}
      >
        <Text style={styles.buttonText}>{showDetails ? "Hide Details" : "View Details"}</Text>
      </TouchableOpacity>

      {showDetails && selectedAccounts.length > 0 && (
        <FlatList
          data={selectedAccounts}
          keyExtractor={(item) => item.account_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>Name: {item.name}</Text>
              <Text>Account No: {item.account_no}</Text>
              <Text>Open Date: {item.account_open_date}</Text>
              <Text>Maturity Date: {item.maturity_date}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summary: {
    backgroundColor: '#eef2f3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#f07e65',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CurrentMonthPaidList;
