import React, { useMemo } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { BottomSheetHandleProps } from '@gorhom/bottom-sheet'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Colors } from '@/Theme/Variables'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import FilterButton from '@/Components/FilterButton'
import { useTheme } from '@/Hooks'
import ArrowDown from '@/Assets/Images/svg/ArrowDown.svg'
import RestautrentIconWhite from '@/Assets/Images/svg/RestaurentIconWhite.svg'
import LogoMenu from '@/Assets/Images/svg/Logo.svg'
import Search from '@/Assets/Images/svg/search_icon.svg'
import { Dim } from '@/helpers/Dim'

// @ts-ignore
export const transformOrigin = ({ x, y }, ...transformations) => {
  'worklet'
  return [
    { translateX: x },
    { translateY: y },
    ...transformations,
    { translateX: x * -1 },
    { translateY: y * -1 },
  ]
}

interface HandleProps extends BottomSheetHandleProps {
  style?: StyleProp<ViewStyle>
  close?: () => void
}

const Handle: React.FC<HandleProps> = ({ style, animatedIndex, close }) => {
  //#region animations
  // const indicatorTransformOriginY = useDerivedValue(() =>
  //   interpolate(animatedIndex.value, [0, 1, 2], [-1, 0, 1], Extrapolate.CLAMP),
  // )
  //#endregion

  //#region styles
  const containerStyle = useMemo(() => [styles.header, style], [style])
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const borderTopRadius = interpolate(
      animatedIndex.value,
      [0, 1],
      [20, 0],
      Extrapolate.CLAMP,
    )

    return {
      borderTopLeftRadius: borderTopRadius,
      borderTopRightRadius: borderTopRadius,
    }
  })
  const ContainerAnimatedHeight = useAnimatedStyle(() => {
    const heightHeader = interpolate(
      animatedIndex.value,
      [0, 1],
      [4, 164],
      Extrapolate.CLAMP,
    )
    return {
      height: heightHeader,
    }
  }, [])
  const leftIndicatorStyle = useMemo(
    () => ({
      ...styles.indicator,
    }),
    [],
  )
  const leftIndicatorAnimatedStyle = useAnimatedStyle(() => {
    const leftIndicatorRotate = interpolate(
      animatedIndex.value,
      [0, 0.25, 1],
      [1, 1, 0],
      Extrapolate.CLAMP,
    )
    return {
      opacity: leftIndicatorRotate,
    }
  })

  //#endregion

  const { Fonts, Gutters, Common, Colors, Layout } = useTheme()
  const { textMedium, textPrimary, textCenter } = Fonts
  // render
  return (
    <Animated.View
      style={[containerStyle, containerAnimatedStyle, ContainerAnimatedHeight]}
      renderToHardwareTextureAndroid={true}
    >
      <Animated.View style={[leftIndicatorStyle, leftIndicatorAnimatedStyle]} />

      <Animated.View
        style={[
          Layout.fullWidth,
          Common.posAbs,
          { top: Dim.getDimension(16), height: Dim.getDimension(164) },
        ]}
      >
        <CustomMenuHeader
          text={'HOME'}
          textStyle={[textCenter, textMedium, textPrimary]}
          Icon={ArrowDown}
          containerStyle={[Gutters.largeTMargin]}
          onPress={close}
          rightComponent={
            <TouchableOpacity>
              <RestautrentIconWhite fill={Colors.primary} />
            </TouchableOpacity>
          }
          centerComponent={<LogoMenu fill={Colors.primary} />}
        />
        <Animated.ScrollView
          style={[Gutters.regularTMargin, Gutters.smallLMargin]}
          horizontal
          contentContainerStyle={[
            Layout.rowHCenter,
            Layout.justifyContentBetween,
            Layout.fullWidth,
          ]}
        >
          <FilterButton Icon={Search} />
          <FilterButton text={'Chefs'} />
          <FilterButton text={'Cuisine'} counter={2} isSelected />
          <FilterButton text={'Categories'} />
        </Animated.ScrollView>
      </Animated.View>
    </Animated.View>
  )
}

export default Handle

const styles = StyleSheet.create({
  header: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.beige_100,
    paddingVertical: 14,
  },
  indicator: {
    position: 'absolute',
    width: Dim.getHorizontalDimension(29),
    height: 4,
    borderRadius: 4,
    backgroundColor: Colors.brown + '20',
    alignSelf: 'center',
  },
})
