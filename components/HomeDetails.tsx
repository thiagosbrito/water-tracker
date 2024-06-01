import { View, Text } from 'react-native'
import React from 'react'
import WaveSmall from '../assets/svgs/waves-small.svg';
import moment from 'moment';
import { Coffee } from 'lucide-react-native';

export default function HomeDetails() {

    const now = moment().format('HH:mm')

    return (
        <View className='w-full flex-row items-center'>
            <View className='w-48 h-48 rounded-full border-8 border-blue-300 bg-white items-center relative shadow-lg shadow-blue-300'>
                <View className='w-full h-full rounded-full overflow-hidden items-center'>
                    <Text className='mt-auto mb-4 text-2xl font-bold z-20 text-white'>200ml</Text>
                    <View className='w-full h-full absolute bottom-11 left-0'>
                        <WaveSmall style={{ width: '100%', height: '100%' }} />
                    </View>
                </View>
            </View>
            <View className='gap-y-4 flex-1'>
                <View className='bg-white rounded-xl px-6 py-4 w-64 -ml-5 gap-y-3 shadow-md shadow-gray-300'>
                    <View className='flex-row items-center gap-x-4'>
                        <Text className='text-xl text-slate-400 font-bold'>{now}</Text>
                        <View className='h-2 w-24 bg-blue-400 rounded-full'></View>
                    </View>
                    <View className='flex-row items-center gap-x-4'>
                        <Coffee size={24} color={'red'} />
                        <Text className='font-bold text-xl'>200 ml</Text>
                        <Text className='ml-auto font-bold text-xl text-slate-400'>100%</Text>
                    </View>
                </View>
                <View className="ml-auto bg-white rounded-xl px-6 py-4 w-48 gap-y-2 shadow-md shadow-gray-300">
                    <Text className='text-xl text-slate-400 font-semibold'>Target</Text>
                    <Text className='font-bold text-xl'>2000 ml</Text>
                </View>
            </View>
        </View>
    )
}