import MyTab from "./src/components/MyTab";
import { getUserById } from "./db/usersDBService";
import React, { useEffect, useState } from "react";
import LoginScreen from "./src/screens/LoginScreen";
import { createTablesIfNotExist } from "./db/dbService";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    createTablesIfNotExist();
  }, []);

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const users = await getUserById();
        setUserExists(users.length > 0);
      } catch (error) {
        setError(error);
      }
    };
    checkUserExists();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userExists ? (
          <Stack.Screen name="Main" component={MyTab} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
