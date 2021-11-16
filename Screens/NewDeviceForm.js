import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { saveNewDevice } from '../DataHandle/handleConfigData';
import { sendConfigRequest } from '../DataHandle/sendConfigRequest'

export default function NewDeviceForm({ navigation }) {
  const [name, setName] = React.useState('');
  const [SSID, setSSID] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [ipAddress, setipAddress] = React.useState('');
  const [gateway, setGateway] = React.useState('');
  const [mask, setmask] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        endFillColor="#EEEEEE"
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
          label="SSID"
          value={SSID}
          onChangeText={SSID => setSSID(SSID)}
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
          label="Password"
          value={password}
          onChangeText={password => setpassword(password)}
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
          label="Default gateway"
          value={gateway}
          placeholder="___.___.___.___"
          onChangeText={gateway => setGateway(gateway)}
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
          label="Mask"
          value={mask}
          placeholder="___.___.___.___"
          onChangeText={mask => setmask(mask)}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          sendConfigRequest({ 'ssid': SSID, 'pass': password, 'ip': ipAddress, 'gateway': gateway, 'mask': mask })
          saveNewDevice({ 'name': name, 'ip': ipAddress, 'maxStep': "2300", 'speed': "9" });
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
