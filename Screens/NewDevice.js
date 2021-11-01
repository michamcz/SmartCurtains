import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function NewDevice({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>NevDevice</Text>
        <Button
        title="ADD NEW DEVICE"
        onPress={() => navigation.navigate('NewDeviceForm')}
      />
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
  