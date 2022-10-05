import { StyleSheet } from 'react-native'
import { CommonParams } from '@/Theme/theme'
import { Dim } from '@/helpers/Dim'

export default function <C>({ Colors, Gutters, Layout }: CommonParams<C>) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    height: 40,
    backgroundColor: Colors.primary,
  }
  const rounded = {
    ...base,
    borderRadius: Dim.getDimension(72),
  }

  return StyleSheet.create({
    base,
    rounded,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.beige_100,
    },
    largeButton: {
      width: Dim.getHorizontalDimension(326),
    },
    xlargeButton: {
      width: Dim.getHorizontalDimension(358),
    },
  })
}
