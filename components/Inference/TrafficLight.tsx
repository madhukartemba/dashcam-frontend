import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Data} from '../../hooks/useGetData';

type Props = {
  data: Data;
};

const TrafficLight: React.FC<Props> = ({data}) => {
  const getColorStyle = (
    color: 'red' | 'green' | 'yellow' | null,
    bulbColor: 'red' | 'green' | 'yellow',
  ) => {
    if (bulbColor !== color) {
      return styles.gray;
    }
    switch (color) {
      case 'red':
        return styles.red;
      case 'green':
        return styles.green;
      case 'yellow':
        return styles.yellow;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.trafficLight}>
        <View
          style={[styles.light, getColorStyle(data.trafficLightColor, 'red')]}
        />
        <View
          style={[
            styles.light,
            getColorStyle(data.trafficLightColor, 'yellow'),
          ]}
        />
        <View
          style={[styles.light, getColorStyle(data.trafficLightColor, 'green')]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trafficLight: {
    width: 60,
    height: 160,
    backgroundColor: 'black',
    borderWidth: 4,
    borderRadius: 15,
    padding: 5,
    borderColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  light: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  red: {
    backgroundColor: 'red',
  },
  green: {
    backgroundColor: '#3cd64e',
  },
  yellow: {
    backgroundColor: 'yellow',
  },
  gray: {
    backgroundColor: '#333',
  },
});

export default TrafficLight;
