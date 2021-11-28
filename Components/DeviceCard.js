import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { getOneDeviceObject } from '../DataHandle/handleConfigData';
import { useFocusEffect } from '@react-navigation/core';

export default function DeviceCard({ navigation, deviceKey, rerender }) {

  const [rerenderr, setrerenrerr] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(0);
  const [deviceObject, setDeviceObject] = React.useState({ 'name': 'default', 'ip': '192.168.1.2', 'maxStep': "2300", 'speed': "9" });
  const [loading, setloading] = React.useState(true);

  useFocusEffect(() => {
    setrerenrerr(rerender)
  })

  React.useEffect(() => {
    setloading(true)
    const fetchData = async () => {
      try {
        const data = await getOneDeviceObject(deviceKey)
        if (loading) {
          setDeviceObject(data)
          //console.log(data)
          setloading(false);
        }
      } catch (e) {
        console.log('get names table error ', e)
      }
      return () => {
        setloading(false);
      }
    }
    fetchData();
  }, [rerenderr]);

  const open = () => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=0`)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const close = () => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=${deviceObject.maxStep}`)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const apply = (value) => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=${(value / 100) * deviceObject.maxStep}`)
      .then(response => response.json())
      .then(data => console.log(data));
  }
  return (
    !loading ? (
      <View style={styles.containerMain}>
        <View style={styles.containerTop}>
          <Text style={{ fontSize: 20, color: '#EEEEEE' }}>{`${deviceObject.name}` || 'default'}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => open()}
            >
              <Text style={styles.text}>Open</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => close()}
            >
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOption}
              onPress={() => navigation.navigate('OptionsModal', { deviceObject })}
            >
              <MaterialCommunityIcons name="cog-outline" color='#EEEEEE' size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.sliderView}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#57CC99"
              thumbTintColor='#57CC99'
              maximumTrackTintColor='#232931'
              step={1}
              onValueChange={(value) => setSliderValue(value)}
            />
          </View>
          <Text style={styles.pctText}>
            {sliderValue}%
          </Text>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => apply(sliderValue)}
          >
            <Text style={[styles.text, { color: 'black' }]}> Apply </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View>
        <Text style={styles.text}>
          Loading...
        </Text>
      </View>
    )

  );
}
const styles = StyleSheet.create({
  containerMain: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 7,
    borderBottomWidth: 1,
    borderColor: '#57CC99',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerTop: {
    flex: 0.65,
    flexDirection: "row",
    backgroundColor: '#232931',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8,
    alignSelf: 'stretch',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  button: {
    flex: 1,
    color: "#EEEEEE",
    backgroundColor: '#393E46',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    margin: 5,
    width: '25%',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonView: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    //backgroundColor: 'white',
    alignSelf: 'stretch',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonOption: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    padding: 5,
  },
  containerBottom: {
    flex: 0.35,
    flexDirection: "row",
    backgroundColor: '#393E46',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    alignSelf: 'stretch',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  sliderView: {
    flex: 0.5,
  },
  text: {
    fontSize: 18,
    color: "#EEEEEE",
  },
  applyButton: {
    backgroundColor: '#57CC99',
    margin: 1,
    padding: 3,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  pctText: {
    fontSize: 16,
    flex: 0.15,
    color: "#EEEEEE",
  }
});