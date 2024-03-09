import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUrl } from './components/redux/action';
import TrafficLight from './components/TrafficLight';
import SettingsButton from './components/Settings/SettingsButton/SettingsButton';

function App() {
  const dispatch = useDispatch();

  const handleUpdateUrl = (url: string) => {
    dispatch(updateUrl(url));
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <SettingsButton />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.leftContent} >
          <TrafficLight
            data={{
              trafficLightColor: 'red',
              fps: 10,
            }}
          />
        </View>
        <View style={styles.rightContent} />
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
  },
});

export default App;
