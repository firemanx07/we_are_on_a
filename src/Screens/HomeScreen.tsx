import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import Menu from '@/Assets/Images/svg/MenuIcon.svg'
import RestaurantIcon from '@/Assets/Images/svg/restaurentIcon.svg'
import LogoMenu from '@/Assets/Images/svg/Logo.svg'
import Search from '@/Assets/Images/svg/search_icon.svg'
import { useTheme } from '@/Hooks'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { toggleDrawer } from '@/Navigators/utils'
import MapView from 'react-native-maps'
import BottomSheetConatiner from '@/Containers/BottomSheetContainer'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDrawerStatus } from '@react-navigation/drawer'
import LinearGradient from 'react-native-linear-gradient'
import { Dim } from '@/helpers/Dim'
import FilterButton from '@/Components/FilterButton'
import AnimatedCustomHandle from '@/Components/AnimatedCustomHandle'
type HomeProps = {}

const HomeScreen = ({}: HomeProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const isDrawerOpen = useDrawerStatus() === 'open'
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const navigation = useNavigation()
  const { Fonts, Gutters, Common, Colors, Layout } = useTheme()
  const { textMedium, textMedium24, textPrimary, textCenter } = Fonts
  useFocusEffect(
    useCallback(() => {
      bottomSheetRef.current?.present()
      setTimeout(() => {
        bottomSheetRef.current?.collapse()
      }, 1000)
    }, [bottomSheetRef.current]),
  )
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      bottomSheetRef.current?.close()
    })

    return unsubscribe
  }, [navigation])
  useEffect(() => {
    if (isDrawerOpen) {
      bottomSheetRef.current?.close()
    } else {
      bottomSheetRef.current?.present()
      setTimeout(() => {
        bottomSheetRef.current?.collapse()
      }, 200)
    }
  }, [isDrawerOpen])
  const getMainHeader = () => (
    <>
      <CustomMenuHeader
        text={'HOME'}
        textStyle={[textCenter, textMedium, textPrimary]}
        Icon={Menu}
        IconType={'menu'}
        containerStyle={[Gutters.largeTMargin]}
        onPress={() => toggleDrawer()}
        rightComponent={
          <TouchableOpacity>
            <RestaurantIcon fill={Colors.primary} />
          </TouchableOpacity>
        }
        centerComponent={<LogoMenu fill={Colors.primary} />}
      />
      <ScrollView
        style={[Gutters.regularTMargin, Gutters.smallLMargin]}
        horizontal
        contentContainerStyle={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
          Layout.fullWidth,
        ]}
      >
        <FilterButton Icon={Search} />
        <FilterButton text={'Chefs'} />
        <FilterButton text={'Cuisine'} counter={2} isSelected />
        <FilterButton text={'Categories'} />
      </ScrollView>
    </>
  )

  return (
    <>
      {!isFullScreen && (
        <LinearGradient
          colors={
            isFullScreen
              ? [Colors.beige_100, Colors.beige_100]
              : [Colors.beige_100, Colors.beige_100 + '55', 'transparent']
          }
          style={[
            Layout.fullWidth,
            Common.posAbs,
            { zIndex: 10, height: Dim.getDimension(164) },
          ]}
        >
          {getMainHeader()}
        </LinearGradient>
      )}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <BottomSheetConatiner
        ref={bottomSheetRef}
        disableDrop
        disablePanDownToClose
        name={'Explorer'}
        snapPoints={['25%', '100%']}
        indicatorStyle={[{ backgroundColor: Colors.brown + '20' }]}
        handleComponent={p =>
          AnimatedCustomHandle({
            ...p,
            close: () => bottomSheetRef.current?.collapse(),
          })
        }
      >
        <View style={[Layout.rowHCenter, Gutters.regularHPadding]}>
          <Text style={[textMedium24, { color: Colors.brown }]}>
            12 Restaurants
          </Text>
          <Text />
        </View>
      </BottomSheetConatiner>
    </>
  )
}
export default HomeScreen
