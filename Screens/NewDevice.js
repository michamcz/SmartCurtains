import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import BannerInfo from '../Components/BannerInfo';

export default function NewDevice({ navigation }) {
  return (
    <>
      <BannerInfo />
      <View style={styles.container} >
        <Text style={styles.buttonText}> Hey! </Text>
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
    backgroundColor: '#232931',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 20
  },
  button: {
    backgroundColor: '#393E46',
    width: '70%',
    padding: 15,
    margin: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#57CC99',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonText: {
    color: '#EEEEEE',
    fontSize: 20,
  }
});
