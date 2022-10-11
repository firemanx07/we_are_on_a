import React from 'react'
import { Text } from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import { TouchableOpacity } from '@gorhom/bottom-sheet'

const LinkPressablebutton = (props: { text: string; onPress?: () => void }) => {
  const { Common, Fonts, Gutters } = useTheme()
  return (
    <TouchableOpacity
      style={[
        Gutters.regularHPadding,
        Gutters.smallVPadding,
        Common.backgroundBeige200,
        { borderRadius: Dim.getDimension(99) },
      ]}
      onPress={props.onPress}
    >
      <Text style={[Fonts.textPrimary, Fonts.textSmall]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default LinkPressablebutton
