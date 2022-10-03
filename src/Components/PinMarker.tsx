import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import OutlinedText from '@/Components/OutlinedText'
import { Dim } from '@/helpers/Dim'
import { Colors } from '@/Theme/Variables'
import { useTheme } from '@/Hooks'
import FavPin from '@/Assets/Images/svg/favorite_pin.svg'

type Props = {
  text: string
  source: ImageSourcePropType
  isFavourite?: boolean
}
const PinMarker = (props: Props) => {
  const { Layout, Common, Gutters } = useTheme()
  return (
    <View style={[Layout.colVCenter, styles.pinContainer]}>
      <View
        style={[Common.elevationLow, styles.imageRadius, Gutters.tinyBMargin]}
      >
        <Image
          style={[styles.imageBorder, styles.imageRadius, Common.elevationLow]}
          resizeMode={'cover'}
          source={props.source}
        />
      </View>
      <OutlinedText shadow color={Colors.white} stroke={2}>
        <Text>{props.text}</Text>
      </OutlinedText>
      {props.isFavourite && (
        <View style={[Common.posAbs, styles.favoritePos]}>
          <FavPin
            width={Dim.getHorizontalDimension(24)}
            height={Dim.getHorizontalDimension(24)}
          />
        </View>
      )}
    </View>
  )
}
export default PinMarker
const styles = StyleSheet.create({
  imageRadius: {
    borderRadius: Dim.getDimension(70) / 2,
    height: Dim.getDimension(68),
    width: Dim.getDimension(68),
  },
  imageBorder: {
    borderWidth: 4,
    borderColor: Colors.beige_200,
    overflow: 'hidden',
  },
  pinContainer: {
    width: Dim.getHorizontalDimension(90),
    paddingTop: Dim.getDimension(5),
  },
  favoritePos: {
    top: Dim.getDimension(9),
    right: Dim.getHorizontalDimension(11),
  },
})
