import React from 'react'
import { ExampleContainer } from '@/Containers'
import CustomMenuHeader from '@/Components/CustomMenuHeader'
import Menu from '@/Assets/Images/svg/menu.svg'
import { Modals } from '@/enums/Pages'
import { useTheme } from '@/Hooks'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { toggleDrawer } from '@/Navigators/utils'

type HomeProps = {}

const HomeScreen = ({}: HomeProps) => {
  const { Fonts, Gutters } = useTheme()
  const { dismiss } = useBottomSheetModal()
  const { textMedium, textPrimary, textCenter } = Fonts
  return (
    <ExampleContainer>
      <CustomMenuHeader
        text={'HOME'}
        textStyle={[textCenter, textMedium, textPrimary]}
        Icon={Menu}
        IconType={'menu'}
        containerStyle={Gutters.largeTMargin}
        onPress={() => toggleDrawer()}
      />
    </ExampleContainer>
  )
}
export default HomeScreen
