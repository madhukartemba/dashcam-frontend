import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

type Props = {
  handlePress: () => void;
};

const SettingsButton = ({handlePress}: Props) => {
  const imageStyle = {tintColor: 'white'};
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={require('./settingsIcon.png')}
        style={[styles.icon, imageStyle]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    padding: 4,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default SettingsButton;
