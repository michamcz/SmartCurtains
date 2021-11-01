import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../Navigation/TabNavigator';
import NewDeviceForm from '../Screens/NewDeviceForm';
import NewDevice from '../Screens/NewDevice';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TabNavigation" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NewDevice" component={NewDevice} />
      <Stack.Screen name="NewDeviceForm" component={NewDeviceForm} />
    </Stack.Navigator>
  );
}
