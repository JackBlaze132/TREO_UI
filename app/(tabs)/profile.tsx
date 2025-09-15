
import DonutChart from '@/components/DonutChart';
import FireIcon from '@/components/FireIcon';
import RouteIcon from '@/components/RouteIcon';
import React from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator, Button, ScrollView, RefreshControl } from 'react-native';
import { useMe } from '../hooks/useMe';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { me, loading, error, refetch } = useMe();
  const { logout } = useAuth();

  if (loading && !me) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !me) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>Error fetching profile: {error?.message || 'Profile not found'}</Text>
      </View>
    );
  }

  const targetExperience = me.profile.level * 100;

  return (
    <ScrollView 
        style={styles.container}
        refreshControl={
            <RefreshControl
                refreshing={loading}
                onRefresh={refetch}
            />
        }
    >
      <View style={styles.header}>
        <Image
          style={styles.coverImage}
          source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} // Static cover image
        />
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: me.profile.photo }}
            style={styles.avatar}
          />
          <View style={styles.profileLevelIndicator}>
            <Text style={styles.profileLevelText}>LvL. {me.profile.level}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.userName}>{me.username}</Text>
      <Text style={styles.biography}>{me.profile.bio}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Logros</Text>
          <View style={styles.routeIconContainer}>
            <RouteIcon />
            <Text style={styles.routeValue}>{me.achievements.length}</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Exp. pts</Text>
          <DonutChart current={me.profile.experience} target={targetExperience} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Racha</Text>
          <View style={styles.fireContainer}>
            <FireIcon />
            <Text style={styles.streakValue}>3</Text> 
          </View>
        </View>
      </View>

      <View style={styles.divider} />
      <Text style={styles.sectionSubtitle}>Expositor</Text>
      <View style={styles.achievementsContainer}>
        {me.achievements.slice(0, 3).map((achievement, index) => (
          <View style={styles.achievementCard} key={achievement.id}>
            <View>
              <Image
                source={{ uri: `https://picsum.photos/seed/${achievement.achievement}/200` }}
                style={styles.achievementImage}
              />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={logout} color="#FF3B30" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  avatarContainer: {
    position: 'absolute',
    top: 130,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
  },
  profileLevelIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 5,
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
  userName: {
    marginTop: 80,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  biography: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  statCard: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 15,
    paddingHorizontal: 10,
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
    minHeight: 120, 
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  routeIconContainer: {
    flex: 1,
    alignItems: 'center',
    width: 60, 
    height: 60, 
  },
  routeValue: {
    top: 22,
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  fireContainer: {
    flex: 1,
    alignItems: 'center',
    width: 50, 
    height: 50, 
  },
  streakValue: {
    top: 24,
    position: 'absolute',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
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
  logoutButtonContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40, 
  },
});
