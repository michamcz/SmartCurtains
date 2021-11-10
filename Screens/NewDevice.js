import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import BannerInfo from '../Components/BannerInfo';

export default function NewDevice({ navigation }) {
  return (
    <>
      <BannerInfo />
      <View style={styles.container} >
        <Text> Hey </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewDeviceForm')}
        >
          <Text style={styles.buttonText}> Configure new Device </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 20
  },
  button: {
    backgroundColor: 'tomato',
    width: '70%',
    padding: 15,
    margin: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
});
