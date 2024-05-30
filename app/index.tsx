import { Link, router } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Step } from '../utils/interfaces/steps';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottleOfWater from '../assets/steps/bottleofwater_bro1.svg';
import Button from '../components/Button';


export default function Page() {

    const steps: Step[] = [
        {
            image: '/assets/steps/bottleofwater_bro1.svg',
            title: 'Track your daily water intake with Us.',
            description: 'Achieve your hydration goals with a simple tap!',
            buttonContent: 'next',
            active: true      
        },
        {
            image: '/assets/steps/bottleofwater_bro1.svg',
            title: 'Smart Reminders Tailored to You',
            description: 'Quick and easy to set your hydration goal & then track your daily water intake progress.',
            buttonContent: 'next',
            active: false      
        },
        {
            image: '/assets/steps/bottleofwater_bro1.svg',
            title: 'Easy to Use – Drink, Tap, Repeat',
            description: 'Staying hydrated every day is easy with Drops Water Tracker.',
            buttonContent: 'get started',
            active: false      
        }
    ];

    return (
        
        <View className="flex-1 gap-y-12">
            <BottleOfWater style={{margin: 'auto', marginTop: 120, marginBottom: 0}} width={300} height={300} />
            <View className='px-9 gap-y-9 flex-1'>
                <Text className='font-bold text-3xl text-center'>Track your daily water intake with Us.</Text>
                <Text className='text-xl text-slate-400 text-center'>Achieve your hydration goals with a simple tap!</Text>
                <View className='flex-row self-center'>
                    {steps.map((item, index) => (
                        <View key={index} className={`w-9 mx-2 rounded-xl h-2 ${item.active ? 'bg-blue-500' : 'bg-slate-400'}`}></View>
                    ))}
                </View>
                <Button buttonStyle='bg-blue-500 mt-auto mb-12 text-white text-center py-4 rounded-lg' textStyle='text-center uppercase text-white font-bold' onPress={() => router.navigate('/(auth)/SignIn')}>
                    Next
                </Button>
            </View>
        </View>
        
        
    );
}