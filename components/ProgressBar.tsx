import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';

const ProgressBarComponent = ({ text, progress }: { text: string, progress: number }) => (
    <View style={styles.container}>
        <ProgressBar
            styleAttr="Horizontal"
            indeterminate={false}
            progress={progress / 100}
            color="white"
            style={styles.progressBar}
        />
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.text}>{`${(progress).toFixed(2)}%`}</Text>

    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 20,
        color: 'white'
    },
    progressBar: {
        width: 100,
        marginBottom: 15
    },
});

export default ProgressBarComponent;
