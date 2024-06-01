import { View, Text, ImageBackground, Image } from 'react-native'
import LottieView from 'lottie-react-native';
import WavesLargeAnimation from '../assets/animations/waves-large-animation.json';
import DropsGoals from '../assets/svgs/drops-home-goal.svg';
import Wave from '../assets/svgs/waves.svg';
import Button from './Button';
const image = {uri: '../assets/images/home-goal-bg.png'}
export default function HomeGoal() {
  return (
        <View className='bg-white rounded-xl shadow-xl h-64 shadow-slate-400 relative'>
            <View className='overflow-hidden rounded-xl'>
                <View className='absolute flex-1 bottom-0 left-0 overflow-hidden w-full h-full bg-transparent z-30 px-6 py-9'>
                    <Text className='text-4xl font-bold'>11:00</Text>
                    <Text className='text-xl font-semibold text-slate-400'>200ml water(2 Glass)</Text>
                    <Button
                        buttonStyle='rounded-full w-6/12 mt-auto shadow-md shadow-slate-400/25 px-4 py-2 bg-white'
                        textStyle='font-semibold text-slate-600 text-center text-xl font-poppins'>
                        Add Your Goal
                    </Button>
                    
                </View>
                <View className='w-full h-full items-end z-20 pt-9'>
                    <Image
                        source={require('../assets/images/drops.png')}
                    />
                </View>
                <View className='absolute w-full h-full z-10 -bottom-20 overflow-hidden'>
                    <Wave style={{width: '100%', height:'100%', position: 'absolute', bottom: 0}} />
                </View>
            </View>
        </View>
    )
}