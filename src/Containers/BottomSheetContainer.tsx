import React, { useCallback, useMemo } from 'react'
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { Colors } from '@/Theme/Variables'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

interface BottomSheetConatinerParams {
  name: string
  children: React.ReactNode
  snapPoints: string[]
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
  }, [])

  // renders
  const CustomBackdrop = ({
    animatedIndex,
    style,
  }: BottomSheetBackdropProps) => {
    // animated variables
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

    return <Animated.View style={containerStyle} />
  }

  return (
    <BottomSheetModal
      ref={ref}
      name={props.name}
      enablePanDownToClose
      enableContentPanningGesture
      enableHandlePanningGesture
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: Colors.beige_100,
      }}
      backdropComponent={CustomBackdrop}
      onChange={handleSheetChanges}
    >
      {props.children}
    </BottomSheetModal>
  )
})
export default BottomSheetConatiner
