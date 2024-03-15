import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { addUserData } from "../../db/usersDBService";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Button as PaperButton } from "react-native-paper";

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    setIsFormComplete(Object.values(isDirty).every((field) => field === true));
  }, [isDirty]);

  const navigation = useNavigation();

  const onSubmit = async (data) => {
    try {
      await addUserData(data.name, data.age, data.imageUri, data.dream);
      navigation.navigate("AddHabitScreen");
    } catch (error) {
      console.error("Error adding user data:", error);
    }
  };

  const pickImage = async ({ field }) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      field.onChange(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <Controller
          control={control}
          name="imageUri"
          defaultValue=""
          render={({ field }) => (
            <>
              {!field.value ? (
                <MaterialIcons
                  style={styles.icon}
                  onPress={() => pickImage({ field })}
                  name="add-photo-alternate"
                  size={25}
                />
              ) : (
                <Image source={{ uri: field.value }} style={styles.photo} />
              )}
            </>
          )}
        />
        {["name", "age", "dream"].map((fieldName) => (
          <Controller
            key={fieldName}
            control={control}
            render={({ field }) => (
              <TextInput
                style={styles.input}
                placeholder={
                  fieldName === "age"
                    ? "Age"
                    : fieldName === "dream"
                    ? "Your biggest dream at this time"
                    : "Name"
                }
                keyboardType={fieldName === "age" ? "numeric" : undefined}
                autoCapitalize="none"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
            name={fieldName}
          />
        ))}
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="#7F27FF"
            unfillColor="#FFFFFF"
            text="Become a better you?"
            iconStyle={{ borderColor: "#7F27FF" }}
            innerIconStyle={{ borderWidth: 1 }}
            textStyle={{ textDecorationLine: "none" }}
            onPress={() => setIsChecked(!isChecked)}
          />
        </View>
        <PaperButton
          mode="contained"
          style={[styles.button, { opacity: isFormComplete ? 1 : 0.5 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormComplete}
        >
          Login
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#7F27FF",
  },
  photo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 75,
    marginBottom: 20,
  },
  icon: {
    color: "#7F27FF",
    marginBottom: 20,
    width: 350,
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
  checkboxContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#FF8911",
  },
});

export default LoginScreen;
