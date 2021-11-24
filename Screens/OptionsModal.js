import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { mergeItem, removeDevice } from '../DataHandle/handleConfigData';
import Slider from '@react-native-community/slider';
import { sendConfigStepSpeed, sendDayOpenCloseConfig } from '../DataHandle/sendConfigRequest'
import DayTile from '../Components/DayTile'

export default function OptionsModal({ route, navigation }) {

  const { deviceObject } = route.params;
  const weekTable = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const [maxStep, setmaxStep] = React.useState('');
  const [speed, setspeed] = React.useState('0');


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
          <Text style={styles.pctText}> Speed: {speed} </Text>
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
        {
          weekTable.map((value, i) => <DayTile key={i} day={value} deviceObject={deviceObject} />)
        }
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
    </SafeAreaView>
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
    flex: 0.4,
    flexDirection: "row",
    backgroundColor: '#393E46',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 15,
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
    marginHorizontal: 15,
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
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginBottom: 20,
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