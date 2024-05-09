import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ordinalSuffix = (day: number) => {
  const j = day % 10,
    k = day % 100;
  if (j === 1 && k !== 11) {
    return day + 'st';
  }
  if (j === 2 && k !== 12) {
    return day + 'nd';
  }
  if (j === 3 && k !== 13) {
    return day + 'rd';
  }
  return day + 'th';
};

const DateTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const dayOfWeek = currentTime.toLocaleString('default', {weekday: 'long'});
  const day = currentTime.getDate();
  const month = currentTime.toLocaleString('default', {month: 'long'});
  const year = currentTime.getFullYear();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{`${hours}:${minutes}`}</Text>
      <Text style={styles.dateText}>{`${dayOfWeek}, ${ordinalSuffix(
        day,
      )} ${month} ${year}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
  },
  dateText: {
    fontSize: 32,
    color: 'white',
  },
});

export default DateTimeDisplay;
