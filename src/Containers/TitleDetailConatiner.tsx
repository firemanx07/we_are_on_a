import React from 'react'
import {
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import ArrowIcon from '@/Assets/Images/svg/carret_left.svg'
import { goBack } from '@/Navigators/utils'

const TitleDetailContainer = (props: {
  children: React.ReactNode
  title?: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  disableScroll?: boolean
}) => {
  const { Gutters, Layout, Common, Fonts } = useTheme()

  return (
    <View style={[Layout.fill, Common.backgroundBeige100]}>
      <View
        style={[
          Layout.column,
          Layout.colHCenter,
          Gutters.regularHPadding,
          { height: Dim.getDimension(204) },
        ]}
      >
        <TouchableOpacity
          style={[
            {
              width: Dim.getHorizontalDimension(40),
              height: Dim.getHorizontalDimension(40),
            },
            Gutters.smallBMargin,
          ]}
          onPress={props.onPress || goBack}
        >
          <ArrowIcon
            width={Dim.getHorizontalDimension(24)}
            height={Dim.getHorizontalDimension(24)}
          />
        </TouchableOpacity>
        <View>
          <Text style={[Fonts.textLarge, Fonts.textPrimary]}>
            {props.title}
          </Text>
        </View>
      </View>
      <ScrollView
        style={Layout.fill}
        scrollEnabled={!props.disableScroll}
        contentContainerStyle={[
          Layout.fill,
          Layout.column,
          Gutters.smallHPadding,
          props.style,
        ]}
      >
        {props.children}
      </ScrollView>
    </View>
  )
}

export default TitleDetailContainer
