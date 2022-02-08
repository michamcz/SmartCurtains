import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CurtainsCardContent({ deviceObject, navigation}) {
  
  const [sliderValue, setSliderValue] = useState(0);
  
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
    <View style={styles.containerBottomWrap}> 
          <View style={styles.containerBottom1}>
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
            </View>
          </View>
          <View style={styles.containerBottom2}>
          <MaterialCommunityIcons name="arrow-expand-horizontal" color='#EEEEEE' size={20} />
            <View style={styles.sliderView}>
              <Slider
                style={{height: 35}}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#57CC99"
                thumbTintColor='#57CC99'
                maximumTrackTintColor='#232931'
                step={5}
                onValueChange={(value) => setSliderValue(value)}
                onSlidingComplete={(value) => apply(value)}
              />
            </View>
            <Text style={styles.pctText}>
              {sliderValue}%
            </Text>
          </View>
        </View>
  ) 
}
const styles = StyleSheet.create({
  containerBottom1: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: '#232931', //'#393E46'
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
    backgroundColor: 'yellow',
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
    color: "#EEEEEE",
    backgroundColor: '#393E46',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginVertical: 2,
    marginHorizontal: 8,
    width: '25%',
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonView: {
    flex: 0.95,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
  },
  sliderView: {
    flex: 0.7,
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
    fontSize: 18,
    flex: 0.15,
    color: "#EEEEEE",
  },
});
