import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateEventScreen from "../screens/CreateEventScreen";
import EventQRCodeScreen from "../screens/EventQRCodeScreen";
import EventsListScreen from "../screens/EventsListScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function EventsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventsList" component={EventsListScreen} />
      <Stack.Screen name="EventQRCode" component={EventQRCodeScreen} />
    </Stack.Navigator>
  );
}

function CreateEventStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: "#fff",
            borderRadius: 30,
            height: 70,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 5,
            elevation: 5,
          },
          tabBarIcon: ({ focused }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "EventsStack") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "CreateEventStack") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }

            return (
              <Ionicons
                name={iconName}
                size={32}
                color={focused ? "#000" : "#999"}
              />
            );
          },
        })}
      >
        <Tab.Screen 
          name="EventsStack" 
          component={EventsStack} 
          options={{ title: "Eventos" }}
        />
        <Tab.Screen
          name="CreateEventStack"
          component={CreateEventStack}
          options={{ title: "Criar Evento" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}