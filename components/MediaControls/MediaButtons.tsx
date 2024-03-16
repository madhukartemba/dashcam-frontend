import React from 'react';
import { NativeModules, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const { MediaModule } = NativeModules;

const MediaControls = () => {
    const onPress = (action: string) => {
        if (action === 'playPause') {
            MediaModule.playPauseMedia();
        } else if (action === 'nextTrack') {
            MediaModule.skipToNextTrack();
        } else if (action === 'previousTrack') {
            MediaModule.skipToPreviousTrack();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => onPress('previousTrack')}
                style={styles.button}>
                <Image
                    source={require('./backward-step-solid.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPress('playPause')}
                style={styles.button}>
                <Image
                    source={require('./play-solid.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPress('nextTrack')}
                style={styles.button}>
                <Image
                    source={require('./forward-step-solid.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingHorizontal: 70,
        paddingVertical: 30,
    },
    icon: {
        width: 60,
        height: 70,
        tintColor: 'white',
    },
});

export default MediaControls;
