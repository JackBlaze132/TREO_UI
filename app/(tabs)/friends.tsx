
import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const friendsData = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Peter Jones',
    username: 'peterjones',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

const FriendCard = ({ friend }) => (
  <View style={styles.card}>
    <Image source={{ uri: friend.photo }} style={styles.photo} />
    <View style={styles.info}>
      <Text style={styles.name}>{friend.name}</Text>
      <Text style={styles.username}>@{friend.username}</Text>
    </View>
  </View>
);

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar amigos..."
      />
      <FlatList
        data={friendsData}
        renderItem={({ item }) => <FriendCard friend={item} />}
        keyExtractor={item => item.id}
        style={styles.list}
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
