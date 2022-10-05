import React from 'react'
import { ExampleContainer } from '@/Containers'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import { useTheme } from '@/Hooks'
import {
  BottomSheetView,
  useBottomSheet,
} from '@gorhom/bottom-sheet'
import ArrowUp from '@/Assets/Images/svg/carret_up.svg'
import { Colors as themeColor } from '@/Theme/Variables'
import { Dim } from '@/helpers/Dim'
import { navigate } from '@/Navigators/utils'
import { SettingsTitles } from '@/enums/Pages'

const SettingsItem = ({
  label,
  onPress,
}: {
  label: string
  onPress: () => void
}) => {
  const { Layout, Colors } = useTheme()
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
        <ArrowUp stroke={Colors.primary} style={Layout.rotate90} />
      </BottomSheetView>
    </TouchableOpacity>
  )
}
const Settings = () => {
  // const { t } = useTranslation()
  const { Fonts } = useTheme()
  const { close } = useBottomSheet()
  const { textNormal500, textMedium, textGrey100, textPrimary, textCenter } =
    Fonts

  const rightComponent = (
    <TouchableOpacity onPress={() => {}}>
      <Text style={[textGrey100, textNormal500]}>Logout</Text>
    </TouchableOpacity>
  )
  const handlePress = (param: string) => {
    navigate('SettingDetail', { title: param })
    close()
  }

  return (
    <ExampleContainer scrollDisabled>
      <CustomMenuHeader
        text={'My Account'}
        textStyle={[textCenter, textMedium, textPrimary]}
        Icon={ArrowUp}
        onPress={() => close()}
        rightComponent={rightComponent}
      />
      <SettingsItem
        label={SettingsTitles.PERSONAL_INFO.toUpperCase()}
        onPress={() => handlePress(SettingsTitles.PERSONAL_INFO)}
      />
      <SettingsItem
        label={SettingsTitles.PAYMENT_METHODS.toUpperCase()}
        onPress={() => handlePress(SettingsTitles.PAYMENT_METHODS)}
      />
      <SettingsItem
        label={SettingsTitles.Food_Preferences.toUpperCase()}
        onPress={() => handlePress(SettingsTitles.Food_Preferences)}
      />
      <SettingsItem
        label={SettingsTitles.NOTIFICATIONS.toUpperCase()}
        onPress={() => handlePress(SettingsTitles.NOTIFICATIONS)}
      />
    </ExampleContainer>
  )
}
export default Settings

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: themeColor.beige_200,
    paddingHorizontal: Dim.getHorizontalDimension(24),
    paddingTop: Dim.getDimension(18),
    paddingBottom: Dim.getDimension(18),
    marginTop: Dim.getDimension(16),
    borderRadius: Dim.getDimension(12),
  },
})
