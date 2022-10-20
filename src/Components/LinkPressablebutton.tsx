import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import { TouchableOpacity } from '@gorhom/bottom-sheet'

type LinkPressableProps = {
  text: string
  onPress?: () => void
  disabled?: boolean
  textStyle?: StyleProp<TextStyle>
}

const LinkPressablebutton = (props: LinkPressableProps) => {
  const { Common, Fonts, Gutters } = useTheme()
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        Gutters.regularHPadding,
        Gutters.tinyRMargin,
        Gutters.smallVPadding,
        Gutters.smallTMargin,
        Common.backgroundBeige200,
        { borderRadius: Dim.getDimension(99) },
      ]}
      onPress={props.onPress}
    >
      <Text style={[Fonts.textPrimary, Fonts.textSmall, props.textStyle]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}

export default LinkPressablebutton
