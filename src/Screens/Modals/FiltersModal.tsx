import React, { useCallback } from 'react'
import {
  BottomSheetFlatList,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'
import AnimatedCheckBox from '@/Components/AnimatedCheckBox'
import { Filters, FiltersEnumType } from '@/enums/Filters'
import { useTheme } from '@/Hooks'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import ArrowDown from '@/Assets/Images/svg/carret_down.svg'
import LinkPressablebutton from '@/Components/LinkPressablebutton'
import { Dim } from '@/helpers/Dim'
import { Text, TouchableOpacity, View } from 'react-native'

type FilterType = {
  id: number
  name: string
}
type FilterModalProps = {
  type: FiltersEnumType
}
const FiltersModal = ({ type }: FilterModalProps) => {
  const { dismiss } = useBottomSheetModal()
  // variables
  const { Layout, Common, Colors, Fonts } = useTheme()
  const { textRegular, textMedium, textBeige100, textPrimary, textCenter } =
    Fonts
  const data = React.useMemo(
    () =>
      Object.keys(Filters[type]).map<FilterType>((key, index) => ({
        id: index,
        name: key,
      })),
    [type],
  )
  //renders
  const renderItem = useCallback(({ item }: { item: FilterType }) => {
    return (
      <AnimatedCheckBox
        label={item.name}
        style={[
          Common.button.xlargeButton,
          {
            height: Dim.getDimension(56),
          },
        ]}
      />
    )
  }, [])
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
        rightComponent={<LinkPressablebutton text={'Reset'} />}
      />
      <BottomSheetFlatList
        data={data}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        renderItem={renderItem}
        contentContainerStyle={[Layout.selfStretch]}
        ListFooterComponent={() => (
          <View style={{ height: Dim.getDimension(200) }} />
        )}
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
