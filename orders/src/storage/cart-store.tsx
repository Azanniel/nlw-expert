import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ProductProps } from '@/utils/data/products'

interface ProductCartProps extends ProductProps {
  quantity: number
}

interface StateProps {
  products: ProductCartProps[]
  add: (product: ProductProps) => void
  remove: (id: string) => void
  clear: () => void
}

export const useCartStore = create(
  persist<StateProps>(
    (set, get) => {
      return {
        products: [],

        add: (newProduct) => {
          const { products } = get()

          const existingProduct = products.find(
            (product) => product.id === newProduct.id,
          )

          if (existingProduct) {
            return set({
              products: products.map((product) => {
                if (product.id === existingProduct.id) {
                  return {
                    ...existingProduct,
                    quantity: existingProduct.quantity + 1,
                  }
                }

                return product
              }),
            })
          }

          set({ products: [...products, { ...newProduct, quantity: 1 }] })
        },

        remove: (productId: string) => {
          const { products } = get()

          const updatedProducts = products.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                quantity: product.quantity > 1 ? product.quantity - 1 : 0,
              }
            }

            return product
          })

          const productsGreaterThenOne = updatedProducts.filter(
            (product) => product.quantity > 0,
          )

          set({ products: productsGreaterThenOne })
        },

        clear: () => {
          set({ products: [] })
        },
      }
    },
    {
      name: 'nlw-expert:orders',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
