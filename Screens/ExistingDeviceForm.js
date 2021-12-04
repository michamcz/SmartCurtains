import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { saveNewDevice } from '../DataHandle/handleConfigData';

export default function ExistingDeviceForm({ navigation }) {

  const [name, setName] = React.useState('');
  const [ipAddress, setipAddress] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        endFillColor="#232931"
      >
        <TextInput
          style={styles.textInput}
          mode="outlined"
          outlineColor='#393E46'
          activeOutlineColor='#57CC99'
          style={styles.textInput}
          raised theme={{
            colors: {
              primary: '#57CC99',
              text: '#EEEEEE',
              placeholder: '#EEEEEE',
              accent: '#232931',
            },
            roundness: 12,
          }}
          label="Name"
          value={name}
          onChangeText={name => setName(name)}
        />
        <TextInput
          style={styles.textInput}
          mode="outlined"
          outlineColor='#393E46'
          activeOutlineColor='#57CC99'
          style={styles.textInput}
          raised theme={{
            colors: {
              primary: '#57CC99',
              text: '#EEEEEE',
              placeholder: '#EEEEEE',
              accent: '#232931',
            },
            roundness: 12,
          }}
          label="IP address"
          value={ipAddress}
          placeholder="___.___.___.___"
          onChangeText={ipAddress => setipAddress(ipAddress)}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          saveNewDevice({ 'name': name, 'ip': ipAddress, 'maxStep': "2000", 'speed': "8", });
          navigation.navigate('Home', { rerender: 'true' });
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
    backgroundColor: '#232931',
  },
  textInput: {
    margin: 8,
    marginHorizontal: 15,
    backgroundColor: '#393E46',
  },
  button: {
    backgroundColor: '#57CC99',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    color: '#EEEEEE',
    fontSize: 20,
  }
});
