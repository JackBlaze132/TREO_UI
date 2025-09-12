
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function StickyNote({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefabc',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ rotate: '-2deg' }],
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});
