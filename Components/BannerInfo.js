import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Banner } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function BannerInfo() {

  const [visible, setVisible] = React.useState(true);

  return (
    <Banner
      visible={visible}
      style={styles.banner}
      actions={[
        {
          label: 'GOT IT',
          color: '#EEEEEE',
          fontSize: 20,
          flex: 0.5,
          onPress: () => setVisible(false),
        },
      ]}
      icon={() => (
        <MaterialCommunityIcons name="google-downasaur" color={'#EEEEEE'} size={35} />
      )}>
      <Text style={styles.bannerText}>Make sure your phone is connected via WIFI to the device. If the network is invisible check if the device is in configuration mode. </Text>
    </Banner>
  );
}


const styles = StyleSheet.create({
  bannerText: {
    fontSize: 20,
    color: '#EEEEEE'
  },
  banner: {
    backgroundColor: "#393E46"
  }
});