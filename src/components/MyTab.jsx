import React from "react";
import SvgMain from "../components/SvgMain";
import MainScreen from "../screens/MainScreen";
import SvgProfile from "../components/SvgProfile";
import SvgAddHabit from "../components/SvgAddHabit";
import ProfileScreen from "../screens/ProfileScreen";
import SvgStatistic from "../components/SvgStatistics";
import AddHabitScreen from "../screens/AddHabitScreen";
import StatisticScreen from "../screens/StatisticsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const MyTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { height: 100 },
      }}
    >
      <Tab.Screen
        name="AddHabitScreen"
        component={AddHabitScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <SvgAddHabit style={{ marginTop: 20 }} />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <SvgProfile style={{ marginTop: 20 }} />,
        }}
      />
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <SvgMain style={{ marginTop: 20 }} />,
        }}
      />
      <Tab.Screen
        name="StatisticScreen"
        component={StatisticScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <SvgStatistic style={{ marginTop: 20 }} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTab;
