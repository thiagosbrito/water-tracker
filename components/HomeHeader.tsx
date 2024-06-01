import { View, Text, Alert, TouchableOpacity } from 'react-native'
import moment from 'moment';
import { supabase } from '../utils/supabase';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import Button from './Button';
import { Bell } from 'lucide-react-native';

export default function HomeHeader({ name, ...restProps}: {name: string}) {
    
    const auth = supabase.auth;
    const [greeting, setGreeting] = useState<string>('');

    const defineGreetings = () => {
        if (parseInt(moment().format('HH')) < 12) {
            return 'Good Morning,'
        } else if (parseInt(moment().format('HH')) >= 12 && parseInt(moment().format('HH')) < 18) {
            return 'Good Afternoon,'
        } else {
            return 'Good Evening,'
        }
    }

    useEffect(() => {
        setGreeting(defineGreetings());
    }, [moment]);

    const signOut = async () => {
        const { error } = await auth.signOut();
        if (error) {
            Alert.alert('Error', error.message);
            return;
        }
        router.navigate('/(auth)/SignIn');
    }

    return (
        <View className='flex-row items-center'>
            <View className='gap-y-2'>
                <Text className='text-lg text-slate-600'>{greeting}</Text>
                <Text className='text-4xl font-bold text-slate-600'>{name}</Text>
            </View>
            <View className='ml-auto'>
                <TouchableOpacity className='bg-white w-16 h-16 rounded-full items-center justify-center relative shadow-md shadow-gray-400'>
                    <View className='w-5 h-5 bg-red-800 absolute top-0 -right-1 rounded-full'></View>
                    <Bell size={28} color={'#4B5563'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}