import { View, Text } from 'react-native'
import { ReactNode } from 'react'

export default function FullHeightWrapper({children}: {children: ReactNode}) {
  return (
    <View className='pt-20 flex-1 bg-slate-200 px-8'>
        {children}
    </View>
  )
}