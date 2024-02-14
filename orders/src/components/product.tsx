import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface ProductData {
  title: string
  description: string
  quantity?: number
  thumbnail: ImageProps
}

interface ProductProps extends TouchableOpacityProps {
  data: ProductData
}

export function Product({ data, ...props }: ProductProps) {
  return (
    <TouchableOpacity className="w-full flex-row items-center pb-4" {...props}>
      <Image className="h-20 w-20 rounded-md" source={data.thumbnail} alt="" />

      <View className="ml-3 flex-1">
        <View className="flex-row items-center">
          <Text className="flex-1 font-subtitle text-base text-slate-100">
            {data.title}
          </Text>

          {data.quantity && (
            <Text className="font-subtitle text-sm text-slate-400">
              x{data.quantity}
            </Text>
          )}
        </View>

        <Text className="mt-0.5 text-xs leading-5 text-slate-400">
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
