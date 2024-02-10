import { useState } from 'react'
import { FlatList, View } from 'react-native'

import { ButtonCategory } from '@/components/button-category'
import { Header } from '@/components/header'
import { CATEGORIES } from '@/utils/data/products'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  function handleCategorySelect(category: string) {
    setSelectedCategory(category)
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantity={4} />

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
    </View>
  )
}
