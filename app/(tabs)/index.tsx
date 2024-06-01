import { Alert, Text, View } from 'react-native'
import FullHeightWrapper from '../../components/FullHeightWrapper'
import { supabase } from '../../utils/supabase'
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import HomeHeader from '../../components/HomeHeader';
import WavesAnimation from '../../assets/animations/waves-animation.json';
import HomeGoal from '../../components/HomeGoal';
import HomeDetails from '../../components/HomeDetails';
import Button from '../../components/Button';

export default function Home() {
	const auth = supabase.auth;
	const [userData, setUserData] = useState<User | null>(null)
	const [profileData, setProfileData] = useState<any>(null)
	
	const _getUserProfileData = async () => {
		try {
			const { data, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', userData?.id)
				.single()
			
			if (error) {
				throw error;
			}

			if (data) return data;
		} catch (error: any) {
			Alert.alert('Error', error.message)
		}
	}

	useEffect(() => {
		supabase.auth.getUser().then(async ({ data: { user }}) => {
			if (user) {
				setUserData(user);
				// Alert.alert('User Data', JSON.stringify(user));
				const profileData = await _getUserProfileData();

				if (profileData) {
					// console.log('Profile Data', JSON.stringify(profileData));
					setProfileData(profileData);
				}
			}
		})
	}, [auth])


  	return (
    	<FullHeightWrapper>
			<View className="gap-y-9">
				<HomeHeader name={profileData?.full_name} />
				<HomeGoal />
				<HomeDetails />
				<Button buttonStyle='bg-blue-400 border-white w-8/12 mx-auto py-4 rounded-xl shadow-lg shadow-blue-300' textStyle='text-white font-bold text-center text-lg'>
					<Text>Go To Dashboard</Text>
				</Button>
				<Text className='w-7/12 mx-auto text-slate-400 text-center font-semibold'>
					You got 50% of today’s goal, keep focus on your health!
				</Text>
			</View>
		</FullHeightWrapper>
  	)
}