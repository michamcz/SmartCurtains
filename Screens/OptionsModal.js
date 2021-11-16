import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { mergeItem, removeDevice, getOneDeviceObject } from '../DataHandle/handleConfigData';
import Slider from '@react-native-community/slider';
import { sendConfigStepSpeed } from '../DataHandle/sendConfigRequest'

export default function OptionsModal({ route, navigation }) {

  const { deviceObject } = route.params;
  const [maxStep, setmaxStep] = React.useState('');
  const [speed, setspeed] = React.useState('');

  React.useEffect(() => {
    setmaxStep(deviceObject.maxStep)
    setspeed(deviceObject.speed)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.textName} >{`${deviceObject.name}(${deviceObject.ip})`}</Text>
        <TextInput
          style={styles.textInput}
          label="Maximal Step"
          value={maxStep}
          onChangeText={value => setmaxStep(value)}
        />
        <View style={styles.containerBottom}>
          <Text style={styles.pctText}> Speed </Text>
          <View style={styles.sliderView}>
            <Slider
              minimumValue={1}
              maximumValue={10}
              minimumTrackTintColor="tomato"
              thumbTintColor='tomato'
              maximumTrackTintColor="white"
              step={1}
              onValueChange={(value) => setspeed(value)}
            />
          </View>
          <Text style={styles.pctText}>
            {speed}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => {
            removeDevice(deviceObject.name)
            navigation.navigate('Home', { rerender: 'true' });
          }}
        >
          <Text style={styles.buttonText}> Delete Device </Text>
          <MaterialCommunityIcons name="remove" color='white' size={30} />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log(maxStep)
          sendConfigStepSpeed({ maxStep, speed: speed + 4, ip: deviceObject.ip })
          mergeItem(deviceObject.name, { maxStep, speed: speed })
          navigation.navigate('Home', { rerender: 'true' });
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
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  containerBottom: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 25,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  textInput: {
    margin: 8,
    marginHorizontal: 25,
  },
  textName: {
    margin: 8,
    marginHorizontal: 25,
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
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
    marginVertical: 8,
    marginHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  sliderView: {
    flex: 0.7,
  },
  pctText: {
    fontSize: 16,
    flex: 0.10,
  }
});