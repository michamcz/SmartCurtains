import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { TextInput, Switch } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { mergeItem, removeDevice, getOneDeviceObject } from '../DataHandle/handleConfigData';
import Slider from '@react-native-community/slider';
import { sendConfigStepSpeed } from '../DataHandle/sendConfigRequest'

export default function OptionsModal({ route, navigation }) {

  const { deviceObject } = route.params;
  const [maxStep, setmaxStep] = React.useState('');
  const [speed, setspeed] = React.useState('');
  const [Mon, setMon] = React.useState({ active: false, openHour: '-', closeHour: '-' });
  // const [Tue, setTue] = React.useState(false);
  // const [Wed, setWed] = React.useState(false);
  // const [Thu, setThu] = React.useState(false);
  // const [Fri, setFri] = React.useState(false);
  // const [Sat, setSat] = React.useState(false);
  // const [Sun, setSun] = React.useState(false);

  const onMonChange = () => setMon((prevState) => ({ ...prevState, active: !prevState.active }))

  React.useEffect(() => {
    setmaxStep(deviceObject.maxStep)
    setspeed(deviceObject.speed)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.textName} >{`${deviceObject.name} (${deviceObject.ip})`}</Text>
        <TextInput
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
            dense: true,
          }}
          label="Maximal Step"
          value={maxStep}
          onChangeText={value => setmaxStep(value)}
        />
        <View style={styles.containerBottom}>
          <Text style={styles.pctText}> Speed : {speed} </Text>
          <View style={styles.sliderView}>
            <Slider
              minimumValue={1}
              maximumValue={10}
              value={parseInt(speed)}
              minimumTrackTintColor="#57CC99"
              thumbTintColor='#57CC99'
              maximumTrackTintColor='#232931'
              step={1}
              onValueChange={(value) => setspeed(value)}
            />
          </View>
        </View>
        <View style={styles.containerBottom}>
          <Text style={styles.pctText}> Mon </Text>
          <Switch value={Mon.active} onValueChange={onMonChange} />;
          <TextInput
            mode="outlined"
            outlineColor='#393E46'
            activeOutlineColor='#57CC99'
            style={styles.textHourInput}
            raised theme={{
              colors: {
                primary: '#57CC99',
                text: '#EEEEEE',
                placeholder: '#EEEEEE',
                accent: '#232931',
              },
              roundness: 12,
              dense: true,
            }}
            label="Open Hour"
            value={maxStep}
            onChangeText={value => setmaxStep(value)}
          />
          <TextInput
            mode="outlined"
            outlineColor='#393E46'
            activeOutlineColor='#57CC99'
            style={styles.textHourInput}
            raised theme={{
              colors: {
                primary: '#57CC99',
                text: '#EEEEEE',
                placeholder: '#EEEEEE',
                accent: '#232931',
              },
              roundness: 12,
              dense: true,
            }}
            label="Open Min"
            value={maxStep}
            onChangeText={value => setmaxStep(value)}
          />
          <TextInput
            mode="outlined"
            outlineColor='#393E46'
            activeOutlineColor='#57CC99'
            style={styles.textHourInput}
            raised theme={{
              colors: {
                primary: '#57CC99',
                text: '#EEEEEE',
                placeholder: '#EEEEEE',
                accent: '#232931',
              },
              roundness: 12,
              dense: true,
            }}
            label="Close Hour"
            value={maxStep}
            onChangeText={value => setmaxStep(value)}
          />
          <TextInput
            mode="outlined"
            outlineColor='#393E46'
            activeOutlineColor='#57CC99'
            style={styles.textHourInput}
            raised theme={{
              colors: {
                primary: '#57CC99',
                text: '#EEEEEE',
                placeholder: '#EEEEEE',
                accent: '#232931',
              },
              roundness: 12,
              dense: true,
            }}
            label="CloseMin"
            value={maxStep}
            onChangeText={value => setmaxStep(value)}
          />

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
          sendConfigStepSpeed({ maxStep, speed: 14 - speed, ip: deviceObject.ip })
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
    backgroundColor: '#232931',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  containerBottom: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#393E46',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginHorizontal: 25,
    marginBottom: 15,
    alignSelf: 'stretch',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  textInput: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#393E46',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  textHourInput: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#232931',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  textName: {
    margin: 8,
    marginHorizontal: 25,
    alignSelf: 'center',
    color: '#EEEEEE',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#57CC99',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonDelete: {
    backgroundColor: '#393E46',
    padding: 15,
    paddingHorizontal: 25,
    marginHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#57CC99',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  buttonText: {
    color: '#EEEEEE',
    fontSize: 20,
  },
  sliderView: {
    flex: 0.6,
  },
  pctText: {
    fontSize: 20,
    color: '#EEEEEE',
    flex: 0.4,
  }
});