import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native-paper';
import { mergeItem } from '../DataHandle/handleConfigData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CurtainsCardContent({ deviceObject, navigation}) {
  
  //const [deviceObject, setDeviceObject] = useState({ 'name': 'default', 'ip': '192.168.1.2', 'maxStep': "2300", 'speed': "9" });
  const [brightnessValue, setBrightnessValue] = useState(100);
  const [ledStatus, setLedStatus] = useState(false);
  const [actualColor, setactualColor] = useState('#FF00FF');

  useEffect(() => {
      if (deviceObject.status) {
        setLedStatus(deviceObject.status)
      }
      else setLedStatus(false)
  }, [])

  const onLedStatusChange = () => {
    setLedStatus(!ledStatus)
  }

  const ledON = () => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=0`)
      .then(response => console.log(response));
  }

  const ledOFF = () => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=${deviceObject.maxStep}`)
      .then(response => console.log(response));
  }

  const applyBrightness = (value) => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=${(value / 100) * deviceObject.maxStep}`)
      .then(response => console.log(response))
  }

  
  return (
    <View style={styles.containerBottomWrap}> 
          <View style={styles.containerBottom1}>
            <View style={styles.SwitchTextContainer}>
              <Text style={!ledStatus ? styles.text : styles.textDisactive}> OFF </Text> 
            </View>
            <View style={styles.SwitchContainer}>
              <Switch value={ledStatus} onValueChange={onLedStatusChange} />
            </View>
            <View style={styles.SwitchTextContainer}>
              <Text style={ledStatus ? styles.text : styles.textDisactive}> ON </Text>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => applyBrightness(1)}
              >
                <Text style={styles.text}>Effect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => applyBrightness(1)}
              >
                <Text style={styles.text}>Color</Text>
                <View style={[styles.colorIndicator, {backgroundColor: actualColor}]}></View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerBottom2}>
          <MaterialCommunityIcons name="brightness-6" color='#EEEEEE' size={20} />
            <View style={styles.sliderView}>
              <Slider
                style={{height: 35}}
                value={100}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#57CC99"
                thumbTintColor='#57CC99'
                maximumTrackTintColor='#232931'
                step={5}
                onValueChange={(value) => setBrightnessValue(value)}
                onSlidingComplete={(value) => applyBrightness(value)}
              />
            </View>
            <Text style={styles.pctText}>
              {brightnessValue}%
            </Text>
          </View>
        </View>
  ) 
}
const styles = StyleSheet.create({
  containerBottom1: {
    flex: 0.5,
    flexDirection: "row", //'#232931
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 5,
    alignSelf: 'stretch',
  },
  containerBottom2: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: '#393E46',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
    alignSelf: 'stretch',
  },
  containerBottomWrap: {
    flex: 0.70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#57CC99',
    alignSelf: 'stretch',
  },
  button: {
    flex: 0.5,
    color: "#EEEEEE",
    backgroundColor: '#393E46',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonView: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
    paddingVertical: 2,
  },
  sliderView: {
    flex: 0.7,
  },
  text: {
    fontSize: 18,
    color: "#EEEEEE",
  },
  textDisactive: {
    color: 'gray',
    fontSize: 18,
  },
  pctText: {
    fontSize: 18,
    flex: 0.15,
    color: "#EEEEEE",
  },
  SwitchTextContainer: {
    flex: 0.15,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SwitchContainer: {
    flex: 0.15,
    paddingRight: 5,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colorIndicator: {
    width: 18,
    height: 18,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 5,
  }
});
