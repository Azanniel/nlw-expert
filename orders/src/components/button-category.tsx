import { Pressable, PressableProps, Text } from 'react-native'

import { cn } from '@/utils/merge-class'

interface ButtonCategoryProps extends PressableProps {
  title: string
  isSelected?: boolean
}

export function ButtonCategory({
  title,
  isSelected,
  ...props
}: ButtonCategoryProps) {
  return (
    <Pressable
      className={cn(
        'h-10 justify-center rounded-md border-2 border-transparent bg-slate-800 px-4',
        isSelected && 'border-lime-300',
        props.className,
      )}
      {...props}
    >
      <Text className="text-sm font-medium text-slate-100">{title}</Text>
    </Pressable>
  )
}
