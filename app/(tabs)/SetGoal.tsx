import { View, Text, ViewProps, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import FullHeightWrapper from '../../components/FullHeightWrapper'
import { ArrowLeft, ChevronDown, Search } from 'lucide-react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {  } from 'lucide-react-native';
import GoalTemplateCard from '../../components/GoalTemplateCard';
import { Goals } from '../../utils/interfaces/goals';
import { router } from 'expo-router';

const goalBg = '../../assets/images/pages-bg.png';

const goals: Array<Goals> = [
    {
        id: 1,
        title: 'Summer time',
        target: 10,
        emoji: '🌴'
    }, {
        id: 2,
        title: 'Sporty',
        target: 7,
        emoji: '🏀'
    }, {
        id: 3,
        title: 'Snow Day',
        target: 10,
        emoji: '❄️'
    }, {
        id: 4,
        title: 'Child',
        target: 10,
        emoji: '🌈'
    
    }
]

export default function Tab() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '60%'], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            handlePresentModalPress();
        }, 1000);
    }, [])

    return (
        <FullHeightWrapper
            className='flex-1 w-screen'
            bgColor='#EAF8FE'
        >   
            <ImageBackground source={require(goalBg)} style={{flex: 1 }}>
                <View className='px-8 pt-14 gap-y-9'>

                    <View className='h-14 w-full flex-row items-center'>
                            <ArrowLeft size={28} className='text-slate-400' />
                            <Text className='text-3xl flex-1 font-bold text-center'>Set Your Goal</Text>
                    </View>
                    <View className='bg-blue-300 px-4 py-6 items-center justify-center mx-auto rounded-md shadow-lg shadow-blue-400'>
                        <Text className='text-white font-bold text-4xl' >8</Text>
                    </View>

                    <View className='w-8/12 bg-white border border-gray-300 mx-auto px-6 py-3 rounded-xl flex-row items-center z-30'>
                        <View className='flex-1'>
                            <Text className='text-center text-gray-400'>Unit: number of glasses</Text>
                        </View>
                        <TouchableOpacity className='ml-auto' onPress={() => router.back()}>
                            <Text>Text</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    >
                    <BottomSheetView className='flex-1 p-6'>
                        <View className='flex-1 gap-y-9'>
                            <View className='gap-y-2'>
                                <Text className='font-bold text-2xl text-center'>Water Goal</Text>
                                <Text className='text-center text-slate-400 text-lg'>We prepared a lot of goals for you!</Text>
                            </View>
                            <View className='bg-gray-100 w-full rounded-xl py-4 gap-x-2 flex-row items-center'>
                                <Search size={24} color={'#CCCCCC'}  style={{ marginLeft: 12}} />
                                <TextInput placeholder='Search for a goal template' className='h-8' />
                            </View>

                            <View className='flex-row gap-6 flex-wrap justify-center'>
                                {goals.map((goal) => (
                                        <GoalTemplateCard key={goal.id} settings={goal} />
                                ))}
                            </View>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </ImageBackground>
        </FullHeightWrapper>
    )
}