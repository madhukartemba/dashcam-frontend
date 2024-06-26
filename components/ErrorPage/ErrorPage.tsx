import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Image } from 'react-native';

const ErrorPage = ({ text }: {
    text: string
}) => (
    <View style={styles.container}>
        <Image
            source={require('./exclamationMark.png')}
            style={[styles.icon, { tintColor: 'white' }]}
        />
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
        fontSize: 20,
        color: 'white'
    },
    icon: {
        width: 48,
        height: 48,
    },
});

export default ErrorPage;
