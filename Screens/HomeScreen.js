import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button  title="ON"  color="#841584"  />
        <Button  title="OFF"  color="#841584"  />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  