import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading() {
    return (
        <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size='large' color='#4B5563' />
        </View>
    )
}