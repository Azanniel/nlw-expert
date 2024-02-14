import { router } from 'expo-router'
import { useRef, useState } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'

import { ButtonCategory } from '@/components/button-category'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { useCartStore } from '@/storage/cart-store'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  const { products } = useCartStore()
  const sectionRef = useRef<SectionList<ProductProps>>(null)

  function handleCategorySelect(category: string) {
    setSelectedCategory(category)

    const sectionIndex = CATEGORIES.findIndex((item) => item === category)

    if (sectionIndex === -1) {
      return
    }

    sectionRef.current?.scrollToLocation({
      animated: true,
      sectionIndex,
      itemIndex: 0,
    })
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantity={products.length} />

      <FlatList
        className="mt-5 max-h-10"
        data={CATEGORIES}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        renderItem={({ item }) => {
          return (
            <ButtonCategory
              title={item}
              isSelected={item === selectedCategory}
              onPress={() => handleCategorySelect(item)}
            />
          )
        }}
      />

      <SectionList
        className="flex-1 p-5"
        ref={sectionRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          return (
            <Product
              data={item}
              onPress={() => router.navigate(`/product/${item.id}`)}
            />
          )
        }}
        renderSectionHeader={({ section }) => {
          return (
            <Text className="mb-3 mt-8 font-heading text-xl text-slate-100">
              {section.title}
            </Text>
          )
        }}
      />
    </View>
  )
}
