import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import DeviceCard from '../Components/DeviceCard';
import { getDevicesNamesTable } from '../DataHandle/handleConfigData';
import { useFocusEffect } from '@react-navigation/core';

export default function HomeScreen({ route, navigation }) {

  const { rerender } = route.params;
  const [rerenderr, setrerenrerr] = React.useState(false);
  const [devicesTab, setdevicesTab] = React.useState([]);
  const [loading, setloading] = React.useState(false)


  useFocusEffect(() => {
    setloading(true)
    setrerenrerr(rerender)
  })

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          const data = await getDevicesNamesTable()
          setdevicesTab(data)
          console.log(data)
          setloading(false)
        }
      } catch (e) {
        console.log('get names table error ', e)
      }
      return () => {
        setloading(false)
      }
    }
    fetchData();
    navigation.setParams({
      rerender: 'false',
    });
  }, [rerenderr]);

  return (
    setloading ? (
      <SafeAreaView style={styles.container}>
        {
          devicesTab ? (
            devicesTab.map((value, i) => <DeviceCard key={i} rerender={rerenderr} deviceKey={value} navigation={navigation} />)
          ) : null
        }
      </SafeAreaView>
    ) : <Text> Loading... </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scroll: {
    width: '100%',
    backgroundColor: 'gray',
  }
});
