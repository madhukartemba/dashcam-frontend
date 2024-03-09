import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUrl } from './components/redux/action';

function App(): React.JSX.Element {

  const dispatch = useDispatch();

  const handleUpdateUrl = (url: string) => {
    dispatch(updateUrl(url))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test application</Text>
      <UrlDisplay />
      <Button title="Test Update" onPress={() => handleUpdateUrl("newUrl")} />
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
