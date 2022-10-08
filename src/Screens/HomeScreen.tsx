import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import Menu from '@/Assets/Images/svg/MenuIcon.svg'
import RestaurantIcon from '@/Assets/Images/svg/restaurentIcon.svg'
import LogoMenu from '@/Assets/Images/svg/Logo.svg'
import Search from '@/Assets/Images/svg/search_icon.svg'
import { useAppSelector, useTheme } from '@/Hooks'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import { toggleDrawer } from '@/Navigators/utils'
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
import { Modals } from '@/enums/Pages'
import { selectNumberOfFilters } from '@/Store/Selectors/FilterSelectors'

type HomeProps = {}

const HomeScreen = ({}: HomeProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const filterSheetRef = useRef<BottomSheetModal>(null)
  const numberOffilters = useAppSelector(selectNumberOfFilters)
  const isDrawerOpen = useDrawerStatus() === 'open'
  // const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const navigation = useNavigation()
  const [filterType, setFilterType] = useState<KeyFilters>('CUISINE')
  const { Fonts, Gutters, Common, Colors, Layout, Images } = useTheme()
  const { textMedium, textMedium24, textPrimary, textCenter } = Fonts
  useFocusEffect(
    useCallback(() => {
      bottomSheetRef.current?.present()
      setTimeout(() => {
        bottomSheetRef.current?.collapse()
      }, 1000)
    }, []),
  )
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      bottomSheetRef.current?.close()
    })

    return () => unsubscribe()
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
    }: {
      item: { source: ImageSourcePropType; title: string; hasFavorite: boolean }
    }) => {
      return <SmallCard {...item} />
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
          counter={numberOffilters.cuisine}
          isSelected={numberOffilters.cuisine > 0}
          onPress={() => handleFilterButton('CUISINE')}
        />
        <FilterButton
          text={'Categories'}
          isSelected={numberOffilters.categories > 0}
          onPress={() => handleFilterButton('CATEGORIES')}
        />
        <FilterButton
          text={'More Filters'}
          isSelected={numberOffilters.categories > 0}
          onPress={() => handleFilterButton('MOREFILTERS')}
        />
      </ScrollView>
    </>
  )

  return (
    <>
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
      >
        <FiltersModal type={filterType} modalKey={Modals.FilterHome} />
      </BottomSheetConatiner>
    </>
  )
}
export default HomeScreen
