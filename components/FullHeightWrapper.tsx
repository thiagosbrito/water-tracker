import { View, Text } from 'react-native'
import { ReactNode } from 'react'

export default function FullHeightWrapper({children}: {children: ReactNode}) {
  return (
    <View className='flex-1 bg-slate-200 px-8 pt-36'>
        {children}
    </View>
  )
}