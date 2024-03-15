import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("habit.db");

export const addUserData = (name, age, photo, dream) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users ( name, age, photo, dream) VALUES (?, ?, ?, ?)",
        [name, age, photo, dream],
        (_, results) => {
          resolve(results);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const getUserById = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE id = 1",
        null,
        (_, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  });
};
