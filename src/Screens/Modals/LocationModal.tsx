import React, { useCallback, useRef } from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAppSelector, useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import CityPicker from '@/Components/CityPicker'
import BottomSheetConatiner from '@/Containers/BottomSheetContainer'
import { Modals, Pages } from '@/enums/Pages'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { navigate } from '@/Navigators/utils'
import Geolocation from '@react-native-community/geolocation'
import { useFocusEffect } from '@react-navigation/native'
import { selectSelectedZone } from '@/Store/Selectors/RegionsSelectors'

const LocationModal = () => {
  const { Layout, Gutters, Fonts, Common, Images } = useTheme()
  const {
    textRegular,
    textMedium,
    textBeige100,
    textGrey100,
    textLarge,
    textPrimary,
    textCenter,
  } = Fonts
  const region = useAppSelector(selectSelectedZone)
  useFocusEffect(() => {
    region !== null && navigate(Pages.Menu, [])
  })
  const { t } = useTranslation()
  type ImageProps = {
    source: ImageSourcePropType
    style: StyleProp<ImageStyle>
  }
  const Mask1: ImageProps[] = [
    {
      source: Images.location.Rectangle1,
      style: [Common.posAbs, styles.rect1],
    },
    {
      source: Images.location.Rectangle2,
      style: [Common.posAbs, styles.rect2],
    },
    {
      source: Images.location.Rectangle3,
      style: [Common.posAbs, styles.rect3],
    },
    {
      source: Images.location.Rectangle4,
      style: [Common.posAbs, styles.rect4],
    },
    {
      source: Images.location.Rectangle5,
      style: [Common.posAbs, styles.rect5],
    },
    {
      source: Images.location.Rectangle6,
      style: [Common.posAbs, styles.rect6],
    },
  ]
  const Mask2: ImageProps[] = [
    {
      source: Images.location.Pin,
      style: [Common.posAbs, styles.pin, styles.pinDim],
    },
    {
      source: Images.location.Pin1,
      style: [Common.posAbs, styles.pin1, styles.pinDim],
    },
    {
      source: Images.location.Pin2,
      style: [Common.posAbs, styles.pin2, styles.pinDim],
    },
    {
      source: Images.location.Pin3,
      style: [Common.posAbs, styles.pin3, styles.pinDim],
    },
    {
      source: Images.location.Pin,
      style: [Common.posAbs, styles.pin, styles.pinDim],
    },
    {
      source: Images.location.myLocation,
      style: [Common.posAbs, styles.myLocation],
    },
  ]
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const handleLocationPress = useCallback(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'auto',
      locationProvider: 'auto',
    })
    Geolocation.getCurrentPosition(
      pos => console.log(pos),
      e => console.log(e),
    )
  }, [])
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present()
  }, [])
  const LocationDetails = (
    <View
      style={[
        Layout.fill,
        Common.backgroundReset,
        Layout.colVCenter,
        Layout.columnReverse,
      ]}
    >
      <View style={[Layout.colCenter]}>
        <TouchableOpacity
          style={[Common.button.rounded, Common.button.largeButton]}
          onPress={handleLocationPress}
        >
          <Text style={[textRegular, textMedium, textBeige100]}>
            {t('location.button')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Common.button.outlineRounded,
            Gutters.largeBMargin,
            Common.button.largeButton,
            styles.marginT16,
          ]}
          onPress={handlePresentModalPress}
        >
          <Text style={[textRegular, textMedium, textGrey100]}>
            {t('location.skip')}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          Layout.colCenter,
          Gutters.largeBMargin,
          Common.button.largeButton,
        ]}
      >
        <Text style={[textLarge, textPrimary, Gutters.smallBMargin]}>
          {t('location.title')}
        </Text>
        <Text style={[textCenter, textGrey100, Gutters.largeHPadding]}>
          {t('location.description')}
        </Text>
      </View>
    </View>
  )

  return (
    <View style={[Layout.fill, Common.backgroundBeige100]}>
      {Mask1.map((elem, index) => (
        <Image key={`Rect-${index}`} {...elem} />
      ))}
      <View style={[Common.posAbs, Layout.fullSize, Common.backgroundReset]}>
        {Mask2.map((elem, index) => (
          <Image key={`Pin-${index}`} {...elem} />
        ))}
        {LocationDetails}
        <BottomSheetConatiner
          ref={bottomSheetRef}
          enablePanDownToClose={false}
          name={Modals.CityPicker}
          snapPoints={['95%']}
          onAnimate={(from, to) => {
            // if (to) navigate(Pages.Menu, [])
          }}
        >
          <CityPicker />
        </BottomSheetConatiner>
      </View>
    </View>
  )
}

export default LocationModal

const styles = StyleSheet.create({
  rect1: {
    top: 0,
    right: 0,
  },
  rect2: {
    top: Dim.getDimension(68),
    right: Dim.getHorizontalDimension(256),
  },
  rect3: {
    top: Dim.getDimension(18),
    right: Dim.getHorizontalDimension(68),
  },
  rect4: {
    top: Dim.getDimension(376),
    right: Dim.getHorizontalDimension(268),
  },
  rect5: {
    top: Dim.getDimension(312),
    right: Dim.getHorizontalDimension(84),
  },
  rect6: {
    top: Dim.getDimension(250),
    right: 0,
  },
  pinDim: {
    width: Dim.getHorizontalDimension(68),
    height: Dim.getDimension(94),
  },
  pin: {
    top: Dim.getDimension(404),
    left: Dim.getHorizontalDimension(78),
  },
  pin1: {
    top: Dim.getDimension(183),
    left: Dim.getHorizontalDimension(57),
  },
  pin2: {
    top: Dim.getDimension(96),
    right: Dim.getHorizontalDimension(77),
  },
  pin3: {
    top: Dim.getDimension(302),
    right: Dim.getHorizontalDimension(49),
  },
  myLocation: {
    width: Dim.getDimension(74),
    height: Dim.getDimension(74),
    top: Dim.getDimension(280),
    right: Dim.getHorizontalDimension(154),
  },
  marginT80: {
    marginTop: Dim.getDimension(80),
  },
  marginT16: {
    marginTop: Dim.getDimension(16),
  },
})
