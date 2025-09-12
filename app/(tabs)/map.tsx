
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StickyNote } from '@/components/ui/sticky-note';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDEPXnNbDazMwAQg6LVU4WLkW7r6hcrDE0';

const routes = [
  {
    id: 1, name: 'Parque de la Música', type: 'park', icon: 'leaf.fill', color: '#aac11f', latitude: 4.4335, longitude: -75.2372, reward: 10,
    pois: [
      { id: 101, name: 'Fuente Principal', latitude: 4.4338, longitude: -75.2370 },
      { id: 102, name: 'Auditorio al Aire Libre', latitude: 4.4332, longitude: -75.2375 },
    ]
  },
  {
    id: 2, name: 'Restaurante El Solar', type: 'restaurant', icon: 'fork.knife', color: '#ffce00', latitude: 4.4414, longitude: -75.2415, reward: 20,
    pois: []
  },
  {
    id: 3, name: 'Sendero Ecológico Combeima', type: 'walk', icon: 'figure.walk', color: '#00b7ff', latitude: 4.4069, longitude: -75.2811, reward: 15,
    pois: [
      { id: 301, name: 'Mirador del Río', latitude: 4.4080, longitude: -75.2800 },
      { id: 302, name: 'Cascada La Escondida', latitude: 4.4055, longitude: -75.2825 },
    ]
  },
  {
    id: 4, name: 'Centro Comercial La Estación', type: 'shopping', icon: 'bag.fill', color: '#e51f4e', latitude: 4.4303, longitude: -75.2104, reward: 25,
    pois: []
  },
  {
    id: 5, name: 'Jardín Botánico San Jorge', type: 'park', icon: 'leaf.fill', color: '#aac11f', latitude: 4.4510, longitude: -75.2330, reward: 10,
    pois: []
  },
  {
    id: 6, name: 'Augurio', type: 'restaurant', icon: 'fork.knife', color: '#ffce00', latitude: 4.4293, longitude: -75.2359, reward: 30,
    pois: []
  },
  {
    id: 7, name: 'Plaza de Bolívar', type: 'walk', icon: 'figure.walk', color: '#00b7ff', latitude: 4.4380, longitude: -75.2420, reward: 5,
    pois: []
  },
  {
    id: 8, name: 'Centro Comercial Multicentro', type: 'shopping', icon: 'bag.fill', color: '#e51f4e', latitude: 4.4285, longitude: -75.2154, reward: 35,
    pois: []
  },
];

const origin = { latitude: 4.4389, longitude: -75.2322 };

export default function MapScreen() {
  const [destination, setDestination] = useState(null);
  const [routeColor, setRouteColor] = useState('hotpink');
  const [pois, setPois] = useState([]);
  const mapViewRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const handleRoutePress = (route) => {
    setDestination({ latitude: route.latitude, longitude: route.longitude });
    setRouteColor(route.color);
    setPois(route.pois || []);
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
    let location = await Location.getCurrentPositionAsync({});
    mapViewRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const handleZoom = async (level) => {
    if (!mapViewRef.current) return;
    const camera = await mapViewRef.current.getCamera();
    camera.zoom += level;
    mapViewRef.current.animateCamera(camera);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor={routeColor}
            onReady={onRouteReady}
          />
        )}
        {pois.map(poi => (
          <Marker
            key={poi.id}
            coordinate={{ latitude: poi.latitude, longitude: poi.longitude }}
            title={poi.name}
          />
        ))}
        <Marker coordinate={{ latitude: 4.4075, longitude: -75.2815 }}>
            <StickyNote text="Es peligroso en horas de la noche." />
        </Marker>
      </MapView>
      <View style={styles.header}>
        <View style={styles.coinContainer}>
            <Text style={styles.coinEmoji}>🪙</Text>
            <Text style={styles.coinText}>100</Text>
        </View>
        <Image
          source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }}
          style={styles.avatar}
        />
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
    justifyContent: 'flex-end',
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
});
