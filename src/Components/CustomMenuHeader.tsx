import React from 'react'
import { ColorValue, StyleProp, Text, TextStyle, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
type CustomMenuHeaderProps = {
  text: string
  textStyle: StyleProp<TextStyle>
  backgroundColor?: ColorValue
  Icon?: React.ElementType
}
const CustomMenuHeader = ({
  text,
  Icon,
  textStyle,
  backgroundColor,
}: CustomMenuHeaderProps) => {
  const { Layout, Gutters, Colors } = useTheme()
  return (
    <View
      style={[
        Layout.fullWidth,
        Layout.rowHCenter,
        Gutters.regularHPadding,
        !!backgroundColor && { backgroundColor },
        { height: Dim.getDimension(44) },
      ]}
    >
      {!!Icon && <Icon stroke={Colors.primary} />}
      <View style={[Layout.fill, Layout.column]}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  )
}
export default CustomMenuHeader
