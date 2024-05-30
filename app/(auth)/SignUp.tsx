import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function Page() {
  return (
    <View className='flex-1 items-center justify-center'>
        <Text>SignUp</Text>
        <TouchableOpacity onPress={router.back}>
            <Text>Back</Text>
        </TouchableOpacity>
    </View>
  )
}