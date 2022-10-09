import React from 'react'
import Animated from 'react-native-reanimated'
import { useTheme } from '@/Hooks'
import BackTransparent from '@/Assets/Images/svg/back_transparent.svg'
import Upload from '@/Assets/Images/svg/upload.svg'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'
import { ToggleIcon } from '@/helpers/AnimatedToggle'
import favEmpty from '@/Assets/Images/svg/favorite_empty.svg'
import favFill from '@/Assets/Images/svg/favorite_filled.svg'
import { Dim } from '@/helpers/Dim'

// @ts-ignore
import { SliderBox } from 'react-native-image-slider-box'
import FastImage from 'react-native-fast-image'
import { goBack } from '@/Navigators/utils'

type Props = {
  style: StyleProp<ViewStyle>
}
const RestaurantDetailContainer = ({}: Props) => {
  const { Layout, Common, Gutters, Images, Colors } = useTheme()

  return (
    <View style={[Layout.fill, Layout.column, Common.backgroundBeige100]}>
      <Animated.View
        style={[
          {
            height: Dim.getDimension(100),
            width: Dim.getHorizontalDimension(390),
          },
          Common.posAbsTop,
          Layout.justifyContentEnd,
          Common.zIndex,
        ]}
      >
        <Animated.View
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
              <BackTransparent />
            </TouchableOpacity>
          </View>
          <View style={[Layout.rowHCenter]}>
            <TouchableOpacity style={[Gutters.regularHMargin]}>
              <Upload />
            </TouchableOpacity>
            <ToggleIcon First={favEmpty} Second={favFill} />
          </View>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView>
        <SliderBox
          ImageComponent={FastImage}
          images={Images.mock}
          sliderBoxHeight={Dim.getDimension(420)}
          dotColor={Colors.beige_100}
          inactiveDotColor="transparent"
          paginationBoxVerticalPadding={20}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: 'transparent',
            borderWidth: 0.5,
            borderColor: Colors.beige_100,
          }}
          imageLoadingColor={Colors.brown}
        />
      </Animated.ScrollView>
    </View>
  )
}

export default RestaurantDetailContainer
