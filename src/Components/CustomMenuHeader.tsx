import React from 'react'
import {
  ColorValue,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
type CustomMenuHeaderProps = {
  text: string
  textStyle: StyleProp<TextStyle>
  containerStyle?: ViewStyle[]
  backgroundColor?: ColorValue
  Icon?: React.ElementType
  IconType?: 'arrow' | 'menu'
  onPress?: () => void
  rightComponent?: JSX.Element
  centerComponent?: JSX.Element
}
const CustomMenuHeader = ({
  text,
  Icon,
  textStyle,
  containerStyle,
  backgroundColor,
  IconType,
  onPress,
  rightComponent,
  centerComponent,
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
        containerStyle,
      ]}
    >
      {!!Icon && (
        <TouchableOpacity onPress={onPress}>
          {IconType === 'menu' ? <Icon /> : <Icon stroke={Colors.primary} />}
        </TouchableOpacity>
      )}
      <View style={[Layout.fill, Layout.column, Layout.center]}>
        {centerComponent ? (
          centerComponent
        ) : (
          <Text style={textStyle}>{text}</Text>
        )}
      </View>
      {rightComponent}
    </View>
  )
}
export default CustomMenuHeader
