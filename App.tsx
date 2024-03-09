import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUrl } from './components/redux/action';
import { useGetData } from './hooks/useGetData';
import TrafficLight from './components/TrafficLight';

function App(): React.JSX.Element {

  const dispatch = useDispatch();

  const handleUpdateUrl = (url: string) => {
    dispatch(updateUrl(url))
  }

  return (
    <View style={styles.container}>
      <TrafficLight data={{
        trafficLightColor: 'red',
        fps: 10,
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
});

export default App;
