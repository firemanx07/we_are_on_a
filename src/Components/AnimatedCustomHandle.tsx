import React, { useMemo, useRef, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Colors as themeColors } from '@/Theme/Variables'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import FilterButton from '@/Components/FilterButton'
import { useTheme } from '@/Hooks'
import ArrowDown from '@/Assets/Images/svg/ArrowDown.svg'
import RestautrentIconWhite from '@/Assets/Images/svg/RestaurentIconWhite.svg'
import LogoMenu from '@/Assets/Images/svg/Logo.svg'
import Search from '@/Assets/Images/svg/search_icon.svg'
import { Dim } from '@/helpers/Dim'
import { KeyFilters } from '@/enums/Slices'
import BottomSheetConatiner from '@/Containers/BottomSheetContainer'
import FiltersModal from '@/Screens/Modals/FiltersModal'
import { Modals } from '@/enums/Pages'
import { AnimatePresence } from 'moti'

// @ts-ignore
// export const transformOrigin = ({ x, y }, ...transformations) => {
//   'worklet'
//   return [
//     { translateX: x },
//     { translateY: y },
//     ...transformations,
//     { translateX: x * -1 },
//     { translateY: y * -1 },
//   ]
// }

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
  const [filterType, setFilterType] = useState<KeyFilters>('CUISINE')
  const filterSheetRef = useRef<BottomSheetModal>(null)
  const handleFilterButton = (type: KeyFilters) => {
    setFilterType(type)
    filterSheetRef.current && filterSheetRef.current.present()
  }
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const borderTopRadius = interpolate(
      animatedIndex.value,
      [0, 1],
      [20, 0],
      Extrapolate.CLAMP,
    )
    const heightHeader = interpolate(
      animatedIndex.value,
      [0, 1],
      [8, 160],
      Extrapolate.CLAMP,
    )

    return {
      borderTopLeftRadius: borderTopRadius,
      borderTopRightRadius: borderTopRadius,
      height: heightHeader,
    }
  })
  // const ContainerAnimatedHeight = useAnimatedStyle(() => {
  //
  //   return {
  //
  //   }
  // }, [])
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

  const { Fonts, Gutters, Colors, Layout } = useTheme()
  const { textMedium, textPrimary, textCenter } = Fonts
  // render
  return (
    <AnimatePresence>
      <Animated.View
        style={[containerStyle, containerAnimatedStyle]}
        renderToHardwareTextureAndroid={true}
      >
        <Animated.View
          style={[leftIndicatorStyle, leftIndicatorAnimatedStyle]}
        />

        <Animated.View style={[{ top: Dim.getDimension(8) }]}>
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
          <BottomSheetScrollView
            style={[Gutters.smallLMargin]}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={[
              Gutters.largeTMargin,
              Layout.rowHCenter,
              Layout.justifyContentBetween,
              { width: Dim.getHorizontalDimension(380) },
            ]}
          >
            <FilterButton Icon={Search} />
            <FilterButton text={'Chefs'} />
            <FilterButton
              text={'Cuisine'}
              counter={2}
              isSelected
              onPress={() => handleFilterButton('CUISINE')}
            />
            <FilterButton
              text={'Categories'}
              onPress={() => handleFilterButton('CATEGORIES')}
            />
            <FilterButton
              text={'More Filters'}
              onPress={() => handleFilterButton('MOREFILTERS')}
            />
          </BottomSheetScrollView>
        </Animated.View>
        <BottomSheetConatiner
          ref={filterSheetRef}
          name={Modals.FilterListRestaurants}
          stackBehavior={'push'}
          snapPoints={['90%']}
        >
          <FiltersModal
            type={filterType}
            modalKey={Modals.FilterListRestaurants}
          />
        </BottomSheetConatiner>
      </Animated.View>
    </AnimatePresence>
  )
}

export default Handle

const styles = StyleSheet.create({
  header: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.beige_100,
    paddingVertical: 14,
    overflow: 'hidden',
    width: Dim.getHorizontalDimension(390),
  },
  indicator: {
    position: 'absolute',
    width: Dim.getHorizontalDimension(29),
    height: 4,
    borderRadius: 4,
    backgroundColor: themeColors.brown + '20',
    alignSelf: 'center',
  },
})
