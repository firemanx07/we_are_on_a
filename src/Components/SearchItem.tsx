import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import Counter from '@/Components/Counter'
import { useTheme } from '@/Hooks'
import Arrow from '@/Assets/Images/svg/arrow.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '@/Theme/Variables'
import { ChefsTypeState } from '@/Store/Chefs'
import { MotiPressable } from 'moti/interactions'
import FastImage from 'react-native-fast-image'
import { Dim } from '@/helpers/Dim'

const Header = (props: { title: string; count: number }) => {
  const { Fonts, Common, Gutters, Layout } = useTheme()
  return (
    <View style={[Layout.rowHCenter]}>
      <Text style={[Fonts.textBrown, Fonts.textMedium24]}>{props.title}</Text>
      <Counter
        num={props.count}
        styles={[
          Fonts.textBrown,
          Common.borderFocus,
          Fonts.textExtraSmall,
          Gutters.tinyLMargin,
          { borderRadius: 10, marginTop: 2 },
        ]}
      />
    </View>
  )
}
const TextBody = (props: { title: string; count: number }) => {
  const { Fonts, Layout, Gutters } = useTheme()
  return (
    <View
      style={[
        Layout.rowHCenter,
        Layout.justifyContentBetween,
        Gutters.largeTMargin,
      ]}
    >
      <Text style={[Fonts.textPrimary, Fonts.textNormal500]}>
        {props.title}
      </Text>
      <View style={[Layout.rowHCenter]}>
        <Text style={[Fonts.textBrown, Fonts.textExtraSmall]}>
          LOVED BY {props.count} CHEFS
        </Text>
        <TouchableOpacity>
          <Arrow fill={Colors.brown} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ChefCard = ({
  chef,
  onPress,
}: {
  chef: ChefsTypeState
  onPress?: () => void
}) => {
  const { Images, Gutters, Fonts } = useTheme()
  return (
    <MotiPressable
      onPress={onPress}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            'worklet'

            return {
              opacity: hovered || pressed ? 0.5 : 1,
            }
          },
        [],
      )}
      transition={useMemo(
        () =>
          ({ hovered, pressed }) => {
            'worklet'

            return {
              delay: hovered || pressed ? 0 : 100,
            }
          },
        [],
      )}
    >
      <FastImage
        source={Images.mock.chefBig}
        resizeMode={FastImage.resizeMode.cover}
        style={{
          width: Dim.getHorizontalDimension(170),
          height: Dim.getDimension(300),
          borderRadius: Dim.getDimension(12),
        }}
      />

      <View style={[Gutters.smallTMargin]}>
        <Text style={[Fonts.textPrimary, Fonts.titleSmall]}>{chef.name}</Text>
        {!!chef.mainRestaurant && <Text>{chef.mainRestaurant}</Text>}
        {!!chef.zone && (
          <Text>
            {chef.zone}, {chef.country}
          </Text>
        )}
      </View>
    </MotiPressable>
  )
}

export default { Header, TextBody, ChefCard }
