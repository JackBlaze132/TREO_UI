
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { IconSymbol } from '@/components/ui/icon-symbol';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { useRoutes } from '../hooks/useRoutes';
import { useEvents } from '../hooks/useEvents';
import { useMe } from '../hooks/useMe';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDEPXnNbDazMwAQg6LVU4WLkW7r6hcrDE0';

export default function MapScreen() {
  const [destination, setDestination] = useState(null);
  const [routeColor, setRouteColor] = useState('hotpink');
  const [waypoints, setWaypoints] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState(null);
  const mapViewRef = useRef(null);
  const router = useRouter();

  const { routes, loading: routesLoading, error: routesError } = useRoutes();
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const { me, loading: meLoading, error: meError } = useMe();

  useEffect(() => {
    let locationSubscriber = null;

    const startLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      locationSubscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setCurrentUserLocation(location.coords);
        }
      );
    };

    startLocationUpdates();

    return () => {
      if (locationSubscriber) {
        locationSubscriber.remove();
      }
    };
  }, []);

  const handleRoutePress = (route) => {
    if (route.waypoints && route.waypoints.length > 0) {
      const firstWaypoint = route.waypoints[0];
      setDestination({ latitude: firstWaypoint.latitude, longitude: firstWaypoint.longitude });
    } else {
      setDestination(null);
    }
    setRouteColor(route.color);
    setWaypoints(route.waypoints || []);
  };

  const onRouteReady = (result) => {
    if (mapViewRef.current) {
      mapViewRef.current.fitToCoordinates(result.coordinates, {
        edgePadding: {
          right: 50,
          left: 50,
          top: 100,
          bottom: 400,
        },
      });
    }
  };

  const findMe = async () => {
    if (currentUserLocation) {
        mapViewRef.current.animateToRegion({
            latitude: currentUserLocation.latitude,
            longitude: currentUserLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }
  };

  const handleZoom = async (level) => {
    if (!mapViewRef.current) return;
    const camera = await mapViewRef.current.getCamera();
    camera.zoom += level;
    mapViewRef.current.animateCamera(camera);
  };
  
  if (routesLoading || eventsLoading || meLoading) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 4.4389,
          longitude: -75.2322,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentUserLocation && (
          <Marker coordinate={currentUserLocation}>
            <FontAwesome6 name="street-view" size={48} color="#007AFF" />
          </Marker>
        )}
        {destination && (
          <MapViewDirections
            origin={currentUserLocation || { latitude: 4.4389, longitude: -75.2322 }}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor={routeColor}
            onReady={onRouteReady}
          />
        )}
        {waypoints.map(waypoint => (
          <Marker
            key={waypoint.id}
            coordinate={{ latitude: waypoint.latitude, longitude: waypoint.longitude }}
            title={waypoint.name}
          />
        ))}
        {events.filter(event => event.latitude && event.longitude).map(event => (
            <Marker
                key={event.id}
                coordinate={{ latitude: event.latitude, longitude: event.longitude }}
                title={event.name}
                description={event.location}
            >
                <IconSymbol name="calendar" size={32} color="purple" />
            </Marker>
        ))}
        <Marker
          coordinate={{ latitude: 4.4075, longitude: -75.2815 }}
          title="¡Zona peligrosa!"
          description="Ten cuidado al transitar por esta zona en la noche."
        >
          <IconSymbol name="exclamationmark.circle.fill" size={32} color="#ff6d00" />
        </Marker>
      </MapView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.eventsButton} onPress={() => router.push('/events')}>
          <IconSymbol name="calendar" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
            <View style={styles.coinContainer}>
                <Text style={styles.coinEmoji}>🪙</Text>
                <Text style={styles.coinText}>{me ? me.profile.experience : '0'}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <Image
                source={{ uri: me ? me.profile.photo : '' }}
                style={styles.avatar}
              />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.zoomControlsContainer}>
        <TouchableOpacity onPress={() => handleZoom(1)} style={[styles.zoomButton, { borderBottomWidth: 1, borderBottomColor: '#ccc' }]}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleZoom(-1)} style={styles.zoomButton}>
          <Text style={styles.zoomButtonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.findMeContainer}>
        <TouchableOpacity onPress={findMe} style={styles.findMeButton}>
            <IconSymbol name="location.fill" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView>
          {routes.map(route => (
            <TouchableOpacity key={route.id} style={[styles.routeButton, { backgroundColor: route.color }]} onPress={() => handleRoutePress(route)}>
              <View style={styles.rewardContainer}>
                <Text style={styles.coinEmoji}>🪙</Text>
                <Text style={styles.rewardText}>{route.reward}</Text>
              </View>
              <View style={styles.separator} />
              <IconSymbol name={route.icon} size={24} color="white" style={styles.routeIcon} />
              <Text style={styles.routeButtonText}>{route.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  coinEmoji: {
      fontSize: 20,
      marginRight: 5,
  },
  coinText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  eventsButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomControlsContainer: {
    position: 'absolute',
    bottom: '38%',
    left: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomButtonText: {
    fontSize: 24,
    color: '#333',
  },
  findMeContainer: {
    position: 'absolute',
    bottom: '38%',
    right: 20,
  },
  findMeButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  routeButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeIcon: {
    marginRight: 15,
  },
  routeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  separator: {
    height: '80%',
    width: 1,
    borderStyle: 'dashed',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 15,
  },
  calloutContainer: {
    backgroundColor: '#fefabc',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
