import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAllGoalsByUserId } from "../../db/goalsDBSErvice";

const StatisticScreen = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllGoalsByUserId();
        setGoals(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [goals]);

  const countNotCompletedGoals = () => {
    return goals.reduce((count, goal) => {
      if (goal.isCompleted !== 1) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const notCompletedCount = countNotCompletedGoals();

  return (
    <View style={styles.container}>
      <Text>You have {notCompletedCount} goals not completed</Text>
      {notCompletedCount === 0 ? (
        <Text style={styles.message}>You did a great job!</Text>
      ) : (
        <Text style={styles.message}>Keep trying!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#7F27FF",
  },
});

export default StatisticScreen;
