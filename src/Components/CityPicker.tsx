import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import ArrowDown from '@/Assets/Images/svg/carret_down.svg'
import Accordion from '@/Components/Accordion'
import ListItem from '@/Components/ListItem'
import { useAppDispatch, useAppSelector, useTheme } from '@/Hooks'
import SearchBar from '@/Components/SearchBar'
import { Dim } from '@/helpers/Dim'
import { useTranslation } from 'react-i18next'
import {
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'
import { Modals } from '@/enums/Pages'
import {
  selectCountryByOverall,
  selectOverallZones,
  selectZonesByCountry,
} from '@/Store/Selectors/RegionsSelectors'
import { RegionTypeState, setZone } from '@/Store/Regions'

const CityPicker = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { t } = useTranslation()
  const { Common, Layout, Colors, Fonts, Gutters } = useTheme()
  const { dismiss } = useBottomSheetModal()
  const { textRegular, textMedium, textBeige100, textPrimary, textCenter } =
    Fonts

  const handleSearch = (val: string) => {
    setSearchTerm(val)
  }
  const dispatch = useAppDispatch()
  const overallZones = useAppSelector(selectOverallZones)
  const countries = useAppSelector(selectCountryByOverall)
  const zones = useAppSelector(selectZonesByCountry)
  useEffect(() => {
    dismiss(Modals.Explorer)
  }, [dismiss])
  //renders
  const renderZones = ({ item }: { item: RegionTypeState }) => {
    return (
      <TouchableOpacity
        key={`zone-${item.id}`}
        onPress={() => dispatch(setZone(item))}
      >
        <ListItem counter={81} title={item.zone} distance={10} />
      </TouchableOpacity>
    )
  }
  const renderCountries = (
    item: string,
    indexCountry: number,
    index: number,
  ) => {
    return (
      <Accordion
        style={Common.backgroundBeige100}
        key={`overal-${index}-country-${indexCountry}`}
        header={item}
      >
        {zones[item].map(elem => renderZones({ item: elem }))}
      </Accordion>
    )
  }

  const renderOverallZone = (item: string, index: number) => {
    return (
      <Accordion key={`overal-${index}`} header={item}>
        {countries[item].map((elem, indexCountry: number) =>
          renderCountries(elem, indexCountry, index),
        )}
      </Accordion>
    )
  }

  return (
    <BottomSheetView
      style={[Layout.colVCenter, Layout.fill, Common.backgroundBeige100]}
    >
      <CustomMenuHeader
        backgroundColor={Colors.beige_100}
        text={t('city.picker.header')}
        textStyle={[textCenter, textMedium, textPrimary]}
        Icon={ArrowDown}
        onPress={() => dismiss(Modals.CityPicker)}
      />
      <SearchBar
        value={searchTerm}
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
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={[{ width: Dim.getHorizontalDimension(358) }]}
      >
        {overallZones.map((elem, index) => renderOverallZone(elem, index))}
      </BottomSheetScrollView>
      <View
        style={[
          Common.posAbs,
          Common.backgroundReset,
          { bottom: Dim.getDimension(40) },
        ]}
      >
        <TouchableOpacity
          style={[Common.button.rounded, Common.button.largeButton]}
        >
          <Text style={[textRegular, textMedium, textBeige100]}>
            {t('city.picker.location')}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  )
}
export default CityPicker
