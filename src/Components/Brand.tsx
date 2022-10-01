import React from 'react'
import {
  View,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native'
import { useTheme } from '@/Hooks'

type Props = {
  height?: number | string
  width?: number | string
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
  style?: StyleProp<ViewStyle>
  imageSource?: ImageSourcePropType
}

const Brand = ({ height, width, mode, imageSource, style }: Props) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={[{ height, width }, style]}>
      <Image
        style={Layout.fullSize}
        source={imageSource ?? Images.logo}
        resizeMode={mode}
      />
    </View>
  )
}

Brand.defaultProps = {
  height: 200,
  width: 200,
  mode: 'contain',
}

export default Brand
