import React, { useImperativeHandle, useState } from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  ImageSourcePropType,
  Image,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native'
import AnimatedCheckbox from 'react-native-checkbox-reanimated'
import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import Counter from '@/Components/Counter'

type AnimatedCheckProps = {
  imageSource?: ImageSourcePropType
  label?: string
  num?: number
  style?: StyleProp<ViewStyle>
}
const AnimatedCheckBox = React.forwardRef<any, AnimatedCheckProps>(
  ({ imageSource, label, num, style }, ref) => {
    const [checked, setChecked] = useState<boolean>(false)
    useImperativeHandle(
      ref,
      () => ({
        getCheckBoxValue: () => {
          return checked
        },
      }),
      [checked],
    )
    const { Colors, Layout, Gutters, Fonts } = useTheme()

    const handleCheckboxPress = () => {
      setChecked(prev => {
        return !prev
      })
    }

    return (
      <View
        style={[
          Layout.fullWidth,
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Gutters.smallHPadding,
          style,
        ]}
      >
        <View style={[Layout.rowHCenter]}>
          <Pressable
            onPress={handleCheckboxPress}
            style={[styles.checkbox, Gutters.tinyRMargin]}
          >
            <AnimatedCheckbox
              checked={checked}
              highlightColor={Colors.brown}
              checkmarkColor={Colors.white}
              boxOutlineColor={Colors.primary}
            />
          </Pressable>
          {!!imageSource && (
            <Image
              source={imageSource}
              style={[styles.image, Gutters.tinyRMargin]}
            />
          )}
          {!!label && (
            <Text
              style={[
                Fonts.textPrimary,
                Fonts.textNormal500,
                checked && Fonts.textBrown,
              ]}
            >
              {label}
            </Text>
          )}
        </View>
        {!!num && (
          <View>
            <Counter
              num={num}
              styles={[
                checked && [Fonts.textBrown, { borderColor: Colors.brown }],
              ]}
            />
          </View>
        )}
      </View>
    )
  },
)
export default AnimatedCheckBox

const styles = StyleSheet.create({
  checkbox: {
    width: Dim.getHorizontalDimension(24),
    height: Dim.getHorizontalDimension(24),
  },
  image: {
    width: Dim.getHorizontalDimension(40),
    height: Dim.getHorizontalDimension(40),
    borderRadius: Dim.getHorizontalDimension(8),
  },
})
