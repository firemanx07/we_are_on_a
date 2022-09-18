import React from 'react'
import { ActivityIndicator, ColorValue, StyleSheet, View } from 'react-native'

import { Colors } from '@/Theme/Variables'

type OverlayLoaderProps = {
  backgroundColor: ColorValue
}
const OverlayLoader = ({
  backgroundColor = Colors.primary,
}: OverlayLoaderProps) => {
  return (
    <View
      style={[
        {
          backgroundColor,
        },
        styles.fullViewVCenter,
      ]}
    >
      <ActivityIndicator color={Colors.beige_100} />
    </View>
  )
}
export default OverlayLoader
const styles = StyleSheet.create({
  fullViewVCenter: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
