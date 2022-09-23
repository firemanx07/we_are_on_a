import React from 'react'
import {
  ColorValue,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
type CustomMenuHeaderProps = {
  text: string
  textStyle: StyleProp<TextStyle>
  containerStyle?: ViewStyle
  backgroundColor?: ColorValue
  Icon?: React.ElementType
  IconType?: 'arrow' | 'menu'
  onPress?: () => void
  rightComponent?: JSX.Element
}
const CustomMenuHeader = ({
  text,
  Icon,
  textStyle,
  containerStyle,
  backgroundColor,
  IconType,
  onPress,
  rightComponent
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
          {IconType === 'menu' ? (
            <View
              style={{
                backgroundColor: Colors.primary,
                padding: 2.5,
                borderRadius: Dim.getDimension(20),
              }}
            >
              <Icon fill={Colors.white} />
            </View>
          ) : (
            <Icon stroke={Colors.primary} />
          )}
        </TouchableOpacity>
      )}
      <View style={[Layout.fill, Layout.column]}>
        <Text style={textStyle}>{text}</Text>
      </View>
      {rightComponent}
    </View>
  )
}
export default CustomMenuHeader
