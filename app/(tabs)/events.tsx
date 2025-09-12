
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const events = [
  {
    id: '1',
    name: 'Festech',
    location: 'Gobernacion del Tolima, Ibagué',
  },
  {
    id: '2',
    name: 'PijaoTech',
    location: 'Aqua Centro Comercial, Ibagué',
  },
];

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventLocation}>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventLocation: {
    fontSize: 14,
    color: 'gray',
  },
});
