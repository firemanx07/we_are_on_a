import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MenuDrawer from '@/Screens/MenuDrawer'
import { useTheme } from '@/Hooks'
import HomeScreen from '@/Screens/HomeScreen'
import Settings from '@/Screens/Settings'
import MainNavigator from '@/Navigators/Main'
import { ExampleContainer } from '@/Containers'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const { Layout } = useTheme()

  return (
    <Drawer.Navigator
      initialRouteName={'Main'}
      backBehavior="initialRoute"
      drawerContent={MenuDrawer}
      //drawerStyle={{ width: '100%' }}
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: Layout.fullWidth,
        headerShown: false,
      }}
      // drawerContentOptions={state}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name={'SettingDetail'} component={ExampleContainer} />
    </Drawer.Navigator>
  )
}
export default DrawerNavigator
