import { Switch, Text, TouchableOpacity, View } from 'react-native'
import FullHeightWrapper from '../../components/FullHeightWrapper'

export default function Settings() {
    return (
        <FullHeightWrapper className='flex-1 w-screen pt-20 gap-y-6' bgColor='#F5F5F5'>
            <View className='px-8'>
                <Text className='text-3xl font-bold'>Settings</Text>
            </View>
            <View className="flex-1">
                <View className='bg-white py-4 px-8 border-b border-gray-300 flex-row items-center'>
                    <Text className='text-lg'>Push Notifications</Text>
                    <Switch
                        className='ml-auto'
                        ios_backgroundColor="#3e3e3e"
                    />
                </View>
                <View className='bg-white py-4 px-8 border-b border-gray-300 flex-row items-center'>
                    <Text className='text-lg'>Notify when not drinking?</Text>
                    <Switch
                        className='ml-auto'
                        ios_backgroundColor="#3e3e3e"
                    />
                </View>
                <View className='bg-white py-4 px-8 border-b border-gray-300 flex-row items-center'>
                    <Text className='text-lg'>Share health data</Text>
                    <Switch
                        className='ml-auto'
                        ios_backgroundColor="#3e3e3e"
                    />
                </View>
                <View className='bg-white py-4 px-8 border-b border-gray-300 flex-row items-center'>
                    <Text className='text-lg'>Unit</Text>
                    <TouchableOpacity className='ml-auto'>
                        <Text className="text-md text-blue-400">glass</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </FullHeightWrapper>
    )
}