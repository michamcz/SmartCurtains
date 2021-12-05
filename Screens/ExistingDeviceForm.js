import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { saveNewDevice } from '../DataHandle/handleConfigData';
import { parse20signs, parseIP } from '../Tools/parseInput';

export default function ExistingDeviceForm({ navigation }) {

  const [name, setName] = React.useState('');
  const [ipAddress, setipAddress] = React.useState('');
  const [ipParsed, setipParsed] = React.useState(true);
  const [nameParsed, setnameParsed] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        endFillColor="#232931"
      >
        <TextInput
          style={styles.textInput}
          mode="outlined"
          outlineColor='#393E46'
          error={!nameParsed}
          onFocus={() => setnameParsed(true)}
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
        {
          (!nameParsed) ? (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>
                Name should contain maximum 20 characters
              </Text>
            </View>
          ) : (
            <View></View>
          )
        }
        <TextInput
          style={styles.textInput}
          mode="outlined"
          error={!ipParsed}
          onFocus={() => setipParsed(true)}
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
        {
          (!ipParsed) ? (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>
                Invalid IP address
              </Text>
            </View>
          ) : (
            <View></View>
          )
        }
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setipParsed(parseIP(ipAddress))
          setnameParsed(parse20signs(name))
          if (parseIP(ipAddress) && parse20signs(name)) {
            saveNewDevice({ 'name': name, 'ip': ipAddress, 'maxStep': "2000", 'speed': "8", });
            navigation.navigate('Home', { rerender: 'true' });
          }
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
    marginHorizontal: 8,
    marginTop: 15,
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
  },
  errorView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#bb0000',
  },
});
