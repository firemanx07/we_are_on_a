/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import { CommonParams } from './theme'
import { Dim } from '@/helpers/Dim'

export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      backgroundBeige100: {
        backgroundColor: Colors.beige_100,
      },
      backgroundBrown: {
        backgroundColor: Colors.brown,
      },
      posAbs: {
        position: 'absolute',
      },
      textInputContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: Colors?.inputBackground,
        color: Colors?.primary,
        minHeight: Dim.getDimension(48),
        paddingLeft: Dim.getHorizontalDimension(8),
        paddingRight: Dim.getHorizontalDimension(8),
      },
      roundedInputContainer: {
        borderRadius: Dim.getDimension(99),
        width: Dim.getHorizontalDimension(358),
      },
      borderFocus: {
        borderColor: Colors.brown,
      },
      borderError: {
        borderColor: Colors.error,
      },
      borderBeige_100: {
        borderColor: Colors.beige_100,
      },
      elevationLow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      roundedBorder: {
        borderRadius: Dim.getDimension(8),
        borderColor: Colors.primary,
        borderWidth: 1,
      },
      zIndex: {
        zIndex: 10,
      },
    }),
  }
}
