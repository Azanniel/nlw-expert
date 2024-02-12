import { create } from 'zustand'

import { ProductProps } from '@/utils/data/products'

interface ProductCartProps extends ProductProps {
  quantity: number
}

interface StateProps {
  products: ProductCartProps[]
  add: (product: ProductProps) => void
}

export const useCartStore = create<StateProps>((set, get) => {
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
  }
})
