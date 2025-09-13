
import DonutChart from '@/components/DonutChart';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

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
    title: 'Sacude tu teléfono',
    progress: 0,
    completed: false,
  },
];

const closestAchievement = {
  title: 'Explorador Urbano',
  description: 'Visita 10 lugares de interés en tu ciudad.',
  image: 'https://picsum.photos/seed/picsum/200/300',
  progress: 0.75,
};

const MissionCard = ({ mission }) => (
  <View style={styles.missionCard}>
    <View style={styles.info}>
      <Text style={styles.missionTitle}>{mission.title}</Text>
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
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Misiones</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Rutas</Text>
          <Text style={styles.statValue}>5</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>exp.</Text>
          <DonutChart current={300} target={500} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Racha</Text>
          <Text style={styles.statValue}>3</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Misiones Diarias</Text>
        {missionsData.map(mission => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Logro más cercano</Text>
        <View style={styles.achievementContent}>
          <Image source={{ uri: closestAchievement.image }} style={styles.achievementImage} />
          <View style={styles.achievementTextContainer}>
            <Text style={styles.achievementTitle}>{closestAchievement.title}</Text>
            <Text style={styles.achievementDescription}>{closestAchievement.description}</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
            <View
                style={[
                    styles.progressBar,
                    { width: `${closestAchievement.progress * 100}%` },
                ]}
            />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  missionCard: {
    marginBottom: 15,
  },
  info: {
    marginBottom: 10,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: '500',
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
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  achievementTextContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: 'gray',
  },
});
