import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import Menu from '@/Assets/Images/svg/MenuIcon.svg'
import RestaurantIcon from '@/Assets/Images/svg/restaurentIcon.svg'
import LogoMenu from '@/Assets/Images/svg/Logo.svg'
import Search from '@/Assets/Images/svg/search_icon.svg'
import { useAppSelector, useTheme } from '@/Hooks'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import { navigate, toggleDrawer } from '@/Navigators/utils'
import MapView from 'react-native-maps'
import BottomSheetConatiner from '@/Containers/BottomSheetContainer'
import {
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
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

type HomeProps = {}

const HomeScreen = ({}: HomeProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const filterSheetRef = useRef<BottomSheetModal>(null)
  const numberOfFilters = useAppSelector(selectNumberOfFiltersChecked)
  const isDrawerOpen = useDrawerStatus() === 'open'
  // const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const navigation = useNavigation()
  const [filterType, setFilterType] = useState<KeyFilters>('CUISINE')
  const [loading, setLoading] = useState<Boolean>(true)
  const { Fonts, Gutters, Common, Colors, Layout, Images } = useTheme()
  const { textMedium, textMedium24, textPrimary, textCenter } = Fonts
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
    } else if (!loading) {
      bottomSheetRef.current?.present()
      setTimeout(() => {
        bottomSheetRef.current?.collapse()
      }, 200)
    }
  }, [isDrawerOpen, loading])
  // variables
  const data = React.useMemo(
    () =>
      Array(12)
        .fill(0)
        .map((_, index) => ({
          source: Images.onBoarding,
          title: 'Test Rest' + index,
          hasFavorite: true,
        })),
    [Images.onBoarding],
  )

  // render
  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: { source: ImageSourcePropType; title: string; hasFavorite: boolean }
      index: number
    }) => {
      return (
        <SmallCard
          key={`card-${index}`}
          {...item}
          onPress={() => navigate(Pages.RestaurantDetail, {})}
        />
      )
    },
    [],
  )

  const handleFilterButton = (type: KeyFilters) => {
    setFilterType(type)
    filterSheetRef.current && filterSheetRef.current.present()
  }

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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          Layout.rowHCenter,
          Layout.justifyContentBetween,
        ]}
      >
        <FilterButton Icon={Search} />
        <FilterButton text={'Chefs'} />
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
            { zIndex: 14 },
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
        style={Layout.fill}
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
        <View style={[Layout.rowHCenter, Gutters.regularHPadding]}>
          <Text style={[textMedium24, { color: Colors.brown }]}>
            12 Restaurants
          </Text>
        </View>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(_, index) => `index-${index}`}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={[Layout.rowHCenter, Layout.justifyContentAround]}
          ItemSeparatorComponent={() => (
            <View style={[Gutters.regularVMargin]} />
          )}
          contentContainerStyle={[
            Gutters.regularTMargin,
            Gutters.largeBPadding,
          ]}
        />
        <View style={{ height: Dim.getDimension(5) }} />
      </BottomSheetConatiner>
      <BottomSheetConatiner
        ref={filterSheetRef}
        name={Modals.FilterHome}
        snapPoints={['90%']}
        disablePanDownToClose
      >
        <FiltersModal type={filterType} modalKey={Modals.FilterHome} />
      </BottomSheetConatiner>
    </>
  )
}
export default HomeScreen
