import React from 'react';
import { NativeModules, Button, View, StyleSheet } from 'react-native';
const { MediaModule } = NativeModules;

const NewModuleButton = () => {
    const onPress = (action: string) => {
        console.log('We will invoke the native module here!');
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
            <Button
                title="Play/Pause"
                color="#841584"
                onPress={() => onPress('playPause')}
            />
            <Button
                title="Next Track"
                color="#841584"
                onPress={() => onPress('nextTrack')}
            />
            <Button
                title="Previous Track"
                color="#841584"
                onPress={() => onPress('previousTrack')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});

export default NewModuleButton;
