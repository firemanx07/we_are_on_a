import React, { createRef, useCallback, useMemo } from 'react'
import { BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import AnimatedCheckBox, {
  AnimatedCheckRefHandle,
} from '@/Components/AnimatedCheckBox'
import { useTheme } from '@/Hooks'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import ArrowDown from '@/Assets/Images/svg/carret_down.svg'
import LinkPressablebutton from '@/Components/LinkPressablebutton'
import { Dim } from '@/helpers/Dim'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '@/Store'
import { FilterSlice } from '@/enums/Slices'
import {
  FiltersState,
  FilterTypeState,
  resetFilters,
  updateFilters,
} from '@/Store/Filters'
import { Modals } from '@/enums/Pages'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'

type FilterModalProps = {
  type: keyof typeof FilterSlice
  modalKey: keyof typeof Modals
}
const FiltersModal = ({ type, modalKey }: FilterModalProps) => {
  const { dismiss } = useBottomSheetModal()
  const { t } = useTranslation()

  // variables
  const { Layout, Common, Colors, Fonts, Gutters } = useTheme()
  const { textRegular, textMedium, textBeige100, textPrimary, textCenter } =
    Fonts
  const filtersState = useSelector<AppState, FiltersState>(
    state => state.filters,
  )
  const dispatch = useDispatch<AppDispatch>()
  const { [FilterSlice[type]]: data } = filtersState
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
    dispatch(updateFilters({ data: newArray, key: type }))
    dismiss(Modals[modalKey])
  }

  //renders
  const spacer = () => <View style={{ height: Dim.getDimension(100) }} />
  const renderItem = useCallback(
    ({ item, index }: { item: FilterTypeState; index: number }) => {
      return (
        <AnimatedCheckBox
          ref={refs[index]}
          key={item.id}
          label={item.name}
          defaultValue={item.checked}
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
  const handleReset = () => {
    dispatch(resetFilters(type))
    data.map((_, index) => {
      refs[index] &&
        !!refs[index].current &&
        refs[index].current?.setCheckedBoxValue(false)
    })
  }

  return (
    <BottomSheetView
      style={[Layout.colVCenter, Layout.fill, Common.backgroundBeige100]}
    >
      <CustomMenuHeader
        backgroundColor={Colors.beige_100}
        text={t('filter.' + FilterSlice[type] + '.title')}
        textStyle={[textCenter, textMedium, textPrimary]}
        Icon={ArrowDown}
        onPress={() => dismiss(Modals[modalKey])}
        rightComponent={
          <LinkPressablebutton text={'Reset'} onPress={handleReset} />
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[Layout.grow, Gutters.smallTPadding]}
        scrollEnabled={true}
      >
        {data.map((item, index) => renderItem({ item, index }))}
        {spacer()}
      </ScrollView>
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
