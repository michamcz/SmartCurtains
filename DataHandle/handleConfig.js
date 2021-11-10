import AsyncStorage from '@react-native-async-storage/async-storage';

export default function handleConfig(device) {

  console.log(device);

  setObjectValue = async (device) => {
    try {
      await AsyncStorage.setItem(`${device.name}`, JSON.stringify(device))
    } catch (e) {
      console.log('error')
    }
    console.log('Done.')
  }
}

getAllKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  }
  catch (e) {
    console.log(e);
  }
  console.log(keys);
}
