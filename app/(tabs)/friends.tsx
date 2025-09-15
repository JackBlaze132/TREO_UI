
import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { usePublicProfiles } from '../hooks/usePublicProfiles';

const FriendCard = ({ friend }) => (
  <View style={styles.card}>
    <Image source={{ uri: friend.photo }} style={styles.photo} />
    <View style={styles.info}>
      <Text style={styles.name}>{friend.name}</Text>
      <Text style={styles.username}>@{friend.user}</Text>
    </View>
    <View style={styles.levelIndicator}>
        <Text style={styles.levelText}>LvL. {friend.level}</Text>
    </View>
  </View>
);

export default function FriendsScreen() {
    const { profiles, loading, error, refetch } = usePublicProfiles();

    if (loading && !profiles.length) {
        return (
          <View style={[styles.container, styles.center]}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
    
      if (error) {
        return (
          <View style={[styles.container, styles.center]}>
            <Text>Error fetching friends: {error.message}</Text>
          </View>
        );
      }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar amigos..."
      />
      <FlatList
        data={profiles}
        renderItem={({ item }) => <FriendCard friend={item} />}
        keyExtractor={item => item.user}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
          />
        }
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
  },
  levelIndicator: {
    backgroundColor: 'indigo',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10, 
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007BFF',
    borderRadius: 28,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
});
