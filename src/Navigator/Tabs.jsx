import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SearchScreen } from "../screens/SearchScreen";
import Icon from "@expo/vector-icons/Ionicons";
import { AddPostScreen } from "../screens/AddPostScreen";

const Tab = createBottomTabNavigator();

export function Tabs({ route }) {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#38b000",
        tabBarLabelStyle: {
          marginBottom: 10,
        },
        tabBarStyle: {
          height: 60,
          borderWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{ uid: route.params.uid }}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={25} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="AddPostScreen"
        component={AddPostScreen}
        initialParams={{ uid: route.params.uid }}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <Icon name="add-outline" size={25} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        initialParams={{ uid: route.params.uid }}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color }) => (
            <Icon name="search-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{ uid: route.params.uid }}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
