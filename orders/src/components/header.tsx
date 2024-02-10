import { Feather } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

interface HeaderProps {
  title: string
  cartQuantity?: number
}

export function Header(props: HeaderProps) {
  return (
    <View className="mx-5 flex-row items-center border-b border-slate-700 pb-5">
      <View className="flex-1">
        <Image
          className="h-6 w-32"
          source={require('@/assets/logo.png')}
          alt=""
        />
        <Text className="mt-2 font-heading text-xl text-white">
          {props.title}
        </Text>
      </View>

      {props.cartQuantity && (
        <TouchableOpacity className="relative" activeOpacity={0.7}>
          <View className="absolute -right-2 -top-1 z-10 h-4 w-4 items-center justify-center rounded-full bg-lime-300">
            <Text className="text-xs font-bold text-slate-900">
              {props.cartQuantity}
            </Text>
          </View>

          <Feather name="shopping-bag" color={colors.slate[100]} size={24} />
        </TouchableOpacity>
      )}
    </View>
  )
}
