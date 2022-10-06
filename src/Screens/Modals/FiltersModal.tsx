import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  BottomSheetFlatList,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'
import AnimatedCheckBox, {
  AnimatedCheckRefHandle,
} from '@/Components/AnimatedCheckBox'
import { useTheme } from '@/Hooks'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import ArrowDown from '@/Assets/Images/svg/carret_down.svg'
import LinkPressablebutton from '@/Components/LinkPressablebutton'
import { Dim } from '@/helpers/Dim'
import { Text, TouchableOpacity, View } from 'react-native'
import { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '@/Store'
import { FilterSlice } from '@/enums/Slices'
import { FiltersState, FilterTypeState, reset, update } from '@/Store/Filters'

type FilterType = {
  id: number
  name: string
}
type FilterModalProps = {
  type: keyof typeof FilterSlice
}
const FiltersModal = ({ type }: FilterModalProps) => {
  const { dismiss } = useBottomSheetModal()
  const ref = useRef<BottomSheetFlatListMethods>(null)

  // variables
  const { Layout, Common, Colors, Fonts } = useTheme()
  const { textRegular, textMedium, textBeige100, textPrimary, textCenter } =
    Fonts
  const filtersState = useSelector<AppState, FiltersState>(
    state => state.Filters,
  )
  const dispatch = useDispatch<AppDispatch>()
  const data = filtersState[FilterSlice[type]]
  const refs = useMemo(
    () =>
      Array.from({ length: data.length }).map(() =>
        createRef<AnimatedCheckRefHandle>(),
      ),
    [data.length],
  )
  const handleFilters = () => {
    let newArray = [] as FilterTypeState[]
    data.map((elem, index) => {
      newArray.push({
        ...elem,
        checked:
          (!!refs[index].current && refs[index]?.current?.getCheckBoxValue()) ||
          false,
      })
    })
    console.log('trigger', { ...filtersState, [FilterSlice[type]]: newArray })
    dispatch(update({ ...filtersState, [FilterSlice[type]]: newArray }))
  }
  const restoreFilters = () => {
    data.map((elem, index) => {
      !!refs[index].current &&
        refs[index].current?.setCheckedBoxValue(elem.checked)
    })
  }
  //renders
  const spacer = () => <View style={{ height: Dim.getDimension(200) }} />
  const renderItem = useCallback(
    ({ item, index }: { item: FilterType; index: number }) => {
      return (
        <AnimatedCheckBox
          ref={refs[index]}
          label={item.name}
          style={[
            {
              height: Dim.getDimension(56),
              width: Dim.getHorizontalDimension(358),
            },
          ]}
        />
      )
    },
    [refs],
  )
  useEffect(() => {
    console.log(data)
    restoreFilters()
  }, [data])
  return (
    <BottomSheetView
      style={[Layout.colVCenter, Layout.fill, Common.backgroundBeige100]}
    >
      <CustomMenuHeader
        backgroundColor={Colors.beige_100}
        text={'Filter By Cuisine'}
        textStyle={[textCenter, textMedium, textPrimary]}
        Icon={ArrowDown}
        onPress={() => dismiss('Filter')}
        rightComponent={
          <LinkPressablebutton
            text={'Reset'}
            onPress={() => dispatch(reset())}
          />
        }
      />
      <BottomSheetFlatList
        ref={ref}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={[Layout.selfStretch]}
        ListFooterComponent={spacer}
      />
      <View
        style={[
          Common.posAbs,
          Common.backgroundReset,
          { bottom: Dim.getDimension(40) },
        ]}
      >
        <TouchableOpacity
          style={[Common.button.rounded, Common.button.xlargeButton]}
          onPress={handleFilters}
        >
          <Text style={[textRegular, textMedium, textBeige100]}>
            {'show XX Restaurants'}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  )
}
export default FiltersModal
