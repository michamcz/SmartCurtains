import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { getOneDeviceObject } from '../DataHandle/handleConfigData';

export default function DeviceCard({ navigation, deviceKey }) {

  const [sliderValue, setSliderValue] = React.useState(0);
  const [deviceObject, setDeviceObject ] = React.useState();
  const [loading, setloading ] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setloading(true); 
      try {  
        const data = await getOneDeviceObject(deviceKey)
        setDeviceObject(data)
        console.log(data)
        setloading(false); 
      } catch(e) {  
        console.log('get names table error ', e)
      }
    }
    fetchData();
  }, []);

  const open = () => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=1000`)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const close = () => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=0`)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const apply = (value) => {
    fetch(`http://${deviceObject.ip}/MOVE?moveTO=${value}`)
      .then(response => response.json())
      .then(data => console.log(data));
  }
  return (
    !loading ? (
    <View style={styles.containerMain}>
      <View style={styles.containerTop}>
        <Text style={{ fontSize: 20, color: 'white' }}>{JSON.stringify(deviceObject.name) || 'a'}</Text>
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
            onPress={() => navigation.navigate('OptionsModal', JSON.stringify(deviceObject.name))}
          >
            <MaterialCommunityIcons name="cog-outline" color='white' size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.sliderView}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="tomato"
            thumbTintColor='tomato'
            maximumTrackTintColor="white"
            step={1}
            onValueChange={(value) => setSliderValue(value)}
          />
        </View>
        <Text style={styles.pctText}>
          {sliderValue}%
        </Text>
        <TouchableOpacity 
        style={styles.applyButton}
        onPress={() => apply()}
        >
          <Text style={styles.text}> Apply </Text>
        </TouchableOpacity>
      </View>
    </View>
    ) : (
    <View>
      <Text>
        LOADING!
      </Text>
    </View>
    )
    
  );
}
const styles = StyleSheet.create({
  containerMain: {
    flex: 0.3,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 7,
    alignSelf: 'stretch',
  },
  containerTop: {
    flex: 0.65,
    flexDirection: "row",
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8,
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
    color: "#841584",
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    margin: 5,
    width: '25%',
    paddingVertical: 10,
  },
  buttonView: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    //backgroundColor: 'white',
    alignSelf: 'stretch',
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
    backgroundColor: 'lightgray',
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
    color: 'white',
  },
  applyButton: {
    backgroundColor: 'tomato',
    margin: 1,
    padding: 3,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pctText: {
    fontSize: 16,
    flex: 0.15,
  }
});