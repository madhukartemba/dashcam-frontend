import React, { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUrl } from './components/redux/action';
import TrafficLight from './components/TrafficLight';
import SettingsButton from './components/Settings/SettingsButton/SettingsButton';
import DateTimeDisplay from './components/DateTimeDisplay';
import Sound from 'react-native-sound';

Sound.setCategory('Playback', true); // Set the category to Ambient

function App() {
  const dispatch = useDispatch();

  const handleUpdateUrl = (url: string) => {
    dispatch(updateUrl(url));
  };

  useEffect(() => {
    // Load the sound file
    const ding = new Sound('startup.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // when loaded successfully
      console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
    });

    // Set the volume
    ding.setVolume(1);

    // Clean up function to release resources when component unmounts
    return () => {
      ding.release();
    };
  }, []);

  const playSound = () => {
    // Play the sound
    const ding = new Sound('startup.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      ding.play();
    });
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
