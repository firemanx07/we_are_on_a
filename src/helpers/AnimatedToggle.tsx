import React, { useEffect } from 'react'
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated'

interface Props {
  First: React.ElementType<any>
  Second: React.ElementType<any>
  onToggle?: () => void
  isToggled?: boolean
  resetPress?: (val: boolean) => void
}

export const ToggleIcon: React.FC<Props> = ({
  First,
  Second,
  onToggle,
  isToggled,
  resetPress,
}) => {
  const ref = React.useRef<TransitioningView | null>(null)
  const [toggled, setToggled] = React.useState(false)

  useEffect(() => {
    if (isToggled) {
      toggle()
      resetPress && resetPress(false)
    }
  }, [isToggled])
  const toggle = () => setToggled(!toggled)
  const onPress = () => {
    toggle()
    ref.current?.animateNextTransition()
    onToggle && onToggle()
  }

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {!toggled ? <First onPress={onPress} /> : <Second onPress={onPress} />}
    </Transitioning.View>
  )
}

const transition = (
  <Transition.Together>
    <Transition.Out type="scale" durationMs={100} />
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="scale" durationMs={100} delayMs={50} />
  </Transition.Together>
)
