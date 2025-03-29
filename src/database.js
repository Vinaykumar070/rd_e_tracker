import SQLite from 'react-native-sqlite-storage';

// Open Database
const db = SQLite.openDatabase(
  { name: 'accounts.db', location: 'default' },
  () => console.log('Database opened successfully'),
  error => console.error('Database error:', error)
);

// Create Table
export const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS accounts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          account_no TEXT UNIQUE NOT NULL,
          account_open_date TEXT NOT NULL,
          maturity_date TEXT NOT NULL,
          asalas_num TEXT NOT NULL
        );`,
        [],
        () => console.log('Table created successfully'),
        error => console.error('Error creating table:', error)
      );
    });

     db.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS selected_accounts (
              account_id INTEGER PRIMARY KEY,
              name TEXT NOT NULL,
              account_no TEXT UNIQUE NOT NULL,
              account_open_date TEXT NOT NULL,
              maturity_date TEXT NOT NULL,
              asalas_num TEXT NOT NULL
            )`,
            [],
            () => alert('Table created successfully'),
            error => console.error('Error creating table:', error)
          );
        });
  };

// Insert Data
export const insertAccount = (name, account_no, account_open_date, maturity_date, asalas_num, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO accounts (name, account_no, account_open_date, maturity_date, asalas_num) VALUES (?, ?, ?, ?, ?)',
      [name, account_no, account_open_date, maturity_date, asalas_num],
      (_, result) => {
        console.log('Account inserted:', result);
        if (callback) callback(true);
      },
      error => {
        console.error('Insert error:', error);
        if (callback) callback(false);
      }
    );
  });
};

// Fetch Data
export const fetchAccounts = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM accounts',
      [],
      (_, { rows }) => {
        console.log('Fetched Accounts:', rows.raw());
        if (callback) callback(rows.raw());
      },
      error => {
        console.error('Fetch error:', error);
        if (callback) callback([]);
      }
    );
  });
};




export default db;
