import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import StackNavigator from './Navigation/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#102027' }} forceInset={{ 'top': 'never' }}>
        <StackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}
