import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import ArrowDown from '@/Assets/Images/svg/carret_down.svg'
import { useAppSelector, useTheme } from '@/Hooks'
import SearchBar from '@/Components/SearchBar'
import { Dim } from '@/helpers/Dim'
import { useTranslation } from 'react-i18next'
import { BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { Modals } from '@/enums/Pages'
import { ScrollView } from 'react-native-gesture-handler'
import useSearchDebounce from '../Hooks/useSearchDebounce'
import { Spacer } from '@/Components/Spacer'
import SearchItem from '@/Components/SearchItem'

import { selectChefs } from '@/Store/Selectors/ChefsSelectors'

const TopFiveRestaurants = () => {
  const chefs = useAppSelector(selectChefs)
  return (
    <View>
      <SearchItem.Header title={'Top'} count={5} />
      <SearchItem.TextBody title={'Le SEPTIME'} count={18} />
      <SearchItem.TextBody title={'Clamato'} count={16} />
      <SearchItem.TextBody title={'Mogador'} count={12} />
      <SearchItem.TextBody title={'Peco Peco'} count={11} />
      <SearchItem.TextBody title={'Chez Aline'} count={8} />
    </View>
  )
}

const SearchContainer = () => {
  const { search, searchQuery, setSearchQuery } = useSearchDebounce()
  const { t } = useTranslation()
  const { Common, Layout, Colors, Fonts, Gutters } = useTheme()
  const { dismissAll, dismiss } = useBottomSheetModal()
  const { textRegular, textMedium, textBeige100, textPrimary, textCenter } =
    Fonts

  const handleSearch = (val: string) => {
    setSearchQuery(val)
  }

  useEffect(() => {
    console.log(search)
  }, [search])

  //renders

  return (
    <BottomSheetView
      style={[Layout.colVCenter, Layout.fill, Common.backgroundBeige100]}
    >
      <CustomMenuHeader
        backgroundColor={Colors.beige_100}
        text={t('search')}
        textStyle={[textCenter, textMedium, textPrimary]}
        Icon={ArrowDown}
        onPress={() => dismiss(Modals.Search)}
      />
      <SearchBar
        style={{
          container: [
            Gutters.largeTMargin,
            Gutters.regularBMargin,
            { height: Dim.getDimension(48) },
          ],
        }}
        placeholder={'Search...'}
        onChangeText={handleSearch}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[{ width: Dim.getHorizontalDimension(358) }]}
        contentContainerStyle={[Layout.grow]}
      >
        {search.length > 0 ? (
          <View>
            <Text />
          </View>
        ) : (
          TopFiveRestaurants()
        )}
        <Spacer />
      </ScrollView>
    </BottomSheetView>
  )
}
export default SearchContainer
