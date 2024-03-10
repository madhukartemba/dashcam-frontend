import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';

const Loading = ({ text }: {
    text: string
}) => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.text}>{text}</Text>
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
        fontSize: 16,
        color: 'white'
    },
});

export default Loading;
