import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUrl } from './components/redux/action';
import { useGetStatus } from './hooks/useGetStatus';
import { useGetData } from './hooks/useGetData';

function App(): React.JSX.Element {

  const dispatch = useDispatch();

  const handleUpdateUrl = (url: string) => {
    dispatch(updateUrl(url))
  }

  const [data, isLoading, error] = useGetData();


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test application</Text>
      <Text style={styles.text}>{error ? "Error" : data?.trafficLightColor} </Text>
      <Button title="Test Update" onPress={() => handleUpdateUrl("http://192.168.1.19:5000")} />
    </View>
  );
}

function UrlDisplay(): React.JSX.Element {
  const url = useSelector((state: any) => {
    return state.urlReducer
  });

  return (
    <Text style={styles.text}> {url} </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default App;
