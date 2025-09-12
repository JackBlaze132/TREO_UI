
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const missionsData = [
  {
    id: '1',
    title: 'Completa 5 rutas',
    progress: 1,
    completed: true,
  },
  {
    id: '2',
    title: 'Añade 3 amigos',
    progress: 0.5,
    completed: false,
  },
  {
    id: '3',
    title: 'sacude tu teléfono',
    progress: 0,
    completed: false,
  },
];

const MissionCard = ({ mission }) => (
  <View style={styles.card}>
    <View style={styles.info}>
      <Text style={styles.title}>{mission.title}</Text>
      <Text style={styles.status}>
        {mission.completed ? 'Completada' : 'En progreso'}
      </Text>
    </View>
    <View style={styles.progressContainer}>
      <View
        style={[
          styles.progressBar,
          { width: `${mission.progress * 100}%` },
        ]}
      />
    </View>
  </View>
);

export default function MissionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Misiones Diarias</Text>
      <FlatList
        data={missionsData}
        renderItem={({ item }) => <MissionCard mission={item} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    width: '100%',
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  info: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: 'gray',
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
});
