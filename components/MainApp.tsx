import React, { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimeDisplay from './DateTimeDisplay';
import TrafficLight from './Inference/TrafficLight';
import SettingsButton from './Settings/SettingsButton/SettingsButton';
import { updateUrl } from './redux/action';
import SoundManager from './sound/SoundManager';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Inference } from './Inference/Inference';
import NewModuleButton from './MediaControls/MediaButtons';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'MainApp'> }

function MainApp({ navigation }: Props) {
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
                    <NewModuleButton />
                </View>
                <View style={styles.rightContent}>
                    {/* <Inference /> */}
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
        justifyContent: 'center',
    },
    rightContent: {
        flex: 0.3,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainApp;
