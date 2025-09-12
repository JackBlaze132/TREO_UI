
import DonutChart from '@/components/DonutChart';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }}
          style={styles.avatar}
        />
        <View style={styles.profileLevelIndicator}>
          <Text style={styles.profileLevelText}>LvL. 10</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Routes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>exp.</Text>
          <DonutChart current={300} target={500} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Rancha</Text>
          <Text style={styles.statValue}>3</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.achievementsContainer}>
        <View style={styles.achievementCard}>
          <View>
            <Image
              source={{ uri: 'https://picsum.photos/seed/1/200' }}
              style={styles.achievementImage}
            />
            <View style={styles.levelIndicator}>
              <Text style={styles.levelText}>5</Text>
            </View>
          </View>
        </View>
        <View style={styles.achievementCard}>
          <View>
            <Image
              source={{ uri: 'https://picsum.photos/seed/2/200' }}
              style={styles.achievementImage}
            />
            <View style={styles.levelIndicator}>
              <Text style={styles.levelText}>2</Text>
            </View>
          </View>
        </View>
        <View style={styles.achievementCard}>
          <View>
            <Image
              source={{ uri: 'https://picsum.photos/seed/3/200' }}
              style={styles.achievementImage}
            />
            <View style={styles.levelIndicator}>
              <Text style={styles.levelText}>8</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileLevelIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    backgroundColor: 'indigo',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileLevelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '90%',
    marginVertical: 20,
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  achievementCard: {
    backgroundColor: '#f2f2f2',
    padding: 10,
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
  achievementImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  levelIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'indigo',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
