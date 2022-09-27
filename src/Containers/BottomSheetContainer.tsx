import React, { useCallback, useMemo } from 'react'
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'
import { Colors } from '@/Theme/Variables'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'

interface BottomSheetConatinerParams {
  name: string
  children: React.ReactNode
  snapPoints: string[]
  index?: number
  disableDrop?: boolean
  disablePanDownToClose?: boolean
  handleChange?: (index: number) => void
  onAnimate?: (fromIndex: number, toIndex: number) => void
  indicatorStyle?: StyleProp<ViewStyle>
}

const BottomSheetConatiner = React.forwardRef<
  BottomSheetModal,
  BottomSheetConatinerParams
>((props, ref) => {
  // ref
  // const bottomSheetRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => props.snapPoints, [props.snapPoints])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
    !!props.handleChange && props.handleChange(index)
  }, [])

  // renders
  const CustomBackdrop = ({
    animatedIndex,
    style,
  }: BottomSheetBackdropProps) => {
    // animated variables
    const { dismiss } = useBottomSheetModal()
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        animatedIndex.value,
        [-1, -0.5, 0],
        [0, 0.5, 0.9],
        Extrapolate.CLAMP,
      ),
    }))

    // styles
    const containerStyle = useMemo(
      () => [
        style,
        {
          backgroundColor: Colors.primary,
        },
        containerAnimatedStyle,
      ],
      [style, containerAnimatedStyle],
    )

    return (
      <Animated.View style={containerStyle}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => dismiss(props.name)}
        />
      </Animated.View>
    )
  }

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose={!props.disablePanDownToClose}
      index={props.index}
      name={props.name}
      snapPoints={snapPoints}
      onAnimate={props.onAnimate}
      handleIndicatorStyle={props.indicatorStyle}
      backgroundStyle={{
        backgroundColor: Colors.beige_100,
      }}
      backdropComponent={(!props.disableDrop && CustomBackdrop) || null}
      onChange={handleSheetChanges}
    >
      {props.children}
    </BottomSheetModal>
  )
})
export default BottomSheetConatiner
