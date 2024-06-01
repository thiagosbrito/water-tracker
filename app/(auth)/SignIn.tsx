import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useEffect } from 'react';
import { Mail, Lock } from 'lucide-react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from '../../components/Button';
import { Link, router } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabase';
import { Toast } from 'toastify-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const formSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function Page() {
    const auth = supabase.auth;

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: any)=>{
        const {
            data: { session },
            error,
          } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        
        if (error) {
            Toast.error(error.message, 'top');
        }

        if (session) {
            router.navigate('/(tabs)');
        }
    }

    useEffect(() => {
        auth.getSession().then(({data: {session}}) => {
            if(session) {
                router.navigate('/(tabs)');
            }
        });
    }, [auth])

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <View className='gap-y-6'>
                <View className='px-6 gap-y-12'>
                    <View className="pt-36">
                        <Text className="text-4xl font-bold">Login</Text>
                        <Text className="text-slate-400 text-xl">Securely login to your account</Text>
                    </View>
                    <View className="bg-slate-200 rounded-xl px-4 py-6 flex-row gap-x-2 shadow-md shadow-slate-300">
                        <Mail size={20} />
                        <Controller
                            control={control}
                            name={'email'}
                            render={({ field: { value, onChange, onBlur }})=>(
                                <TextInput
                                    className="w-full"
                                    keyboardType='email-address'
                                    placeholder="email@example.com"
                                    autoCapitalize='none'
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur} />
                            )} />
                        
                    </View>
                    <View className="bg-slate-200 rounded-xl px-4 py-6 flex-row gap-x-2 shadow-md shadow-slate-300">
                        <Lock size={20} />
                        <Controller
                            control={control}
                            name={'password'}
                            render={({ field: { value, onChange, onBlur }}) =>(
                            <TextInput className="w-full"
                                secureTextEntry={true}
                                placeholder="password"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur} />
                        )} />
                    </View>
                    <View className='flex-row items-center'>
                        <View>
                            <BouncyCheckbox fillColor='#60a5fa' onPress={(isChecked: boolean) => {}} />
                        </View>
                        <Text className='text-slate-400'>Remember me</Text>
                    </View>
                    <Button
                        buttonStyle='bg-blue-500 text-white text-center py-4 rounded-lg shadow-xl shadow-blue-500'
                        textStyle='font-bold uppercase text-xl text-center text-white'
                        onPress={handleSubmit(onSubmit)}>
                        Sign in
                    </Button>
                    <View>
                        <Link href="/" className='text-center underline text-blue-600'>forgot password</Link>
                    </View>
                </View>
                <View className='px-6 gap-y-6'>
                    <View className='flex-row items-center justify-center gap-x-1'>
                        <Text>-</Text>
                        <Text>or continue with</Text>
                        <Text>-</Text>
                    </View>
                    <View className='items-center justify-center gap-x-2 flex-row'>
                        <Text className='font-bold text-lg text-slate-700'>Create An Account</Text>
                        <Link href="/(auth)/SignUp" className='text-lg text-blue-500 underline font-bold'>Sign Up</Link>
                    </View>
                </View>
                <View className='flex-row gap-x-2 flex-wrap mt-auto px-8'>
                    <Text>By clicking Continue, you agree to our</Text>
                    <Link href="/" className='text-blue-500 underline'>Terms of Service</Link>
                    <Text>and</Text>
                    <Link href="/" className='text-blue-500 underline'>Privacy Policy</Link>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}