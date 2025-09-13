
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface DonutChartProps {
  current: number;
  target: number;
  radius?: number;
  strokeWidth?: number;
}

export default function DonutChart({ current, target, radius = 40, strokeWidth = 8 }: DonutChartProps) {
  const circumference = 2 * Math.PI * radius;
  const progress = current / target;
  const strokeDashoffset = circumference * (1 - progress);
  const remaining = target;

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke="#aac11f"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        <SvgText
            textAnchor="middle"
            x={radius}
            y={radius - 4}
            fontSize="16"
            fontWeight="bold"
            fill="#000"
        >
          {current}
        </SvgText>
        <SvgText
            textAnchor="middle"
            x={radius}
            y={radius + 12}
            fontSize="12"
            fill="#666"
        >
          {remaining}
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
