import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { BarChartBig, CirclePlus, Home, Settings, User } from 'lucide-react-native'

export default function TabLayout() {
  return (
    <View className='bg-slate-200 h-full'>
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false, tabBarStyle: { paddingTop: 12 }, tabBarShowLabel: false, }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ color }) => <Home size={28} className="" color={color} />,
            }} 
          />
          <Tabs.Screen
            name="Analytics"
            options={{
              title: 'Analytics',
              headerShown: false,
              tabBarIcon: ({ color }) => <BarChartBig size={28} className="" color={color} />,
            }} 
          />
          <Tabs.Screen
            name="SetGoal"
            options={{
              title: 'Set Your Goal',
              headerShown: false,
              tabBarIcon: ({ color }) => <CirclePlus size={46} color={color} />,
            }}
          />
          <Tabs.Screen
            name="Settings"
            options={{
              title: 'Settings',
              headerShown: false,
              tabBarIcon: ({ color }) => <Settings size={28} className=""  color={color} />,
            }}
          />
          <Tabs.Screen
            name="Profile"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color }) => <User size={28} color={color} />,
            }}
          />
        </Tabs>
        
    </View>
  )
}