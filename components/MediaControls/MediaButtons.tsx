import React, { useState, useEffect } from 'react';
import { NativeModules, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const { MediaModule } = NativeModules;

const MediaControls = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const fetchPlayingState = () => {
        MediaModule.getPlaybackState()
            .then((playbackState: number) => {
                setIsPlaying(playbackState === 3);
            })
            .catch((error: unknown) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchPlayingState()
    }, []);

    const onPress = async (action: string) => {
        if (action === 'playPause') {
            await MediaModule.playPauseMedia();
            setIsPlaying((isPlaying) => !isPlaying);
        } else if (action === 'nextTrack') {
            await MediaModule.skipToNextTrack();
        } else if (action === 'previousTrack') {
            await MediaModule.skipToPreviousTrack();
        }

        setTimeout(() => {
            fetchPlayingState()
        }, 1500);
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
                    source={isPlaying ? require('./pause-solid.png') : require('./play-solid.png')}
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
