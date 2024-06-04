import { View, Text } from 'react-native';
import { Goals } from '../utils/interfaces/goals';

export default function GoalTemplateCard({ settings }: {settings: Goals}) {
    return (
        <View className='w-5/12 border-2 border-gray-100 rounded-xl px-6 py-4 gap-y-7'>
            <Text className='font-semibold text-slate-400'>{settings.title}</Text>
            <View className='flex-row items-center'>
                <Text className='font-bold text-lg'>{settings.target + ` ${settings.target <= 1 ? 'Glass' : 'Glasses'}`}</Text>
                <Text className='ml-auto'>{settings.emoji}</Text>
            </View>
        </View>
    )
}