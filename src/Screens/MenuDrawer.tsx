import React, { useState } from 'react'
import { ExampleContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { toggleDrawer } from '@/Navigators/utils'
import { Brand } from '@/Components'
import { Dim } from '@/helpers/Dim'

type HomeProps = {}

const MenuDrawer = ({}: HomeProps) => {
  const { Fonts, Gutters, Colors, Layout, Images, Common } = useTheme()

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false)

  const { textBeige100, textNormal500, textCenter, textLarge } = Fonts
  const args: [string, () => void] = !isLoggedIn
    ? ['Signup', () => setIsLoggedIn(true)]
    : ['My Account', () => console.log('hey')]
  const rightbutton = (
    <TouchableOpacity onPress={args[1]}>
      <Text style={[textBeige100, textNormal500]}>{args[0]}</Text>
    </TouchableOpacity>
  )

  const CustomDrawerItem = (label: string, onPress: () => void) => {
    return (
      <TouchableOpacity style={Gutters.tinyVPadding} onPress={onPress}>
        <Text style={[textCenter, textBeige100, textLarge]}>{label}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <ExampleContainer
      style={[Layout.alignItemsCenter, { backgroundColor: Colors.brown }]}
    >
      <View
        style={[
          Layout.rowHCenter,
          Layout.fullWidth,
          Gutters.regularHPadding,
          Gutters.largeTMargin,
          Layout.justifyContentBetween,
          {
            paddingBottom: Dim.getDimension(81),
          },
        ]}
      >
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <Image source={Images.menu.close} />
        </TouchableOpacity>
        {rightbutton}
      </View>

      <Brand
        height={Dim.getDimension(255)}
        width={Dim.getHorizontalDimension(230)}
      />
      <View style={[Layout.colCenter, Gutters.regularVMargin]}>
        {CustomDrawerItem('City Guides', () => {})}
        {CustomDrawerItem('The Chefs', () => {})}
        {CustomDrawerItem('My wishlist', () => {})}
        {CustomDrawerItem('ONA Popups', () => {})}
      </View>
      <View
        style={[
          Common.posAbs,
          Layout.fullWidth,
          Layout.center,
          { bottom: Dim.getDimension(60) },
        ]}
      >
        <Image source={Images.menu.logoPartners} />
      </View>
    </ExampleContainer>
  )
}
export default MenuDrawer
