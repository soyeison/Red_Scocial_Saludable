import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { AddInfoUserScreen } from "../screens/AddInfoUserScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { Tabs } from "./Tabs";

const Stack = createNativeStackNavigator();

export function StackLogin() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false, //1. Por defecto las pantallas vienen con un header, esto lo quita.
        contentStyle: {
          backgroundColor: "white", //2. Por defecto, las pantallas tienen color de fondo gris, lo ponemos en blanco.
        },
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="AddInfoUserScreen" component={AddInfoUserScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
}
