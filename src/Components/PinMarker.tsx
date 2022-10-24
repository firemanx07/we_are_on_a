import React from 'react'
import { Image, ImageRequireSource, StyleSheet, Text, View } from 'react-native'
import OutlinedText from '@/Components/OutlinedText'
import { Dim } from '@/helpers/Dim'
import { Colors } from '@/Theme/Variables'
import { useTheme } from '@/Hooks'
import FavPin from '@/Assets/Images/svg/favorite_pin.svg'
import { MapMarkerProps, Marker } from 'react-native-maps'

type Props = MapMarkerProps & {
  text: string
  source?: ImageRequireSource
  isFavourite?: boolean
}
const PinMarker = (props: Props) => {
  const { Layout, Common, Gutters, Images } = useTheme()
  const PinContent = (
    <>
      <View
        style={[Common.elevationLow, styles.imageRadius, Gutters.tinyBMargin]}
      >
        <Image
          style={[styles.imageBorder, styles.imageRadius, Common.elevationLow]}
          resizeMode={'cover'}
          source={props.source}
          defaultSource={Images.onBoarding}
        />
      </View>
      <OutlinedText shadow color={Colors.white} stroke={2}>
        <Text  >{props.text}</Text>
      </OutlinedText>
      {props.isFavourite && (
        <View style={[Common.posAbs, styles.favoritePos]}>
          <FavPin
            width={Dim.getHorizontalDimension(24)}
            height={Dim.getHorizontalDimension(24)}
          />
        </View>
      )}
    </>
  )
  return (
    <Marker
      style={[Layout.colVCenter, styles.pinContainer]}
      coordinate={props.coordinate}
      tracksViewChanges={false}
      onPress={props.onPress}
    >
      {PinContent}
    </Marker>
  )
}
export default React.memo(PinMarker)
const styles = StyleSheet.create({
  imageRadius: {
    borderRadius: Dim.getDimension(70) / 2,
    height: Dim.getDimension(68),
    width: Dim.getDimension(68),
  },
  imageBorder: {
    borderWidth: 2,
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
