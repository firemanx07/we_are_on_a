import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { useTheme } from '@/Hooks'

const Counter = ({
  num,
  styles,
}: {
  num: number
  styles?: StyleProp<TextStyle>
}) => {
  const { Fonts, Common, Gutters } = useTheme()
  return (
    <Text
      style={[
        Fonts.textCenter,
        Fonts.titleSmall,
        Common.roundedBorder,
        Gutters.tinyHPadding,
        styles,
      ]}
    >
      {num}
    </Text>
  )
}
export default Counter
