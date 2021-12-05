import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { getOneDeviceObject } from '../DataHandle/handleConfigData';
import { useFocusEffect } from '@react-navigation/core';
import syncData from '../Tools/syncData';

export default function DeviceCard({ navigation, deviceKey, rerender }) {

  const [rerenderr, setrerenrerr] = useState(false);
  const [renderCard, setrenderCard] = useState(false);
  const [fetchData, setfetchData] = useState(false)
  const [sliderValue, setSliderValue] = useState(0);
  const [deviceObject, setDeviceObject] = useState({ 'name': 'default', 'ip': '192.168.1.2', 'maxStep': "2300", 'speed': "9" });
  const [loading, setloading] = useState(true);
  const [syncDone, setSyncDone] = useState(false);
  const [syncMessage, setSyncMessage] = useState();

  useFocusEffect(() => {
    setrerenrerr(rerender)
  })

  React.useEffect(() => {
    setSyncDone(false)
    const sync = async () => {
      try {
        const data = await getOneDeviceObject(deviceKey)
        const sync = await syncData(data)
        setSyncDone(true)
        setfetchData(!fetchData)
        setSyncMessage(sync)
      } catch (e) {
        console.log('sync effect error ', e)
      }
    }
    sync();
  }, [renderCard])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = await getOneDeviceObject(deviceKey)
        setDeviceObject(data)
        //console.log(data)
        setloading(false);
      } catch (e) {
        console.log('get names table error ', e)
      }
      return () => {
        setloading(false);
      }
    }
    fetchData();
  }, [rerenderr, fetch]);

  const open = () => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=0`)
      .then(response => console.log(response));
  }

  const close = () => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=${deviceObject.maxStep}`)
      .then(response => console.log(response));
  }

  const apply = (value) => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=${(value / 100) * deviceObject.maxStep}`)
      .then(response => console.log(response))
  }
  return (
    (!loading && syncDone) ? (
      <View style={styles.containerMain}>
        {
          (syncMessage == false) ? (
            <View style={styles.errorView}>
              <TouchableOpacity
                style={styles.buttonError}
                onPress={() => setrenderCard(!renderCard)}
              >
                <Text style={styles.errorText}>
                  Unable to connect!
                </Text>
                <MaterialCommunityIcons name="reload" color='yellow' size={22} />
              </TouchableOpacity>
            </View>
          ) : (<View></View>)
        }
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
      </View >
    ) : (
      <View style={styles.LoadingSpinner}>
        <ActivityIndicator size="large" color="#57CC99" />
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
  },
  LoadingSpinner: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  containerTop: {
    flex: 0.65,
    flexDirection: "row",
    backgroundColor: '#232931',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8,
    alignSelf: 'stretch',
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
  },
  errorText: {
    color: 'yellow',
    paddingHorizontal: 10,
  },
  errorView: {
    //backgroundColor: '#393E46',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonError: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});