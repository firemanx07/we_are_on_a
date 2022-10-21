import React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import FastImage from 'react-native-fast-image'

import Arrow from '@/Assets/Images/svg/arrow.svg'
import { Dim } from '@/helpers/Dim'

const ReviewBox = () => {
  const { Layout, Common, Images, Fonts, Gutters, Colors } = useTheme()
  return (
    <View
      style={[
        Layout.grow,
        Common.backgroundWhite,
        Gutters.regularHPadding,
        Gutters.regularVPadding,
        Gutters.largeTMargin,
        Gutters.regularHMargin,
        { borderRadius: 12 },
      ]}
    >
      <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
        <View style={Layout.rowHCenter}>
          <FastImage
            style={[
              {
                width: Dim.getDimension(48),
                height: Dim.getDimension(48),
                borderRadius: 8,
              },
              Gutters.smallRMargin,
            ]}
            resizeMode={FastImage.resizeMode.cover}
            source={Images.mock.chef}
          />
          <View>
            <Text style={[Fonts.textSmall, Fonts.textPrimary]}>
              Robert Mendoza
            </Text>
            <Text style={[Fonts.textSmall, Fonts.textGrey100]}>
              Le Saint Sébastien
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Arrow fill={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={[Layout.grow, Gutters.regularVPadding]}>
        <Text
          style={[Fonts.textNormal, Fonts.textPrimary]}
          textBreakStrategy={'simple'}
        >
          I have been coming here since it first opened. It’s a no fuss,
          straight up delicious restaurant. I love all the yakitori, but on time
          he served me a grilled cod head with a spicy but on time he served me
          a grilled cod head with a spicy.{' '}
        </Text>
      </View>
      <View>
        <Text style={[Fonts.titleSmall, Fonts.textBrown]}>BEST DISH</Text>
        <Text
          style={[Fonts.textNormal, Fonts.textPrimary, Gutters.tinyTMargin]}
        >
          Homard au Xérès et cacao
        </Text>
      </View>
    </View>
  )
}

export default ReviewBox
