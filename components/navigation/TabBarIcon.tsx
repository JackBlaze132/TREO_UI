
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

import { useHaptic } from '../haptic-tab';

export function TabBarIcon({ style, name, color }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
    const hapticSelection = useHaptic();
    return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} onPress={hapticSelection} {...{ name, color }} />;
}
