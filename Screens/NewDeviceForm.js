import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import handleConfig from '../DataHandle/handleConfig';

export default function NewDeviceForm({ navigation }) {
  const [name, setName] = React.useState('');
  const [SSID, setSSID] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [ipAddress, setipAddress] = React.useState('');
  const [gateway, setGateway] = React.useState('');
  const [mask, setmask] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.textInput}
          label="Name"
          value={name}
          onChangeText={name => setName(name)}
        />
        <TextInput
          style={styles.textInput}
          label="SSID"
          value={SSID}
          onChangeText={SSID => setSSID(SSID)}
        />
        <TextInput
          style={styles.textInput}
          label="Password"
          value={password}
          onChangeText={password => setpassword(password)}
        />
        <TextInput
          style={styles.textInput}
          label="IP address"
          value={ipAddress}
          placeholder="___.___.___.___"
          onChangeText={ipAddress => setipAddress(ipAddress)}
        />
        <TextInput
          style={styles.textInput}
          label="Default gateway"
          value={gateway}
          placeholder="___.___.___.___"
          onChangeText={gateway => setGateway(gateway)}
        />
        <TextInput
          style={styles.textInput}
          label="Mask"
          value={mask}
          placeholder="___.___.___.___"
          onChangeText={mask => setmask(mask)}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleConfig({ 'name': name, 'ssid': SSID, 'pass': password, 'ip': ipAddress, 'gatway': gateway, 'mask': mask });
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.buttonText}> Configure </Text>
      </TouchableOpacity>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    margin: 8,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: 'tomato',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
});
