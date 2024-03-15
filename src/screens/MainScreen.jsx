import {
  getAllGoalsByUserId,
  updateGoalIsComplete,
} from "../../db/goalsDBSErvice";
import Toast from "react-native-toast-message";
import { toastMessages } from "../data/toast-data";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import { getRandomToastMessage } from "../utils/toast-util";

const MainScreen = () => {
  const [goals, setGoals] = useState(null);
  const message = getRandomToastMessage(toastMessages);

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

  const changeIsCompleted = async (goalId, newValue) => {
    try {
      await updateGoalIsComplete(goalId, newValue ? 1 : 0);
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, isCompleted: newValue ? 1 : 0 } : goal
        )
      );
      if (newValue) {
        Toast.show({
          type: "success",
          text1: message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error updating goal completion:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your list habits</Text>

      <ScrollView>
        {goals ? (
          goals.map((item) => (
            <View style={styles.goalContainer} key={item.id}>
              <View style={styles.goalInfo}>
                <BouncyCheckbox
                  size={30}
                  fillColor="#7F27FF"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "#7F27FF" }}
                  onPress={(isChecked) => changeIsCompleted(item.id, isChecked)}
                  isChecked={item.isCompleted === 1}
                  style={styles.checkbox}
                />
                <View style={styles.goalDetails}>
                  <Text style={styles.goalTitle}>{item.title}</Text>
                  <Text style={styles.goalDescription}>{item.description}</Text>
                  <Text style={styles.goalDeadline}>{item.deadline}</Text>
                </View>
                <View style={styles.daysContainer}>
                  {JSON.parse(item.days).map((day, index) => (
                    <View style={styles.day} key={index}>
                      <Text style={styles.dayText}>{day}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.loading}>Loading...</Text>
        )}
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 20,
    color: "#7F27FF",
  },
  goalContainer: {
    backgroundColor: "#F3F8FF",
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  goalInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  goalDetails: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  goalDescription: {
    fontSize: 16,
    color: "gray",
  },
  goalDeadline: {
    fontSize: 16,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    width: "50%",
  },
  day: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    borderColor: "#FF9843",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    color: "#FF9843",
  },
  loading: {
    textAlign: "center",
  },
  currentDay: {
    backgroundColor: "#7F27FF",
    color: "#FFFFFF",
  },
  daysCalendar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 30,
  },
  dayStreak: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderColor: "#7F27FF",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
});

export default MainScreen;
