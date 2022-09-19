import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import ArrowDown from '@/Assets/Images/svg/carret_down.svg'
import Accordion from '@/Components/Accordion'
import ListItem from '@/Components/ListItem'
import { useTheme } from '@/Hooks'
import SearchBar from '@/Components/SearchBar'
import { Dim } from '@/helpers/Dim'
import { useTranslation } from 'react-i18next'

const CityPicker = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { t } = useTranslation()
  const { Common, Layout, Colors, Fonts, Gutters } = useTheme()
  const { textRegular, textMedium, textBeige100, textPrimary, textCenter } =
    Fonts

  const handleSearch = (val: string) => {
    setSearchTerm(val)
  }
  return (
    <View style={[Layout.colVCenter, Layout.fill, Common.backgroundBeige100]}>
      <CustomMenuHeader
        backgroundColor={Colors.beige_100}
        text={t('city.picker.header')}
        textStyle={[textCenter, textMedium, textPrimary]}
        Icon={ArrowDown}
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
      <ScrollView
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
      </ScrollView>
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
    </View>
  )
}
export default CityPicker
