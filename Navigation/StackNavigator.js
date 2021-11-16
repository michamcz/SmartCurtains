import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../Navigation/TabNavigator';
import NewDeviceForm from '../Screens/NewDeviceForm';
import NewDevice from '../Screens/NewDevice';
import OptionsModal from '../Screens/OptionsModal';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="NewDevice" component={NewDevice} />
        <Stack.Screen
          name="NewDeviceForm"
          component={NewDeviceForm}
          options={{
            title: 'Configure the device',
            headerStyle: {
              backgroundColor: '#57CC99',
            },
            headerTintColor: '#EEEEEE',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Group>
      <Stack.Group screenOption={{ presenetation: 'modal' }}>
        <Stack.Screen
          name='OptionsModal'
          component={OptionsModal}
          options={{
            title: 'Device Options',
            headerStyle: {
              backgroundColor: '#57CC99',
            },
            headerTintColor: '#EEEEEE',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
