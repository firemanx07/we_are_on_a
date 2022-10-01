import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import ArrowDown from '@/Assets/Images/svg/carret_down.svg'
import Accordion from '@/Components/Accordion'
import ListItem from '@/Components/ListItem'
import { useTheme } from '@/Hooks'
import SearchBar from '@/Components/SearchBar'
import { Dim } from '@/helpers/Dim'
import { useTranslation } from 'react-i18next'
import {
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'
import { Modals } from '@/enums/Pages'

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
  useEffect(() => {
    dismiss('Explorer')
  }, [dismiss])
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
        <Accordion header={'Europe'}>
          <ListItem counter={81} title={'Paris'} distance={10} />
          <ListItem counter={81} title={'Paris'} distance={10} />
          <ListItem counter={81} title={'Paris'} distance={10} />
          <ListItem counter={81} title={'Paris'} distance={10} />
        </Accordion>
        <Accordion header={'Europe'}>
          <ListItem counter={81} title={'Paris'} distance={10} />
          <ListItem counter={81} title={'Paris'} distance={10} />
          <ListItem counter={81} title={'Paris'} distance={10} />
          <ListItem counter={81} title={'Paris'} distance={10} />
        </Accordion>
        <Accordion header={'Europe'}>
          <ListItem counter={81} title={'Paris'} distance={10} />
          <ListItem counter={81} title={'Paris'} distance={10} />
          <ListItem counter={81} title={'Paris'} distance={10} />
          <ListItem counter={81} title={'Paris'} distance={10} />
        </Accordion>
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
