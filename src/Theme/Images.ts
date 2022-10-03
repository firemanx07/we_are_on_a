import { ThemeVariables } from './theme'

export default function ({}: ThemeVariables) {
  return {
    logo: require('@/Assets/Images/Logo.png'),
    evian: require('@/Assets/Images/evian-logo.png'),
    onBoarding: require('@/Assets/Images/onBoarding.png'),
    location: {
      myLocation: require('@/Assets/Images/LocationModal/my-location.png'),
      Pin: require('@/Assets/Images/LocationModal/Pin.png'),
      Pin1: require('@/Assets/Images/LocationModal/Pin-1.png'),
      Pin2: require('@/Assets/Images/LocationModal/Pin-2.png'),
      Pin3: require('@/Assets/Images/LocationModal/Pin-3.png'),
      Rectangle1: require('@/Assets/Images/LocationModal/Rectangle-1.png'),
      Rectangle2: require('@/Assets/Images/LocationModal/Rectangle-2.png'),
      Rectangle3: require('@/Assets/Images/LocationModal/Rectangle-3.png'),
      Rectangle4: require('@/Assets/Images/LocationModal/Rectangle-4.png'),
      Rectangle5: require('@/Assets/Images/LocationModal/Rectangle-5.png'),
      Rectangle6: require('@/Assets/Images/LocationModal/Rectangle-6.png'),
    },
    menu: {
      close: require('@/Assets/Images/closeMenu.png'),
      logoPartners: require('@/Assets/Images/LogoPartners.png'),
    },
  }
}
