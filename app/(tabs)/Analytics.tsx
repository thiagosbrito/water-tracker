import { View, Text, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import FullHeightWrapper from '../../components/FullHeightWrapper';
import useHealthData from '../../hooks/useHealthData';
import RingProgress from '../../components/RingProgress';

import Wave from '../../assets/svgs/waves.svg';
import {
    LineChart
  } from "react-native-chart-kit";
  


export default function Analytics() {
    
    const { steps } = useHealthData();
    console.log(steps)
    
    return (
            
                <View className='flex-1 gap-y-4 px-8 pt-20'>
                    <Text className='font-bold text-3xl'>Today</Text>
                    <View className='py-4 rounded-xl border border-gray-200 items-center  justify-center overflow-hidden bg-white'>
                        <LineChart
                            data={{
                                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                datasets: [{
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }]
                            }}
                            width={Dimensions.get("window").width - 64} // from react-native
                            height={220}
                            yAxisSuffix="ml"
                            // yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: '#FFFFFF',
                                backgroundGradientFrom: '#FFFFFF',
                                backgroundGradientTo: '#FFFFFF',
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: () => '#EE0F55',
                                labelColor: () => '#EE0F55',
                                style: {
                                    height: '100%'
                                }
                                
                            }}
                            bezier
                            style={{
                                borderRadius: 12,
                                marginLeft: -20,
                            }}
                        />
                    </View>
                    <View className="gap-y-4 flex-row gap-x-4">
                        <View className='rounded-xl border border-gray-200 flex-1 px-4 py-3 gap-y-4 bg-white'>
                            <Text className='text-3xl font-bold'>Steps</Text>
                            
                            <View className='flex-row items-center'>
                                <Text className='text-xl'>🚶‍♂️</Text>
                                <Text className='text-xl font-semibold text-gray-600 ml-auto'>{steps}</Text>
                            </View>
                            
                        </View>
                        <View className='rounded-xl border border-gray-200 flex-1 px-4 py-3 gap-y-4 bg-white'>
                            <Text className='text-3xl font-bold'>Heart</Text>
                            <View className='flex-row items-center'>
                                <Text className='text-xl'>❤️</Text>
                                <Text className='text-xl font-semibold text-gray-600 ml-auto'>{steps}</Text>
                            </View>
                        </View>
                    </View>
                    <View className="gap-y-4 flex-row gap-x-4">
                        <View className='flex-1 gap-y-4'>
                            <View className='rounded-xl border border-gray-200 px-4 py-3 gap-y-4 bg-white'>
                                <Text className='text-3xl font-bold'>Calories</Text>
                                <View className='flex-row items-center'>
                                    <Text className='text-xl'>🍕</Text>
                                    <Text className='text-xl font-semibold text-gray-600 ml-auto'>{steps}</Text>
                                </View>
                            </View>
                            <View className='rounded-xl border border-gray-200 px-4 py-3 gap-y-4 bg-white'>
                                <Text className='text-3xl font-bold'>Sleep</Text>
                                <View className='flex-row items-center'>
                                    <Text className='text-xl'>😴</Text>
                                    <Text className='text-xl font-semibold text-gray-600 ml-auto'>{steps}</Text>
                                </View>
                            </View>
                            
                        </View>
                        <View className='flex-1'>
                            <View className='flex-1 border px-4 py-2 border-gray-200 rounded-xl overflow-hidden  bg-white'>
                                <Text className='text-3xl font-bold z-10'>Water</Text>
                                <View className='flex-row items-center mt-auto z-10'>
                                    <Text className='text-xl'>💧</Text>
                                    <Text className='text-xl font-semibold text-gray-600 ml-auto'>{steps}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            
        
    )
}