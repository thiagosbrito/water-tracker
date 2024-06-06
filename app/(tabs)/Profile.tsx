import { View, Text, TextInput, Alert, Image } from 'react-native'
import FullHeightWrapper from '../../components/FullHeightWrapper';
import { Camera } from 'lucide-react-native';
import { supabase } from '../../utils/supabase';
import Loading from '../../components/Loading';
import { useCallback, useEffect, useRef, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-native-phone-input'
import Button from '../../components/Button';
import * as Burnt from 'burnt';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../provider/AuthProvider';
import { FileObject } from '@supabase/storage-js';
import { decode } from 'base64-arraybuffer';

type Profile = {
    avatar_url: string;
    full_name: string;
    phone_number: string;
    username: string | null;
}

const formSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
});

export default function Profile() {

    const { user } = useAuth();
    const [file, setFile] = useState<FileObject | null>(null);

    const [image, setImage] = useState<string | null>(null);
    const phoneRef = useRef<PhoneInput>(null);
    const [userData, setUserData] = useState<User | null>(null)
	const [profileData, setProfileData] = useState<Profile | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
            const image_uri = result.assets[0].uri || '';
            const arrayBuffer = await fetch(image_uri).then(r => r.arrayBuffer());

            if (!!arrayBuffer) {
                if (profileData?.avatar_url !== null) {
                    _deletePreviousAvatar(userData?.id as string, profileData?.avatar_url as string);
                }
                _uploadUserAvatar(userData?.id as string, result.assets[0].fileName as string, arrayBuffer);
            }

        }
    };

    const _deletePreviousAvatar = useCallback(async (uuid: string, fileName: string) => {
        const { data, error } = await supabase.storage.from('avatars').remove([`${uuid}/${fileName}`]);
        if (error) {
            Burnt.toast({
                title: 'Error while deleting avatar',
                message: error.message,
                preset: 'error'
            })
            return;
        }
    }, [])

    const _updateUserAvatarURL = useCallback(async (data: {uuid: string, avatar_url: string}) => {
        const { data: profileData, error } = await supabase
            .from('profiles')
            .update({
                avatar_url: data.avatar_url,
            })
            .eq('id', data.uuid)
        
        if (error) {
            Burnt.toast({
                title: 'Error',
                message: error.message,
                preset: 'error'
            })
            return;
        }

        Burnt.toast({
            title: 'All Good!',
            message: 'Your avatar has been updated!',
            preset: 'done'
        })
    }, [])

    const _uploadUserAvatar = useCallback(async (uuid: string, fileName: string, file: ArrayBuffer) => {
        const {data, error} = await supabase.storage.from('avatars').upload(`${uuid}/${fileName}`, file, { cacheControl: '3600', contentType: 'image/jpeg' });
        if (error) {
            Burnt.toast({
                title: 'Error',
                message: error.message,
                preset: 'error'
            })
            return;
        }
        _updateUserAvatarURL({uuid: uuid, avatar_url: fileName});
    }, [])
	
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

    
    const { control, reset, handleSubmit } = useForm({
        defaultValues: {
            username: profileData?.username || '',
            fullName: profileData?.full_name || '',
            phoneNumber: profileData?.phone_number || '',
        },
        resolver: zodResolver(formSchema),
    });
    
    const _getUserAvatarInfo = useCallback(async (uuid: string) => {
        const { data, error } = await supabase.storage.from('avatars').list(`${uuid}/`);
        if (error) {
            throw error;
        }        
        return data;
    }, [supabase])

    const _getImageSignedUrl = useCallback(async (uuid: string, fileName: string) => {
        const { data, error } = await supabase.storage.from('avatars').createSignedUrl(`${uuid}/${fileName}`, 365);
        if (error) {
            throw error;
        }
        return data?.signedUrl;
    }, []);

	const _getUserData = useCallback(async () => {
		const _user = await supabase.auth.getUser();
		if (_user.data.user?.id !== undefined && _user.data.user !== null) {
			setUserData(_user.data.user);
			const profile = await _getUserProfileData(_user.data.user.id);
            const avatarInfo = await _getUserAvatarInfo(_user.data.user.id);
            const avatar = await _getImageSignedUrl(_user.data.user.id, avatarInfo[0].name);
            if (!!avatar) {
                console.log(avatar);
                setImage(avatar);
            }
			if (profile?.id !== null) {
                profile.avatar_url = avatarInfo[0].name;
				setProfileData(profile as Profile);
                const formData = {
                    username: profile?.username as string,
                    fullName: profile?.full_name as string,
                    phoneNumber: profile?.phone_number as string,
                };
                reset(formData);
				setIsLoading(false);
			}
		}
	}, [setUserData, _getUserProfileData, setProfileData, setIsLoading]);

	useEffect(() => {
        if (!user) return;
		_getUserData();
	}, [_getUserData]);

    const onSubmit = async (data: any) => {
        const { data: profileData, error } = await supabase
            .from('profiles')
            .update({
                username: data.username,
                full_name: data.fullName,
                phone_number: data.phoneNumber,
            })
            .eq('id', userData?.id as string)
        
        if (error) {
            Burnt.toast({
                title: 'Error',
                message: error.message,
                preset: 'error'
            })
            return;
        }

        Burnt.toast({
            title: 'All Good!',
            message: 'Your profile has been updated!',
            preset: 'done'
        })
    }

	if (isLoading) {
		return <Loading />
	} else {
		
        return (
            <FullHeightWrapper className='flex-1 w-screen px-8 pt-20 bg-white'>
                <View className='h-8'>
                    <Text className='text-center font-bold text-3xl'>My Profile</Text>
                </View>
                <Button buttonStyle={'w-32 h-32 rounded-full border-4 border-blue-400 bg-slate-100 mx-auto my-8 items-center justify-center overflow-hidden'} onPress={pickImage}>
                    {!image ? <Camera size={32} className='text-slate-200' color="#94a3b8" /> : <Image source={{uri: image}} className='w-32 h-32' />}
                </Button>
                
                <View className='gap-y-6'>
                    <View className='gap-y-2'>
                        <Text className='font-bold text-lg'>Username</Text>
                        <View className='bg-gray-300 p-4  rounded-lg'>
                            <Controller control={control} name={'username'} render={( { field: {value, onChange, onBlur}}) => (
                                <TextInput 
                                    className='font-lg font-semibold text-gray-800'
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur} />
                            )} />
                        </View>
                    </View>
                    <View className='gap-y-2'>
                        <Text className='font-bold text-lg'>Full name</Text>
                        <View className='bg-gray-300 p-4 rounded-lg'>
                            <Controller control={control} name={'fullName'} render={( { field: {value, onChange, onBlur}}) => (
                                <TextInput className='font-lg font-semibold text-gray-800' value={value} onChangeText={onChange} onBlur={onBlur} />
                            )} />
                        </View>
                    </View>
                    <View className='gap-y-2'>
                        <Text className='font-bold text-lg'>Phone Number</Text>
                        <View className='bg-gray-300 p-4 rounded-lg'>
                            <Controller control={control} name={'phoneNumber'} render={({ field: { value, onChange, onBlur } }) => (
                                <PhoneInput
                                    style={{width: '100%'}} 
                                    onChangePhoneNumber={onChange}
                                    ref={phoneRef} 
                                    autoFormat={true}
                                    initialValue={value}
                                    initialCountry="br" />
                            )} />
                        </View>
                    </View>
                    <View className='mt-6'>
                        <Button
                            buttonStyle='bg-blue-500 text-white text-center py-4 rounded-lg shadow-xl shadow-blue-500'
                            textStyle='font-bold uppercase text-lg text-center text-white'
                            onPress={handleSubmit(onSubmit)}>
                            Update Profile
                        </Button>
                    </View>
                    
                    
                </View>
    
            </FullHeightWrapper>
        );
	}

    
}