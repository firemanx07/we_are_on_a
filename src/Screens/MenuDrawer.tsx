import React, { useCallback, useRef, useState } from 'react'
import { ExampleContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import { navigate, pushScreen, toggleDrawer } from '@/Navigators/utils'
import { Brand } from '@/Components'
import { Dim } from '@/helpers/Dim'
import BottomSheetConatiner from '@/Containers/BottomSheetContainer'
import Settings from './Settings'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Pages, Stacks } from '@/enums/Pages'
import { Config } from '@/Config'

type HomeProps = {}
const CustomDrawerItem = (label: string, onPress: () => void) => {
  const { Fonts, Gutters } = useTheme()
  const { textBeige100, textCenter, textLarge } = Fonts
  return (
    <TouchableOpacity style={Gutters.tinyVPadding} onPress={onPress}>
      <Text style={[textCenter, textBeige100, textLarge]}>{label}</Text>
    </TouchableOpacity>
  )
}
const MenuDrawer = ({}: HomeProps) => {
  const { Fonts, Gutters, Colors, Layout, Images, Common } = useTheme()

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present()
    navigate(Pages.Menu, [])
  }, [])

  const { textBeige100, textNormal500 } = Fonts
  const args: [string, () => void] = !isLoggedIn
    ? [
        'Signup',
        () => {
          setIsLoggedIn(true)
          pushScreen(Stacks.SignUpNav, Pages.Register)
        },
      ]
    : ['My Account', handlePresentModalPress]
  const rightbutton = (
    <TouchableOpacity onPress={args[1]}>
      <Text style={[textBeige100, textNormal500]}>{args[0]}</Text>
    </TouchableOpacity>
  )

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
        {CustomDrawerItem('ONA Popups', () => Linking.openURL(Config.POP_UPS))}
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
      <BottomSheetConatiner
        ref={bottomSheetRef}
        name={'Settings'}
        snapPoints={['90%']}
      >
        <Settings />
      </BottomSheetConatiner>
    </ExampleContainer>
  )
}
export default MenuDrawer
