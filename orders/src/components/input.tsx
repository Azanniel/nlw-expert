import { TextInput, TextInputProps } from 'react-native'
import colors from 'tailwindcss/colors'

import { cn } from '@/utils/merge-class'

interface InputProps extends TextInputProps {}

export function Input(props: InputProps) {
  return (
    <TextInput
      className={cn(
        'h-32 rounded-md bg-slate-800 px-4 py-3 font-body text-sm text-slate-100',
        props.className,
      )}
      textAlignVertical="top"
      placeholderTextColor={colors.slate[400]}
      multiline
      {...props}
    />
  )
}
