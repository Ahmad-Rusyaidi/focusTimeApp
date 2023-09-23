import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);
  const interval = React.useRef(null);

  const reset = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    setMillis(null);
  };

  const countdown = () => {
    setMillis((time) => {
      if (time === null || time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return 0;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (minutes > 0) {
      setMillis(minutesToMillis(minutes));
    }
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
    } else {
      interval.current = setInterval(countdown, 1000);
      return () => clearInterval(interval.current);
    }
  }, [isPaused]);

  const minute = Math.floor((millis || 0) / 1000 / 60) % 60;
  const seconds = Math.floor((millis || 0) / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
