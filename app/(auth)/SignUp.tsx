import { View, Text, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Mail, Lock, Phone, User, Key } from 'lucide-react-native';
import Button from '../../components/Button';
import { Link, router } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabase';
import { Toast } from 'toastify-react-native';
import { Session } from '@supabase/supabase-js';
import PhoneInput from 'react-native-phone-input'
import DeviceCountry from 'react-native-device-country';

const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 characters'),
});


export default function Page() {

    const phoneRef = useRef<PhoneInput>(null);
    const [userSession, setUserSession] = useState<Session | null>(null);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
        },
        resolver: zodResolver(formSchema),
    });

    const updateProfile = async (name: string, phone: string) => {
        try {
            if (!!userSession) {
                const updates = {
                    id: userSession?.user.id,
                    full_name: name,
                    phone_number: phone,
                }
                const { error, } = await supabase.from('users').upsert(updates);
                if (error) {
                    throw error
                }
                router.navigate('/(app)/Home');
            }
        } catch (error) {
            if (error instanceof Error) {
                Toast.error(error.message, 'top');
            }
        }
    }
    const onSubmit = async (data: any) => {
        try {
            const {
                data: { user, session },
                error: authError,
            } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            }).finally(() => {

                if (!!session) {
                    setUserSession(session);
                    updateProfile(data.name, data.phone);
                }

            });

            if (authError) {
                throw authError;
            }

        } catch (error) {
            if (error instanceof Error) {
                Toast.error(error.message, 'top');
            }
        }
        
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View className='gap-y-6'>
                <View className='px-6 gap-y-12'>
                    <View className="pt-36">
                        <Text className="text-4xl font-bold">Create an account</Text>
                        <Text className="text-slate-400 text-xl">Create an account for a personal experience</Text>
                    </View>
                    <View className="bg-slate-200 rounded-xl px-4 py-6 flex-row gap-x-2 shadow-md shadow-slate-300">
                        <User size={20} />
                        <Controller
                            control={control}
                            name={'name'}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextInput
                                    className="w-full"
                                    placeholder="Full name"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur} />
                            )} />
                    </View>
                    <View className="bg-slate-200 rounded-xl px-4 py-6 flex-row gap-x-2 shadow-md shadow-slate-300">
                        <Mail size={20} />
                        <Controller
                            control={control}
                            name={'email'}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextInput
                                    className="w-full"
                                    autoCapitalize='none'
                                    placeholder="email@example.com"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur} />
                            )} />
                    </View>
                    <View className="bg-slate-200 rounded-xl px-4 py-6 flex-row gap-x-2 shadow-md shadow-slate-300">
                        <Lock size={20} />
                        <Controller control={control} name={'password'} render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput className="w-full" secureTextEntry={true} placeholder="password" onChangeText={onChange} value={value} onBlur={onBlur} /> 
                        )} />
                    </View>
                    <View className="bg-slate-200 rounded-xl px-4 py-6 flex-row gap-x-2 shadow-md shadow-slate-300">
                        <Phone size={20} />
                        <Controller control={control} name={'phone'} render={({ field: { value, onChange, onBlur } }) => (
                            <PhoneInput
                                style={{width: '100%'}} 
                                onChangePhoneNumber={onChange}
                                ref={phoneRef} 
                                autoFormat={true}
                                initialCountry="br"
                                textProps={{
                                    placeholder: 'Enter a phone numberr'
                                }}/>
                        )} />
                    </View>
                    <Button 
                        buttonStyle='bg-blue-500 text-white text-center py-4 rounded-lg shadow-xl shadow-blue-500'
                        textStyle='font-bold uppercase text-xl text-center text-white'
                        onPress={handleSubmit(onSubmit)}>
                        Create account
                    </Button>
                </View>
                <View className='px-6'>
                    <View className='items-center justify-center gap-x-2 flex-row'>
                        <Text className='font-bold text-lg text-slate-700'>Already have an account?</Text>
                        <Link href="/(auth)/SignIn" className='text-lg text-blue-500 underline font-bold'>Sign In</Link>
                    </View>
                </View>
                <View className='px-6'>
                    <View className='items-center justify-center gap-x-2 flex-row'>
                        <Link href="/(tabs)" className='text-lg text-blue-500 underline font-bold'>go to home</Link>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}