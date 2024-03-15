import {
  View,
  Text,
  Button,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { addGoalData } from "../../db/goalsDBSErvice";
import { useNavigation } from "@react-navigation/native";
import { Button as PaperButton } from "react-native-paper";

const AddHabitScreen = () => {
  const { control, handleSubmit } = useForm();
  const [selectedDays, setSelectedDays] = useState([]);

  const navigation = useNavigation();
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const onSubmit = async (data) => {
    try {
      await addGoalData(
        data.title,
        data.description,
        data.deadline,
        selectedDays
      );
      navigation.navigate("MainScreen");
    } catch (error) {
      console.error("Error adding user data:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Add New Habit</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
          name="title"
          rules={{ required: "Title is required" }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Description"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
          name="description"
          rules={{ required: "Description is required" }}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Deadline"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
          name="deadline"
          rules={{ required: "Description is required" }}
        />
        <Text style={styles.label}>
          Choose the days when you need to do the habit:
        </Text>
        <View style={styles.weekdayContainer}>
          {weekdays.map((day) => (
            <View
              key={day}
              style={{
                backgroundColor: selectedDays.includes(day)
                  ? "#7F27FF"
                  : "#ccc",
                borderRadius: 5,
                margin: 1,
                borderRadius: 30,
                width: 48,
                height: 48,
                justifyContent: "center",
              }}
            >
              <Button
                title={day}
                onPress={() => toggleDay(day)}
                color={selectedDays.includes(day) ? "#FFFFFF" : "#000000"}
              />
            </View>
          ))}
        </View>
        <PaperButton
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          add
        </PaperButton>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#7F27FF",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#7F27FF",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#7F27FF",
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#616161",
  },
  weekdayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#59B4C3",
  },
});

export default AddHabitScreen;
