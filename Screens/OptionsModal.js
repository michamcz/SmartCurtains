import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { mergeItem, removeDevice, getOneDeviceObject } from '../DataHandle/handleConfigData';

export default function OptionsModal({ route, navigation}) {

  const [maxStep, setmaxStep] = React.useState('100');
  const [speed, setspeed] = React.useState('10');
  const {deviceObject} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.textInput}
          label="Maximal Step"
          value={deviceObject.maxStep}
          onChangeText={maxStep => setmaxStep(maxStep)}
        />
        <TextInput
          style={styles.textInput}
          label="Speed"
          value={deviceObject.speed}
          onChangeText={speed => setspeed(speed)}
        />
        <TouchableOpacity 
        style={styles.buttonDelete} 
        onPress={() => {
          removeDevice(deviceKey)
          navigation.navigate('Home');
        }}
        >
          <Text style={styles.buttonText}> Delete Device </Text>
          <MaterialCommunityIcons name="remove" color='white' size={30} />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          mergeItem(deviceobject.name, {maxStep, speed})
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.buttonText}> Configure </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  textInput: {
    margin: 8,
    marginHorizontal: 25,
  },
  button: {
    backgroundColor: 'tomato',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonDelete: {
    backgroundColor: 'gray',
    padding: 15,
    paddingHorizontal: 30,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
});