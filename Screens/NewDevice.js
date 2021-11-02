import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BannerInfo from '../Components/BannerInfo';

export default function NewDevice({ navigation }) {
  return (
    <>
      <BannerInfo />
      <View style={styles.container} >
        <Text>NewDevice</Text>
        <Button
          title="ADD NEW DEVICE"
          onPress={() => navigation.navigate('NewDeviceForm')}
        />
      </View>
    </>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bannerText: {
      fontSize: 20
    }
  });
  