import {Text, View} from 'react-native';
import SVG, { Circle } from 'react-native-svg';
import Animated, {useSharedValue, useAnimatedProps, withTiming} from 'react-native-reanimated'
import {useEffect} from 'react';
import { ArrowRight } from 'lucide-react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
    radius?: number;
    strokeWidth?: number;
    progress?: number;
    steps?: string;
}

const color = "#EE0F55";

export default function RingProgress({radius = 100, strokeWidth = 30, progress = 0.5, steps = '0'}: RingProgressProps) {
    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;

    const fill = useSharedValue(0);

    useEffect(() => {
        fill.value = withTiming(progress, {duration: 1500})
    }, [progress]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDasharray: [circumference * fill.value, circumference]
    }))

    return (
        <View style={{width: radius * 2, height: radius * 2}} className='relative'>
            <View className='w-full h-full absolute items-center justify-center'>
                <Text className='font-bold text-3xl'>{steps}</Text>
            </View>
            <SVG className='flex-1'>
                <Circle 
                    r={innerRadius}
                    cx={radius}
                    cy={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    opacity={0.2}
                />
                <AnimatedCircle 
                    animatedProps={animatedProps}
                    r={innerRadius}
                    cx={radius}
                    cy={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={[circumference * progress, circumference]}
                    strokeLinecap="round"
                    rotation="-90"
                    originX={radius}
                    originY={radius}
                />
            </SVG>
            <ArrowRight
                color="#FFFFFF"
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: strokeWidth * 0.1,
                }}
            />
        </View>
    )
}