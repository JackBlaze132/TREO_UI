
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const events = [
  {
    id: '1',
    name: 'Festech',
    location: 'Gobernacion del Tolima, Ibagué',
    date: '2024-08-15T14:00:00.000Z',
    image: 'https://picsum.photos/seed/1/200'
  },
  {
    id: '2',
    name: 'PijaoTech',
    location: 'Aqua Centro Comercial, Ibagué',
    date: '2024-09-20T10:30:00.000Z',
    image: 'https://picsum.photos/seed/2/200'
  },
];

const EventCard = ({ event }) => {
    const eventDate = new Date(event.date);
    const date = eventDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    return (
        <View style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
                <View style={styles.dateContainer}>
                    <Text style={styles.eventDate}>{date}</Text>
                    <Text style={styles.eventTime}>{time}</Text>
                </View>
            </View>
        </View>
    );
}

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proximos Eventos</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      eventCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
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
      eventImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      eventInfo: {
        padding: 15,
      },
      eventName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      eventLocation: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
      },
      dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      eventDate: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold'
      },
      eventTime: {
        fontSize: 14,
        color: '#666',
      },
});
