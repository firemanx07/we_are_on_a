import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Pages } from '@/enums/Pages'
import RegisterScreen from '@/Screens/Guest/RegisterScreen'

const Stack = createStackNavigator()

// @refresh reset
const SignUpNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Pages.Register} component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default SignUpNavigator
