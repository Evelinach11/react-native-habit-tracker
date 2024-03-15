import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("habit.db");
export const createTablesIfNotExist = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, photo TEXT, dream TEXT, days_completed INTEGER )"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER,  title TEXT, description TEXT, deadline TEXT, days TEXT, isCompleted BOOLEAN, FOREIGN KEY (user_id) REFERENCES users(id))"
    );
  });
};

export const drop = () => {
  db.transaction((tx) => {
    tx.executeSql(`DROP TABLE IF EXISTS users`);
  });
};

export const showTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table'",
      [],
      (_, resultSet) => {
        const tables = resultSet.rows._array;
        console.log(tables);
      },
      (_, error) => {
        console.error("Error fetching tables:", error);
      }
    );
  });
};
