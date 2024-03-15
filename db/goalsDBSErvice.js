import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("habit.db");

export const addGoalData = (title, description, deadline, days) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO goals (user_id, title, description, deadline, days, isCompleted) VALUES (?, ?, ?, ?, ?, ?)",
        [1, title, description, deadline, JSON.stringify(days), 0],
        (_, resultSet) => {
          resolve(resultSet);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const updateGoalIsComplete = (goalId, newValue) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE goals SET isCompleted = ? WHERE id = ?",
        [newValue ? 1 : 0, goalId],
        (_, resultSet) => {
          resolve(resultSet);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const getAllGoalsByUserId = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM goals WHERE user_id = 1",
        [],
        (_, resultSet) => {
          const goals = resultSet.rows._array;
          resolve(goals);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
