// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'leaf.fill': 'park',
  'fork.knife': 'restaurant',
  'figure.walk': 'directions-walk',
  'bag.fill': 'shopping-bag',
  'location.fill': 'my-location',
} as IconMapping;

export type IconName = IconSymbolName;

/**
 * A universal icon component that uses SF Symbols on iOS and falls back to Material Icons on Android and web.
 * All icons are from the SF Symbols library.
 * @see https://developer.apple.com/sf-symbols/
 */
export function IconSymbol({ name, style, ...props }: Omit<SymbolViewProps, 'name'> & { name: IconName }) {
  return (
    <MaterialIcons
      name={MAPPING[name]}
      style={style}
      size={props.size}
      color={props.color as string | OpaqueColorValue}
    />
  );
}
