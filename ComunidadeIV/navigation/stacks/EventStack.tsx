import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEventScreen from "../../screens/CreateEventScreen";
import EventQRCodeScreen from "../../screens/EventQRCodeScreen";

export type EventStackParamList = {
  CreateEvent: undefined;
  EventQRCode: { eventId: string; eventName?: string };
};

const Stack = createNativeStackNavigator<EventStackParamList>();

export default function EventStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="EventQRCode" component={EventQRCodeScreen} />
    </Stack.Navigator>
  );
}