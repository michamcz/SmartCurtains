import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function NewDeviceForm() {
  const [SSID, setSSID] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [ipAddress, setipAddress] = React.useState('');
  const [mask, setmask] = React.useState('');
    return (
      <View style={styles.container}>
        <TextInput
          label="SSID"
          value={SSID}
          onChangeText={SSID => setSSID(SSID)}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={password => setpassword(password)}
        />
        <TextInput
          label="IP address"
          value={ipAddress}
          onChangeText={ipAddress => setipAddress(ipAddress)}
        />
        <TextInput
          label="mask"
          value={mask}
          onChangeText={mask => setmask(mask)}
        />
        <Button title="SUBMIT"  color="#841584"/>
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
  