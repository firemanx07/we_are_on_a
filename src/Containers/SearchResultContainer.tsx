import React, { useEffect } from 'react'

import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RegionTypeState } from '@/Store/Regions'
import { useAppSelector, useTheme } from '@/Hooks'
import { Dim } from '@/helpers/Dim'
import { Colors } from '@/Theme/Variables'
import { selectZonesBySearchText } from '@/Store/Selectors/RegionsSelectors'

type Props = {
  search: string
}

const SearchResultContainer = ({ search }: Props) => {
  const { Layout, Fonts, Gutters } = useTheme()
  const results = useAppSelector(state =>
    selectZonesBySearchText(state, search),
  )
  useEffect(() => {
    console.log('search:', search, results)
  }, [search])
  const renderSearchItem = ({ item }: ListRenderItemInfo<RegionTypeState>) => {
    return (
      <TouchableOpacity
        style={[
          Layout.fullWidth,
          styles.item,
          Layout.rowHCenter,
          Gutters.tinyLPadding,
        ]}
      >
        <Text style={[Fonts.textPrimary, Fonts.textNormal]}>
          {item.zone}, {item.country}
        </Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={[Layout.fill, { width: Dim.getHorizontalDimension(338) }]}>
      <FlatList data={results} renderItem={renderSearchItem} />
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
