import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Pages } from '@/enums/Pages'
import HomeScreen from '@/Screens/HomeScreen'
import RestaurantDetailContainer from '@/Containers/RestaurantDetailContainer'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
      <Tab.Screen
        name={Pages.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
      <Tab.Screen
        name={Pages.RestaurantDetail}
        component={RestaurantDetailContainer}
        options={{
          headerShown: false,
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
