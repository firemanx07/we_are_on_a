import React from 'react'

import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RegionTypeState, setZone } from '@/Store/Regions'
import { useAppDispatch, useAppSelector, useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import { Colors } from '@/Theme/Variables'
import { selectZonesBySearchText } from '@/Store/Selectors/RegionsSelectors'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Modals, Pages } from '@/enums/Pages'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'

type Props = {
  search: string
}

const SearchResultContainer = ({ search }: Props) => {
  const { Layout, Fonts, Gutters } = useTheme()
  const dispatch = useAppDispatch()
  const { dismiss } = useBottomSheetModal()
  const results = useAppSelector(state =>
    selectZonesBySearchText(state, search),
  )

  const renderSearchItem = ({ item }: ListRenderItemInfo<RegionTypeState>) => {
    return (
      <TouchableOpacity
        style={[
          Layout.fullWidth,
          styles.item,
          Layout.rowHCenter,
          Gutters.tinyLPadding,
        ]}
        onPress={async () => {
          await dispatch(setZone(item))
          await navigateAndSimpleReset(Pages.Menu)
          dismiss(Modals.CityPicker)
        }}
      >
        <Text style={[Fonts.textPrimary, Fonts.textNormal]}>
          {item.zone}, {item.country}
        </Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={[Layout.fill, { width: Dim.getHorizontalDimension(338) }]}>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={renderSearchItem}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  item: {
    height: Dim.getDimension(48),
    borderBottomWidth: 1,
    borderColor: Colors.beige_300,
  },
})
export default SearchResultContainer
