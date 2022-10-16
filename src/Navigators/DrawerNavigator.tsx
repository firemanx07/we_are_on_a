import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MenuDrawer from '@/Screens/MenuDrawer'
import { useTheme } from '@/Hooks'
import Settings from '@/Screens/Settings'
import MainNavigator from '@/Navigators/Main'
import SignUpNavigator from '@/Navigators/SignUpNav'
import { Pages, Stacks } from '@/enums/Pages'
import SettingDetail from '@/Containers/SettingDetail'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const { Layout } = useTheme()

  return (
    <Drawer.Navigator
      initialRouteName={'Main'}
      backBehavior="initialRoute"
      drawerContent={MenuDrawer}
      detachInactiveScreens={true}
      //drawerStyle={{ width: '100%' }}
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: Layout.fullWidth,
        headerShown: false,
      }}
      // drawerContentOptions={state}
    >
      <Drawer.Screen
        name={Stacks.Main}
        component={MainNavigator}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen name={Pages.Settings} component={Settings} />
      <Drawer.Screen name={Pages.SettingDetail} component={SettingDetail} />
      <Drawer.Screen name={Stacks.SignUpNav} component={SignUpNavigator} />
    </Drawer.Navigator>
  )
}
export default DrawerNavigator
