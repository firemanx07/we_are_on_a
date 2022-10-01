import React from 'react'
import {
  ButtonProps,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'

type ButtonWithDescProps = ButtonProps & {
  Icon: React.ElementType
  title: string
  description: string
  style?: StyleProp<ViewStyle>
}

const ButtonWithDescription = ({
  Icon,
  title,
  description,
  onPress,
  style,
}: ButtonWithDescProps) => {
  const { Layout, Fonts, Common, Gutters } = useTheme()

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          Layout.colVCenter,
          Layout.justifyContentAround,
          Common.backgroundBrown,
          Gutters.regularVPadding,
          Gutters.smallHPadding,
          { borderRadius: Dim.getDimension(16) },
          style,
        ]}
      >
        <Icon />
        <Text style={[Fonts.textWhite, Fonts.textMedium24, Fonts.textCenter]}>
          {title}
        </Text>
        <Text style={[Fonts.textWhite, Fonts.textNormal, Fonts.textCenter]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo<ButtonWithDescProps>(ButtonWithDescription)
