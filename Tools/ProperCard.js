import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RGBLampCardContent from '../Components/RGBLampCardContent';
import CurtainsCardContent from '../Components/CurtainsCardContent';

export default function ProperCard({deviceObject}) {
    //console.log(deviceObject)
    if(deviceObject.type == 1) {

        return <CurtainsCardContent deviceObject = {deviceObject}/>
    }
    else if(deviceObject.type == 2) {
        return <RGBLampCardContent deviceObject = {deviceObject}/>
    }
    else return (
        <View style={styles.containterBottom}>
            <Text style={styles.errorText}>Something went wrong :|</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containterBottom: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: '#393E46',
        fontSize: 18,
        paddingVertical: 20,
    },
})