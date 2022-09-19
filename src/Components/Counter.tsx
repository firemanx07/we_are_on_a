import React from 'react'
import { Text } from 'react-native'
import { useTheme } from '@/Hooks'

const Counter = ({ num }: { num: number }) => {
  const { Fonts, Common, Gutters } = useTheme()
  return (
    <Text
      style={[
        Fonts.textCenter,
        Fonts.titleSmall,
        Common.roundedBorder,
        Gutters.tinyHPadding,
      ]}
    >
      {num}
    </Text>
  )
}
export default Counter
