
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, View, RefreshControl } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useEvents } from '../hooks/useEvents';

const EventCard = ({ event }) => {
    const eventDate = new Date(event.date);
    const date = eventDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const cardWidth = Dimensions.get('window').width - 40;
    const imageHeight = 150;
    const contentHeight = 120;
    const zigzagHeight = 10;
    const cardHeight = imageHeight + contentHeight;
    const borderRadius = 10;
    const zigzagCount = Math.floor(cardWidth / 10);
    const zigzagWidth = cardWidth / zigzagCount;

    let path = `M0 ${borderRadius} A${borderRadius} ${borderRadius} 0 0 1 ${borderRadius} 0 H${cardWidth - borderRadius} A${borderRadius} ${borderRadius} 0 0 1 ${cardWidth} ${borderRadius} V${cardHeight - zigzagHeight}`;

    for (let i = 0; i < zigzagCount; i++) {
        const x = cardWidth - (i * zigzagWidth);
        path += ` L${x - (zigzagWidth / 2)} ${cardHeight} L${x - zigzagWidth} ${cardHeight - zigzagHeight}`;
    }
    path += ` V${borderRadius} A${borderRadius} ${borderRadius} 0 0 1 0 ${borderRadius} Z`;


    return (
        <View style={{...styles.eventCard, height: cardHeight, width: cardWidth}}>
            <Svg style={{ position: 'absolute', top: 0, left: 0}} height={cardHeight} width={cardWidth}>
                <Path d={path} fill="white"/>
            </Svg>
            <Image source={{ uri: event.image }} style={{...styles.eventImage, width: cardWidth, height: imageHeight}} />
            <View style={{...styles.eventInfo, top: imageHeight}}>
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
  const { events, loading, error, refetch } = useEvents();

  if (loading && !events.length) { // Show activity indicator only on initial load
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Error fetching events.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proximos Eventos</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
          />
        }
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
      centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      eventCard: {
        backgroundColor: 'transparent',
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        top: 0,
        left: 0,
      },
      eventInfo: {
        padding: 15,
        position: 'absolute',
        width: '100%',
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
