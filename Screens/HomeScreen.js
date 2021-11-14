import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import DeviceCard from '../Components/DeviceCard';
import { getDevicesNamesTable } from '../DataHandle/handleConfigData';

export default function HomeScreen({ navigation }) {
  
  const [devicesTab, setdevicesTab] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {   
        const data = await getDevicesNamesTable()
        setdevicesTab(data)
      } catch(e) {  
        console.log('get names table error ',e)
      }
    }
    fetchData();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      {
        devicesTab ? (
          devicesTab.map((value,i) => <DeviceCard key={i} deviceKey={value} navigation={navigation} />)
          ) : null    
      }
    </SafeAreaView>
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
