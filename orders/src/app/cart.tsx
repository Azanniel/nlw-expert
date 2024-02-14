import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Linking, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { LinkButton } from '@/components/link-button'
import { Product } from '@/components/product'
import { useCartStore } from '@/storage/cart-store'
import { ProductProps } from '@/utils/data/products'
import { formatCurrency } from '@/utils/format-currency'

const PHONE_NUMBER = '+5592985406269'

export default function Cart() {
  const [address, setAddress] = useState('')

  const cartStore = useCartStore()

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  )

  function handleProductRemove(product: ProductProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => cartStore.remove(product.id),
      },
    ])
  }

  function handleSendOrder() {
    if (address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe os dados da entrega')
    }

    const products = cartStore.products.map((product) => {
      return `\n${product.quantity}x ${product.title}`
    })

    const productsInString = products.join('')

    const message = `
      🍔 NOVO PEDIDO
      \n Entregar em: ${address}

      ${productsInString}

      \n Valor total: ${total}
    `

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )

    router.back()
    cartStore.clear()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 p-5">
          {cartStore.products.length === 0 && (
            <Text className="my-8 text-center font-body text-slate-400">
              Seu carrinho está vazio
            </Text>
          )}

          <View className="border-b border-slate-700">
            {cartStore.products.map((product) => {
              return (
                <Product
                  key={product.id}
                  data={product}
                  onPress={() => handleProductRemove(product)}
                />
              )
            })}
          </View>

          <View className="flex-row items-center gap-2 pb-4 pt-5">
            <Text className="font-subtitle text-xl text-slate-100">Total:</Text>
            <Text className="font-heading text-2xl text-lime-400">{total}</Text>
          </View>

          <Input
            placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
            value={address}
            onChangeText={setAddress}
            returnKeyType="done"
            blurOnSubmit
          />
        </View>
      </KeyboardAwareScrollView>

      <View className="gap-5 p-5">
        <Button
          disabled={cartStore.products.length === 0}
          onPress={handleSendOrder}
        >
          <Button.Text>Envia pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  )
}
