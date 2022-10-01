import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Pages } from '@/enums/Pages'
import RegisterScreen from '@/Screens/Guest/RegisterScreen'
import SignUpFormScreen from '@/Screens/Guest/SignUpFormScreen'

const Stack = createStackNavigator()

// @refresh reset
const SignUpNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Pages.Register} component={RegisterScreen} />
      <Stack.Screen name={Pages.RegisterForm} component={SignUpFormScreen} />
    </Stack.Navigator>
  )
}

export default SignUpNavigator
