import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modal, NativeBaseProvider } from 'native-base';
import ColorPicker from 'react-native-wheel-color-picker'
import hexToRGB from '../Tools/hexToRGB';
import EffectsListTile from './EffectListTile';
import axios from 'axios';

export default function CurtainsCardContent({ deviceObject }) {

  const [brightnessValue, setBrightnessValue] = useState(100);
  const [ledStatus, setLedStatus] = useState(null);
  const [currentColor, setCurrentColor] = useState(deviceObject.color || '#FF0000');
  const [currentEffect, setCurrentEffect] = useState(null);
  const [currentPalette, setCurrentPalette] = useState(parseInt(deviceObject.palette) || 0);
  const [showColorModal, setShowColorModal] = useState(false)
  const [showEffectModal, setShowEffectModal] = useState(false)

  const EffectsList = [
    {
      id: '1',
      title: 'Effect 1',
    },
    {
      id: '2',
      title: 'Effect 2',
    },
    {
      id: '3',
      title: 'Effect 3',
    },
    {
      id: '4',
      title: 'Effect 4',
    },
    {
      id: '5',
      title: 'Effect 5',
    },
    {
      id: '6',
      title: 'Effect 6',
    },
    {
      id: '7',
      title: 'Effect 7',
    },
    {
      id: '8',
      title: 'Effect 8',
    },
    {
      id: '9',
      title: 'Effect 9',
    },
    {
      id: '10',
      title: 'Effect 10',
    },
  ];

  const handleEffectClick = (effectId) => {
    setCurrentEffect(effectId)
    applyEffect(parseInt(effectId))
  }

  useEffect(() => {
    //console.log(deviceObject)
    if (parseInt(deviceObject.effect) == 0) {
      setLedStatus(false)
      setCurrentEffect(1)
    }
    else {
      setLedStatus(true)
      setCurrentEffect(deviceObject.effect)
    }
  }, [])

  const handleLedStatusChange = () => {
    if (ledStatus !== false) {
      applyEffect(0)
    }
    else {
      applyEffect(currentEffect);
    }
    setLedStatus(!ledStatus)
  }

  const handlePaleeteChange = () => {
    if (currentPalette < 32) {
      setCurrentPalette(currentPalette + 1)
    }
    else {
      setCurrentPalette(0)
    }
    applyPalette(currentPalette)
  }

  const applyBrightness = (value) => {
    axios.get(`http://${deviceObject.ip}/BRIGHTNESS?brightness=${(value / 100) * 255}`)
      .then(function (response) {
        if (response.ok) return 1;
      })
      .catch(function (error) {
        console.error('ApplyBrightnessError', error);
      })
  }

  const applyColor = (value) => {
    axios.get(`http://${deviceObject.ip}/COLOR?redColor=${hexToRGB(value)[0]}&greenColor=${hexToRGB(value)[1]}&blueColor=${hexToRGB(value)[2]}`)
      .then(function (response) {
        if (response.ok) return 1;
      })
      .catch(function (error) {
        console.error('ApplyColorError', error);
      })
  }

  const applyEffect = (value) => {
    axios.get(`http://${deviceObject.ip}/PATTERN?pattern=${value}`)
      .then(function (response) {
        if (response.ok) return 1;
      })
      .catch(function (error) {
        console.error('ApplyEffectError', error);
      })
  }

  const applyPalette = (value) => {
    axios.get(`http://${deviceObject.ip}/PALETTE?palette=${value}`)
      .then(function (response) {
        if (response.ok) return 1;
      })
      .catch(function (error) {
        console.error('ApplyPaletteError', error);
      })
  }

  return (
    <View style={styles.containerBottomWrap}>

      <NativeBaseProvider>
        <Modal isOpen={showColorModal} onClose={() => setShowColorModal(false)}>
          <Modal.Content maxWidth="500px" style={{ backgroundColor: '#393E46' }}>
            <Modal.CloseButton />
            <Modal.Body>
              <ColorPicker
                color={currentColor}
                thumbSize={30}
                sliderSize={20}
                gapSize={20}
                noSnap={true}
                row={false}
                palette={['#ffffff', '#d11cd5', '#0000ff', '#00aeef', '#03fca5', '#00ff00', '#FFFF00', '#ff4400', '#ff0000']}
                onColorChangeComplete={(color) => { setCurrentColor(color) }}
              />
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#393E46' }}>
              <TouchableOpacity
                style={styles.buttonConfirm}
                onPress={() => {
                  applyColor(currentColor)
                  setShowColorModal(false)
                }}
              >
                <Text style={styles.text}>Confirm</Text>
              </TouchableOpacity>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal isOpen={showEffectModal} onClose={() => setShowEffectModal(false)}>
          <Modal.Content maxWidth="500px" style={{ backgroundColor: '#393E46' }}>
            <Modal.Body>
              {
                EffectsList.map(effect => <EffectsListTile key={effect.id} effectTitle={effect.title} effectId={effect.id} onClick={handleEffectClick} currentEffect={currentEffect} />)
              }
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#393E46' }}>
              <TouchableOpacity
                style={styles.buttonConfirm}
                onPress={() => {
                  setShowEffectModal(false)
                }}
              >
                <Text style={styles.text}>Close</Text>
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
          <Switch value={ledStatus} onValueChange={handleLedStatusChange} />
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
          {
            (currentEffect != 1) ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowColorModal(true)}
              >
                <Text style={styles.text}>Color</Text>
                <View style={[styles.colorIndicator, { backgroundColor: currentColor }]}></View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePaleeteChange()}
              >
                <MaterialCommunityIcons name="palette-outline" color='#EEEEEE' size={20} />
                <Text style={styles.text}> Next</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
      <View style={styles.containerBottom2}>
        <MaterialCommunityIcons name="brightness-6" color='#EEEEEE' size={20} />
        <View style={styles.sliderView}>
          <Slider
            style={{ height: 35 }}
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
    </View >
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
