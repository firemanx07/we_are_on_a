import React from 'react'
import { ExampleContainer } from '@/Containers'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import ArrowDown from '@/Assets/Images/svg/carret_down.svg'
import { Modals } from '@/enums/Pages'
import { Colors } from '@/Theme/Variables'
import { Dim } from '@/helpers/Dim'
import { navigate } from '@/Navigators/utils'

const Settings = () => {
  const { t } = useTranslation()
  const { Common, Layout, Colors, Fonts } = useTheme()
  const { dismiss } = useBottomSheetModal()
  const { textNormal500, textMedium, textGrey100, textPrimary, textCenter } =
    Fonts

  const rightComponent = (
    <TouchableOpacity onPress={() => {}}>
      <Text style={[textGrey100, textNormal500]}>Logout</Text>
    </TouchableOpacity>
  )
  const SettingsItem = ({
    label,
    onPress,
  }: {
    label: string
    onPress: () => void
  }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <BottomSheetView
          style={[
            styles.container,
            Layout.rowHCenter,
            Layout.justifyContentBetween,
          ]}
        >
          <Text>{label}</Text>
          <ArrowDown stroke={Colors.primary} style={Layout.rotate90Inverse} />
        </BottomSheetView>
      </TouchableOpacity>
    )
  }
  return (
    <ExampleContainer>
      <CustomMenuHeader
        text={'My Account'}
        textStyle={[textCenter, textMedium, textPrimary]}
        Icon={ArrowDown}
        onPress={() => dismiss('Settings')}
        rightComponent={rightComponent}
      />
      <SettingsItem
        label={'Personal Info'}
        onPress={() => {
          navigate('SettingDetail', [])
          dismiss('Settings')
        }}
      />
      <SettingsItem label={'Payment Methods'} onPress={() => {}} />
      <SettingsItem label={'Food Preferences'} onPress={() => {}} />
      <SettingsItem label={'Notfifications'} onPress={() => {}} />
    </ExampleContainer>
  )
}
export default Settings

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.beige_200,
    paddingHorizontal: Dim.getHorizontalDimension(24),
    paddingTop: Dim.getDimension(18),
    paddingBottom: Dim.getDimension(18),
    marginTop: Dim.getDimension(16),
    borderRadius: Dim.getDimension(12),
  },
})
