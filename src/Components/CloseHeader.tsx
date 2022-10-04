import React from 'react'
import { Dim } from '@/helpers/Dim'
import { Image, TouchableOpacity, View } from 'react-native'
import { toggleDrawer } from '@/Navigators/utils'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components/index'

const CloseHeader = () => {
  const { Common, Layout, Gutters, Images } = useTheme()

  return (
    <View
      style={[
        Layout.rowHCenter,
        Layout.fullWidth,
        Gutters.regularHPadding,
        Layout.justifyContentBetween,
        Layout.basis,
        { marginTop: Dim.getDimension(60) },
      ]}
    >
      <TouchableOpacity style={Common.zIndex} onPress={() => toggleDrawer()}>
        <Image source={Images.menu.close} />
      </TouchableOpacity>
      <View
        style={[
          Layout.fill,
          Layout.rowCenter,
          { marginLeft: Dim.getHorizontalDimension(-45) },
        ]}
      >
        <Brand
          width={Dim.getHorizontalDimension(100)}
          height={Dim.getDimension(75)}
        />
      </View>
      <View />
    </View>
  )
}
export default  CloseHeader
