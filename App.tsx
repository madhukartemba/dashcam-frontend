import React, { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUrl } from './components/redux/action';
import TrafficLight from './components/DashcamComponent/TrafficLight';
import SettingsButton from './components/Settings/SettingsButton/SettingsButton';
import DateTimeDisplay from './components/DateTimeDisplay';
import SoundManager from './SoundManager';

function App() {
  const dispatch = useDispatch();

  const handleUpdateUrl = (url: string) => {
    dispatch(updateUrl(url));
  };

  const playSound = () => {
    SoundManager.playStartupSound()
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <SettingsButton />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <TrafficLight
            data={{
              status: 'inference',
              recoveryPercent: 100,
              trafficLightColor: 'red',
              fps: 10,
            }}
          />
        </View>
        <View style={styles.rightContent}>
          <DateTimeDisplay />
          <Button title='Play sound' onPress={playSound} />
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
    flex: 0.3,
    backgroundColor: 'blue',
  },
  rightContent: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
