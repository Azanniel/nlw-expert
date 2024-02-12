import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native'

import { cn } from '@/utils/merge-class'

interface ButtonProps extends TouchableOpacityProps {}

function Button({ className, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        'h-12 flex-row items-center justify-center rounded-md bg-lime-400',
        className,
      )}
      activeOpacity={0.7}
      {...props}
    />
  )
}

interface ButtonText extends TextProps {}

function ButtonText(props: ButtonText) {
  return (
    <Text
      className={cn('font-heading text-base text-slate-950', props.className)}
      {...props}
    />
  )
}

interface ButtonIconProps extends ViewProps {}

function ButtonIcon(props: ButtonIconProps) {
  return <View className={cn('mx-2', props.className)} {...props} />
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }
