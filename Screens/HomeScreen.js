import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import DeviceCard from '../Components/DeviceCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <DeviceCard />
      <DeviceCard />
      <DeviceCard />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scroll: {
    width: '100%',
    backgroundColor: 'gray',
  }
});
