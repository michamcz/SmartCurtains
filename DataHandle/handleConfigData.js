import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveNewDevice(device) {
  try {
    await AsyncStorage.setItem(`${device.name}`, JSON.stringify(device))
  } catch (e) {
    console.log('save error ', e)
  }
  console.log(`new device saved: ${device.name}`)
}

export async function getDevicesNamesTable() {
  try {
    console.log(AsyncStorage.getAllKeys())
    return await AsyncStorage.getAllKeys()
  } catch (e) {
    console.log('get names table error ', e)
  }
}

export async function mergeItem(key, mergedValues) {
  try {
    return await AsyncStorage.mergeItem(`${key}`, JSON.stringify(mergedValues))
  } catch (e) {
    console.log('merging error ', e)
  }
}

export async function getOneDeviceObject(deviceName) {
  try {
    const jsonValue = await AsyncStorage.getItem(`${deviceName}`)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log('get one device error ', e)
  }
}

export async function removeDevice(deviceName) {
  try {
    await AsyncStorage.removeItem(`${deviceName}`)
  } catch (e) {
    console.log('remove device error ', e)
  }
  console.log(`device delated: ${deviceName}`)
}

