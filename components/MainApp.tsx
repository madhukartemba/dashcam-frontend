import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import DateTimeDisplay from './DateTimeDisplay';
import SettingsButton from './Settings/SettingsButton/SettingsButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Inference } from './Inference/Inference';
import MediaControls from './MediaControls/MediaButtons';
import Speedometer from './Speedometer';
import useGpsSpeed from '../hooks/useGpsSpeed';
import { Dashcam } from './Dashcam/Dashcam';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'MainApp'> }

function MainApp({ navigation }: Props) {

    const { speedKmph } = useGpsSpeed();

    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <SettingsButton handlePress={() => {
                    navigation.push('Settings');
                }} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.leftContent}>
                    <DateTimeDisplay />
                    <MediaControls />
                </View>
                <View style={styles.rightContent}>
                    <Inference speedKmph={speedKmph} />
                    <View style={styles.speedometer}>
                        <Speedometer speedKmph={speedKmph} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    settingsContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    leftContent: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rightContent: {
        flex: 0.3,
        backgroundColor: 'black',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    speedometer: {
        flex: 0.75
    }
});

export default MainApp;
