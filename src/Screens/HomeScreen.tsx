import React, { useEffect, useRef, useState } from 'react'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import Menu from '@/Assets/Images/svg/MenuIcon.svg'
import RestaurantIcon from '@/Assets/Images/svg/restaurentIcon.svg'
import LogoMenu from '@/Assets/Images/svg/Logo.svg'
import Search from '@/Assets/Images/svg/search_icon.svg'
import { useAppSelector, useTheme } from '@/Hooks'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import { navigate, toggleDrawer } from '@/Navigators/utils'
import MapView, { Region } from 'react-native-maps'
import BottomSheetConatiner from '@/Containers/BottomSheetContainer'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native'
import { useDrawerStatus } from '@react-navigation/drawer'
import LinearGradient from 'react-native-linear-gradient'
import { Dim } from '@/helpers/Dim'
import FilterButton from '@/Components/FilterButton'
import AnimatedCustomHandle from '@/Components/AnimatedCustomHandle'
import SmallCard from '@/Components/SmallCard'
import FiltersModal from '@/Screens/Modals/FiltersModal'
import { KeyFilters } from '@/enums/Slices'
import { Modals, Pages } from '@/enums/Pages'
import { selectNumberOfFiltersChecked } from '@/Store/Selectors/FilterSelectors'
import LoadingCityModal from '@/Screens/Modals/LoadingCityModal'
import { selectRestaurantsBySelectedZone } from '@/Store/Selectors/RestaurantsSelectors'
import { selectSelectedZone } from '@/Store/Selectors/RegionsSelectors'
import PinMarker from '@/Components/PinMarker'
import { RestaurantTypeState } from '@/Store/Restaurants'
import SearchContainer from '@/Containers/SearchContainer'

type HomeProps = {}

const HomeScreen = ({}: HomeProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const filterSheetRef = useRef<BottomSheetModal>(null)
  const searchSheetRef = useRef<BottomSheetModal>(null)
  const numberOfFilters = useAppSelector(selectNumberOfFiltersChecked)
  const restaurants = useAppSelector(selectRestaurantsBySelectedZone)
  const isFocused = useIsFocused()
  const selectedZone = useAppSelector(selectSelectedZone)
  const isDrawerOpen = useDrawerStatus() === 'open'
  // const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const navigation = useNavigation()
  const [filterType, setFilterType] = useState<KeyFilters>('CUISINE')
  const [regionCoor, setRegionCoor] = useState<Region>({
    latitude: 48.8534951,
    longitude: 2.3483915,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [loading, setLoading] = useState<Boolean>(true)
  const { Fonts, Gutters, Common, Colors, Layout, Images } = useTheme()
  const { textMedium, textMedium24, textPrimary, textCenter } = Fonts
  useEffect(() => {
    typeof selectedZone.lat === 'number' &&
      typeof selectedZone.lon === 'number' &&
      setRegionCoor({
        ...regionCoor,
        latitude: selectedZone.lat,
        longitude: selectedZone.lon,
      })
  }, [selectedZone])
  useFocusEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      bottomSheetRef.current?.close()
    })

    return () => unsubscribe()
  }, [navigation])
  useEffect(() => {
    if (isDrawerOpen) {
      bottomSheetRef.current?.close()
    } else if (!loading && isFocused) {
      bottomSheetRef.current?.present()
      setTimeout(() => {
        bottomSheetRef.current?.collapse()
      }, 200)
    }
  }, [isDrawerOpen, isFocused, loading])
  // variables
  const handleRestaurantPress = (id: string) => {
    navigate(Pages.RestaurantDetail, { id })
  }
  const handleFilterButton = (type: KeyFilters) => {
    setFilterType(type)
    filterSheetRef.current && filterSheetRef.current.present()
  }
  //renders
  const renderItem = ({ item }: { item: RestaurantTypeState }) => {
    return (
      <SmallCard
        source={Images.onBoarding}
        title={item.name}
        hasFavorite
        onPress={() => handleRestaurantPress(item.id)}
      />
    )
  }
  const ListHeader = (
    <View style={[Layout.rowHCenter, Gutters.regularHPadding]}>
      <Text style={[textMedium24, { color: Colors.brown }]}>
        {restaurants.length} Restaurants
      </Text>
    </View>
  )
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
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.expand({ duration: 500 })}
          >
            <RestaurantIcon fill={Colors.primary} />
          </TouchableOpacity>
        }
        centerComponent={<LogoMenu fill={Colors.primary} />}
      />
      <ScrollView
        style={[Gutters.regularTMargin, Gutters.smallLMargin]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
        ]}
      >
        <FilterButton
          Icon={Search}
          onPress={() => searchSheetRef.current?.present()}
        />
        <FilterButton
          text={'Chefs'}
          onPress={() => handleFilterButton('CHEFS')}
          {...(numberOfFilters.chefs > 0 && {
            counter: numberOfFilters.chefs,
            isSelected: true,
          })}
        />
        <FilterButton
          text={'Cuisine'}
          onPress={() => handleFilterButton('CUISINE')}
          {...(numberOfFilters.cuisine > 0 && {
            counter: numberOfFilters.cuisine,
            isSelected: true,
          })}
        />
        <FilterButton
          text={'Categories'}
          {...(numberOfFilters.categories > 0 && {
            counter: numberOfFilters.categories,
            isSelected: true,
          })}
          onPress={() => handleFilterButton('CATEGORIES')}
        />
        <FilterButton
          text={'More Filters'}
          {...(numberOfFilters.moreFilters > 0 && {
            counter: numberOfFilters.moreFilters,
            isSelected: true,
          })}
          onPress={() => handleFilterButton('MOREFILTERS')}
        />
      </ScrollView>
    </>
  )

  return (
    <>
      {loading && (
        <View
          style={[
            Common.posAbs,
            Layout.fullHeight,
            Layout.fullWidth,
            Common.zIndex14,
          ]}
        >
          <LoadingCityModal />
        </View>
      )}
      <LinearGradient
        colors={[Colors.beige_100, Colors.beige_100 + '55', 'transparent']}
        style={[
          Layout.fullWidth,
          Common.posAbs,
          Common.zIndex,
          { height: Dim.getDimension(164) },
        ]}
      >
        {getMainHeader()}
      </LinearGradient>
      <MapView
        onMapReady={() => setLoading(false)}
        style={Layout.fill}
        region={regionCoor}
      >
        {restaurants.map(elem => (
          <PinMarker
            key={elem.id}
            coordinate={{
              longitude: elem.lon,
              latitude: elem.lat,
            }}
            text={elem.name}
            source={Images.onBoarding}
            isFavourite={elem.isFavorite}
            onPress={() => handleRestaurantPress(elem.id)}
          />
        ))}
      </MapView>
      <BottomSheetConatiner
        ref={bottomSheetRef}
        disableDrop
        disablePanDownToClose
        name={Modals.Explorer}
        snapPoints={['25%', '100%']}
        indicatorStyle={[{ backgroundColor: Colors.brown + '20' }]}
        handleComponent={p =>
          AnimatedCustomHandle({
            ...p,
            close: () => bottomSheetRef.current?.collapse(),
          })
        }
      >
        <BottomSheetFlatList
          data={restaurants}
          keyExtractor={elem => elem.id}
          ListHeaderComponent={ListHeader}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={[
            Layout.rowHCenter,
            Layout.justifyContentAround,
            Gutters.regularTMargin,
          ]}
          removeClippedSubviews
          contentContainerStyle={[Gutters.smallTMargin, Gutters.largeBPadding]}
        />
        <View style={{ height: Dim.getDimension(5) }} />
      </BottomSheetConatiner>
      <BottomSheetConatiner
        ref={filterSheetRef}
        name={Modals.FilterHome}
        snapPoints={['90%']}
      >
        <FiltersModal type={filterType} modalKey={Modals.FilterHome} />
      </BottomSheetConatiner>
      <BottomSheetConatiner
        ref={searchSheetRef}
        name={Modals.Search}
        snapPoints={['90%']}
      >
        <SearchContainer />
      </BottomSheetConatiner>
    </>
  )
}

export default HomeScreen
