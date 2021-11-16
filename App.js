import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import StackNavigator from './Navigation/StackNavigator';

//#232931
//#393E46 
//#57CC99 blue 
//#387C6D blue2
//#EEEEEE white

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#232931' }} forceInset={{ 'top': 'never' }}>
        <StackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}
