import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { Mail, Lock } from 'lucide-react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Button from '../../components/Button';
import { Link } from 'expo-router';
import GoogleLogo from '../../assets/svgs/google-icon.svg';
import FacebookLogo from '../../assets/svgs/facebook-icon.svg';

export default function Page() {
    return (
        <View className='gap-y-6'>
            <View className='px-6 gap-y-12'>
                <View className="pt-36">
                    <Text className="text-4xl font-bold">Login</Text>
                    <Text className="text-slate-400 text-xl">Securely login to your account</Text>
                </View>
                <View className="bg-slate-200 rounded-xl px-4 py-6 flex-row gap-x-2 shadow-md shadow-slate-300">
                    <Mail size={20} />
                    <TextInput className="w-full" placeholder="email@example.com" />
                </View>
                <View className="bg-slate-200 rounded-xl px-4 py-6 flex-row gap-x-2 shadow-md shadow-slate-300">
                    <Lock size={20} />
                    <TextInput className="w-full" secureTextEntry={true} placeholder="password" />
                </View>
                <View className='flex-row items-center'>
                    <View>
                        <BouncyCheckbox fillColor='#60a5fa' onPress={(isChecked: boolean) => {}} />
                    </View>
                    <Text className='text-slate-400'>Remember me</Text>
                </View>
                <Button buttonStyle='bg-blue-500 text-white text-center py-4 rounded-lg shadow-xl shadow-blue-500' textStyle='font-bold uppercase text-xl text-center text-white'>
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
                <View className='flex-row items-center self-center gap-x-4'>
                    <Button
                        icon={() => <GoogleLogo width={20} height={20} />}
                        buttonStyle='rounded-full border border-blue-200 px-3 py-2 flex-row items-center gap-x-2'
                        textStyle='flex-row text-xl items-center gap-x-1'>
                        <Text>Google</Text>
                    </Button>
                    <Button
                        icon={() => <FacebookLogo width={20} height={20} />}
                        buttonStyle='rounded-full border border-blue-200 px-3 py-2 flex-row items-center gap-x-2'
                        textStyle='flex-row text-xl items-center gap-x-1'>
                        <Text>Facebook</Text>
                    </Button>
                </View>
                <View className='items-center justify-center gap-x-2 flex-row'>
                    <Text className='font-bold text-lg text-slate-700'>Create An Account</Text>
                    <Link href="/" className='text-lg text-blue-500 underline font-bold'>Sign Up</Link>
                </View>
                <View className='flex-row px-2 gap-x-2 flex-wrap'>
                    <Text>By clicking Continue, you agree to our</Text>
                    <Link href="/" className='text-blue-500 underline'>Terms of Service</Link>
                    <Text>and</Text>
                    <Link href="/" className='text-blue-500 underline'>Privacy Policy</Link>
                </View>
            </View>
        </View>
    )
}