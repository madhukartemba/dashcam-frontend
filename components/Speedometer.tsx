import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useGpsSpeed from '../hooks/useGpsSpeed';

type Props = {
    speedKmph: number | null;
}

const Speedometer = ({ speedKmph }: Props) => {

    if (speedKmph == null) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>--</Text>
                <Text style={styles.unit}> km/hr</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{speedKmph}</Text>
            <Text style={styles.unit}> km/hr</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold'
    },
    unit: {
        color: 'white',
        fontSize: 20,
    },
});

export default Speedometer;
