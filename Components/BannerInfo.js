import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Banner } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function BannerInfo() {
    
  const [visible, setVisible] = React.useState(true);

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'GOT IT',
          color: "grey",
          fontSize: 20,
          flex: 0.5,
          onPress: () => setVisible(false),
        },
      ]}
      icon={() => (
        <MaterialCommunityIcons name="home" color={'black'} size={26} />
      )}>
      <Text style={styles.bannerText}>Make sure your phone is connected via WIFI to the device. If the network is invisible check if the device is in configuration mode. </Text>
    </Banner>
  );  
} 


const styles = StyleSheet.create({
    bannerText: {
      fontSize: 20
    }
  });