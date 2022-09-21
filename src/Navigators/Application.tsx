import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import WelcomeScreen from '@/Screens/WelcomeScreen'
import LocationModal from '@/Screens/Modals/LocationModal'
import { Pages } from '@/enums/Pages'
import DrawerNavigator from '@/Navigators/DrawerNavigator'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Pages.StartUp} component={StartupContainer} />
          <Stack.Screen name={Pages.onBoarding} component={WelcomeScreen} />
          <Stack.Screen name={Pages.location} component={LocationModal} />
          <Stack.Screen name={Pages.Menu} component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
