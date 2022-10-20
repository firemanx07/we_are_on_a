import React from 'react'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useAppSelector, useTheme, useTypedRoute } from '@/Hooks'
import Upload from '@/Assets/Images/svg/upload.svg'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { ToggleIcon } from '@/helpers/AnimatedToggle'
import favEmpty from '@/Assets/Images/svg/favorite_empty.svg'
import favFill from '@/Assets/Images/svg/favorite_filled.svg'
import BackTranparent from '@/Assets/Images/svg/back_transparent.svg'
import DirectionArrow from '@/Assets/Images/svg/direction.svg'
import { Dim } from '@/helpers/Dim'

// @ts-ignore
import { SliderBox } from 'react-native-image-slider-box'
import FastImage from 'react-native-fast-image'
import { goBack } from '@/Navigators/utils'
import { Pages } from '@/enums/Pages'
import { selectRestaurantById } from '@/Store/Selectors/RestaurantsSelectors'
import LinkPressablebutton from '@/Components/LinkPressablebutton'
import LogoMenu from '@/Assets/Images/svg/Logo.svg'
import { useFocusEffect } from '@react-navigation/native'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import ReviewBox from '@/Components/ReviewBox'
import { Spacer } from '@/Components/Spacer'

type Props = {
  style: StyleProp<ViewStyle>
}
const Header = (props: {
  animatedStyle?: Animated.AnimateStyle<ViewStyle>
  containerAnimatedStyle?: Animated.AnimateStyle<ViewStyle>
  isPrimary?: boolean
}) => {
  const { Layout, Common, Gutters, Colors } = useTheme()
  return (
    <Animated.View
      style={[
        {
          height: Dim.getDimension(100),
          width: Dim.getHorizontalDimension(390),
        },
        Common.posAbsTop,
        Layout.justifyContentEnd,
        Common.zIndex,
        props.animatedStyle,
        props.containerAnimatedStyle,
      ]}
    >
      <View
        style={[
          Layout.fullWidth,
          Layout.row,
          Layout.justifyContentBetween,
          Gutters.regularHPadding,
          Gutters.smallBPadding,
        ]}
      >
        <View>
          <TouchableOpacity onPress={() => goBack()}>
            <BackTranparent
              fill={props.isPrimary ? Colors.primary : Colors.beige_100}
            />
          </TouchableOpacity>
        </View>
        <View style={[Layout.rowHCenter]}>
          <TouchableOpacity style={[Gutters.regularHMargin]}>
            <Upload
              fill={props.isPrimary ? Colors.primary : Colors.beige_100}
            />
          </TouchableOpacity>
          <ToggleIcon
            First={favEmpty}
            customFill={{
              first: props.isPrimary ? Colors.primary : Colors.beige_100,
            }}
            Second={favFill}
          />
        </View>
      </View>
    </Animated.View>
  )
}
const RestaurantDetailContainer = ({}: Props) => {
  const translationY = useSharedValue(0)
  const { dismissAll } = useBottomSheetModal()
  const {
    params: { id: RestaurantID },
  } = useTypedRoute<Pages.RestaurantDetail>()
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y
  })
  const { Layout, Common, Gutters, Images, Colors, Fonts } = useTheme()

  const resturant = useAppSelector(state =>
    selectRestaurantById(state, RestaurantID),
  )

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, 275],
      [0, 1],
      Extrapolate.CLAMP,
    )
    return {
      backgroundColor: `rgba(247, 246, 242, ${opacity})`,
    }
  })
  const AnimatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, 275],
      [0, 1],
      Extrapolate.CLAMP,
    )
    return {
      opacity,
    }
  })
  const ReversedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, 275],
      [1, 0],
      Extrapolate.CLAMP,
    )
    return {
      opacity,
    }
  })
  useFocusEffect(() => dismissAll())
  return (
    <View style={[Layout.fill, Layout.column, Common.backgroundBeige100]}>
      <Header
        key={'white'}
        animatedStyle={AnimatedOpacity}
        isPrimary
        containerAnimatedStyle={containerAnimatedStyle}
      />
      <Header key={'dark'} animatedStyle={ReversedOpacity} />

      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
        <SliderBox
          ImageComponent={FastImage}
          images={Images.mock.slider}
          sliderBoxHeight={Dim.getDimension(420)}
          dotColor={Colors.beige_100}
          inactiveDotColor="transparent"
          paginationBoxVerticalPadding={20}
          dotStyle={{ ...styles.dots, borderColor: Colors.beige_100 }}
          imageLoadingColor={Colors.brown}
        />
        <View style={[Gutters.largeTMargin, Gutters.regularHPadding]}>
          <Text style={[Fonts.textPrimary, Fonts.textLarge]}>
            {resturant.name}
          </Text>
          <View style={[Layout.rowHCenter]}>
            <Text
              style={[Fonts.textPrimary, Fonts.textSmall, Gutters.tinyRPadding]}
            >
              {resturant.address}
            </Text>
            <DirectionArrow />
          </View>
          <View
            style={[
              Layout.rowHCenter,
              Gutters.regularVPadding,
              Layout.flexWrap,
            ]}
          >
            <LinkPressablebutton
              text={'Fine Dining'}
              disabled
              textStyle={[Fonts.textExtraSmall]}
            />
            <LinkPressablebutton
              text={'French Cuisine'}
              disabled
              textStyle={[Fonts.textExtraSmall]}
            />
            <LinkPressablebutton
              text={'Open on Sunday'}
              disabled
              textStyle={[Fonts.textExtraSmall]}
            />
          </View>
        </View>
        <View
          style={[
            Layout.colVCenter,
            { minHeight: Dim.getDimension(130) },
            Gutters.largeTMargin,
          ]}
        >
          <LogoMenu
            fill={Colors.primary}
            style={[Common.backgroundBeige100, Common.zIndex]}
            height={Dim.getDimension(99)}
            width={Dim.getHorizontalDimension(89)}
          />
          <View
            style={[
              Layout.fullWidth,
              Layout.alignItemsCenter,
              Layout.justifyContentEnd,
              Common.borderBeige_300,
              styles.underLogo,
            ]}
          >
            <Text style={[Fonts.titleSmall, Fonts.textBrown]}>
              4 CHEFS LOVE THIS RESTAURANT
            </Text>
          </View>
        </View>
        <ReviewBox />
        <ReviewBox />
        <ReviewBox />
        <ReviewBox />
        <Spacer />
      </Animated.ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  dots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
  },
  underLogo: {
    borderTopWidth: 1,
    paddingTop: Dim.getDimension(60),
    marginTop: -Dim.getDimension(49),
  },
})

export default RestaurantDetailContainer
