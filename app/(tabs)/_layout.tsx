
import { Tabs } from 'expo-router';
import { IconSymbol, IconName } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <IconSymbol name="paperplane.fill" color={color} />,
        }}
      />
        <Tabs.Screen
            name="events"
            options={{
                title: 'Events',
                tabBarIcon: ({ color }) => <IconSymbol name="calendar" color={color} />,
            }}
        />
    </Tabs>
  );
}
