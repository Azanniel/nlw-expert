import { Feather } from '@expo/vector-icons'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'

import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'
import { useCartStore } from '@/storage/cart-store'
import { ProductProps, PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/format-currency'

const { height } = Dimensions.get('screen')

export default function Product() {
  const { id } = useLocalSearchParams()
  const cartStore = useCartStore()

  const product = PRODUCTS.find((item) => item.id === id)

  function handleAddToCart(item: ProductProps) {
    cartStore.add(item)
    router.back()
  }

  if (!product) {
    return <Redirect href="/" />
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ minHeight: height }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        className="h-52 w-full"
        source={product.cover}
        alt=""
        resizeMode="cover"
      />

      <View className="mt-8 flex-1 p-5">
        <Text className="font-heading text-xl text-slate-100">
          {product.title}
        </Text>

        <Text className="my-2 font-heading text-2xl text-lime-400">
          {formatCurrency(product.price)}
        </Text>

        <Text className="mb-6 font-body text-base leading-6 text-slate-400">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => {
          return (
            <Text
              className="font-body text-base leading-6 text-slate-400"
              key={ingredient}
            >
              {'\u2022'} {ingredient}
            </Text>
          )
        })}
      </View>

      <View className="gap-5 p-5 pb-8">
        <Button onPress={() => handleAddToCart(product)}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </ScrollView>
  )
}
