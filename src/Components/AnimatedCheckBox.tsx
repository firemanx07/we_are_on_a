import React, { useEffect, useImperativeHandle, useState } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'

import { useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import Counter from '@/Components/Counter'
import CheckedBox from '@/Assets/Images/svg/checked.svg'
import UncheckedBox from '@/Assets/Images/svg/unchecked.svg'

type AnimatedCheckProps = {
  imageSource?: ImageSourcePropType
  label?: string
  num?: number
  style?: StyleProp<ViewStyle>
  defaultValue?: boolean
}
export type AnimatedCheckRefHandle = {
  getCheckBoxValue: () => void
  setCheckedBoxValue: (val: boolean) => void
}
const AnimatedCheckBox = React.forwardRef<
  AnimatedCheckRefHandle,
  AnimatedCheckProps
>(({ imageSource, label, num, style, defaultValue }, ref) => {
  const [checked, setChecked] = useState<boolean>(false)
  useImperativeHandle(
    ref,
    () => ({
      getCheckBoxValue: () => {
        return checked
      },
      setCheckedBoxValue: (val: boolean) => {
        setChecked(val)
      },
    }),
    [checked, setChecked],
  )
  const { Common, Layout, Gutters, Fonts } = useTheme()

  const handleCheckboxPress = () => {
    setChecked(prev => {
      return !prev
    })
  }
  useEffect(() => {
    !!defaultValue && setChecked(defaultValue)
  }, [defaultValue])

  return (
    <TouchableWithoutFeedback onPress={handleCheckboxPress}>
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
          <View style={[Gutters.smallRMargin]}>
            {!checked ? <UncheckedBox /> : <CheckedBox />}
          </View>
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
              styles={[checked && [Fonts.textBrown, Common.borderFocus]]}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
})
export default AnimatedCheckBox

const styles = StyleSheet.create({
  // checkbox: {
  //   width: Dim.getHorizontalDimension(24),
  //   height: Dim.getHorizontalDimension(24),
  // },
  image: {
    width: Dim.getHorizontalDimension(40),
    height: Dim.getHorizontalDimension(40),
    borderRadius: Dim.getHorizontalDimension(8),
  },
})
