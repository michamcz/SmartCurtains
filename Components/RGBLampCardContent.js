import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native-paper';
import { mergeItem } from '../DataHandle/handleConfigData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modal, NativeBaseProvider, Center } from 'native-base';
import ColorPicker from 'react-native-wheel-color-picker'
import hexToRGB from '../Tools/hexToRGB';
import EffectsListTile from './EffectListTile';

export default function CurtainsCardContent({ deviceObject, navigation}) {
  
  const [brightnessValue, setBrightnessValue] = useState(100);
  const [ledStatus, setLedStatus] = useState(false);
  const [currentColor, setCurrentColor] = useState('#FF00FF');
  const [currentEffect, setCurrentEffect] = useState(1);
  const [showColorModal, setShowColorModal] = useState(false)
  const [showEffectModal, setShowEffectModal] = useState(false)

  const EffectsList = [
    {
      id: '1',
      title: 'First Effect',
    },
    {
      id: '2',
      title: 'Second Effect',
    },
    {
      id: '3',
      title: 'Third Effect',
    },
    {
      id: '4',
      title: 'First Effect',
    },
    {
      id: '5',
      title: 'Second Effect',
    },
    {
      id: '6',
      title: 'Third Effect',
    },
    {
      id: '7',
      title: 'First Effect',
    },
    {
      id: '8',
      title: 'Second Effect',
    },
    {
      id: '9',
      title: 'Third Effect',
    },
    {
      id: '10',
      title: 'First Effect',
    },
    {
      id: '11',
      title: 'Second Effect',
    },
    {
      id: '12',
      title: 'Third Effect',
    },
  ];

  const handleEffectClick = (effectId) => {
    setCurrentEffect(effectId)
  }

  useEffect(() => {
      if (deviceObject.effect = 0) {
        setLedStatus(false)
      }
      else setLedStatus(true)
  }, [])

  useEffect(() => {
    applyColor(currentColor)
  }, [currentColor])

  useEffect(() => {
    applyEffect(currentEffect) 
  }, [currentEffect])

  const applyBrightness = (value) => {
    fetch(`http://${deviceObject.ip}/BRIGHTNESS?brightness=${value}`)
      .then(response => console.log(response))
  }

  const applyColor = (value) => {
    fetch(`http://${deviceObject.ip}/COLOR?redColor=${hexToRGB(value)[0]}&greenColor${hexToRGB(value)[1]}&blueColor=${hexToRGB(value)[2]}`)
      .then(response => console.log(response))
  }

  const applyEffect = (value) => {
    fetch(`http://${deviceObject.ip}/PATTERN?pattern=${value}`)
      .then(response => console.log(response))
  }

  const onLedStatusChange = () => {
    if(ledStatus) {
      applyBrightness(brightnessValue)
      applyColor(currentColor)
      applyEffect(0)
    }
    else {
      applyBrightness(brightnessValue)
      applyColor(currentColor)
      applyEffect(currentEffect)
    }
    setLedStatus(!ledStatus)
  }

  return (
    <View style={styles.containerBottomWrap}> 

      <NativeBaseProvider>
        <Modal isOpen={showColorModal} onClose={() => setShowColorModal(false)}>
            <Modal.Content maxWidth="500px" style={{backgroundColor: '#393E46'}}>
              <Modal.CloseButton />
              <Modal.Body>
                <ColorPicker
                  color={currentColor}
                  thumbSize={30}
                  sliderSize={20}
                  gapSize={20}
                  noSnap={true}
                  row={false}
                  palette = {['#ffffff','#d11cd5','#1633e6','#00aeef','#00c85d','#57ff0a','#ffde17','#f26522','#ed1c24']}
                  onColorChangeComplete = {(color) => {setCurrentColor(color)}}
                />
              </Modal.Body>
              <Modal.Footer style={{backgroundColor: '#393E46'}}>
                <TouchableOpacity
                    style={styles.buttonConfirm}
                    onPress={() => setShowColorModal(false)}
                  >
                  <Text style={styles.text}>Confirm</Text>
                  </TouchableOpacity>
              </Modal.Footer>
            </Modal.Content>
          </Modal>

          <Modal isOpen={showEffectModal} onClose={() => setShowEffectModal(false)}>
            <Modal.Content maxWidth="500px" style={{backgroundColor: '#393E46'}}>
              <Modal.Body>
                {
                  EffectsList.map(effect => <EffectsListTile key={effect.id} effectTitle={effect.title} effectId={effect.id} onClick={handleEffectClick} currentEffect={currentEffect}/>)
                }
              </Modal.Body>
              <Modal.Footer style={{backgroundColor: '#393E46'}}>
                <TouchableOpacity
                    style={styles.buttonConfirm}
                    onPress={() => setShowEffectModal(false)}
                >
                <Text style={styles.text}>Confirm</Text>
                </TouchableOpacity>
              </Modal.Footer>
            </Modal.Content>
          </Modal>

          </NativeBaseProvider>
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
                onPress={() => setShowEffectModal(true)}
              >
                <Text style={styles.text}>Effect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowColorModal(true)}
              >
                <Text style={styles.text}>Color</Text>
                <View style={[styles.colorIndicator, {backgroundColor: currentColor}]}></View>
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
  buttonConfirm: {
    flex: 1,
    color: "#EEEEEE",
    backgroundColor: '#232931',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
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
  },
  modal: {
    backgroundColor: 'white', 
    padding: 20,
  }
});
