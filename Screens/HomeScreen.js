import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import DeviceCard from '../Components/DeviceCard';
import { getDevicesNamesTable } from '../DataHandle/handleConfigData';
import { useFocusEffect } from '@react-navigation/core';

export default function HomeScreen({ route, navigation }) {

  const { rerender } = route.params;
  const [rerenderr, setrerenrerr] = React.useState(false);
  const [devicesTab, setdevicesTab] = React.useState([]);
  const [loading, setloading] = React.useState(true)


  useFocusEffect(() => {
    setrerenrerr(rerender)
  })

  React.useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const data = await getDevicesNamesTable()
        //data.shift(); //dev
        setdevicesTab(data)
        setloading(false);
      } catch (e) {
        console.log('get names table error ', e)
      }
      return () => {
        console.log('homescreencleanup');
        setloading(false);
      }
    }
    fetchData();
    navigation.setParams({
      rerender: 'false',
    });
  }, [rerenderr]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {
          (!loading) ? (
            devicesTab.map((value, i) => <DeviceCard key={i} rerender={rerenderr} deviceKey={value} navigation={navigation} />)
          ) : (
            <View>
              <Text>
                Loading...
              </Text>
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#232931',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scroll: {
    width: '100%',
    backgroundColor: '#232931',
  }
});
