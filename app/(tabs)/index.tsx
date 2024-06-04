import { Alert, Text, View } from 'react-native'
import FullHeightWrapper from '../../components/FullHeightWrapper'
import { supabase } from '../../utils/supabase'
import { useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import HomeHeader from '../../components/HomeHeader';
import HomeGoal from '../../components/HomeGoal';
import HomeDetails from '../../components/HomeDetails';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

export default function Home() {
	const auth = supabase.auth;
	const [userData, setUserData] = useState<User | null>(null)
	const [profileData, setProfileData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	
	const _getUserProfileData = useCallback(async (uuid: string) => {
		const { data, error } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', uuid)
			.single()
		
		if (error) {
			throw error;
		}

		return data;
		
	}, [supabase])

	const _getUserData = useCallback(async () => {
		const _user = await supabase.auth.getUser();
		if (_user.data.user?.id !== undefined && _user.data.user !== null) {
			setUserData(_user.data.user);
			const profileData = await _getUserProfileData(_user.data.user.id);
			if (profileData) {
				setProfileData(profileData);
				setIsLoading(false);
			}
		}
	}, [setUserData, _getUserProfileData, setProfileData, setIsLoading]);

	useEffect(() => {
		_getUserData();
	}, [_getUserData])

	if (isLoading) {
		return <Loading />
	} else {
		return (
		  <FullHeightWrapper className='flex-1 w-screen px-8 pt-14' bgColor='#e2e8f0'>
			  <View className="gap-y-9">
				  <HomeHeader name={profileData?.full_name} />
				  <HomeGoal />
				  <HomeDetails />
				  <Button buttonStyle='bg-blue-400 border-white w-8/12 mt-auto mx-auto py-4 rounded-xl shadow-lg shadow-blue-300' textStyle='text-white font-bold text-center text-lg'>
					  <Text>Go To Dashboard</Text>
				  </Button>
				  <Text className='w-7/12 mx-auto text-slate-400 text-center font-semibold'>
					  You got 50% of today’s goal, keep focus on your health!
				  </Text>
			  </View>
		  </FullHeightWrapper>
		)
	}
}