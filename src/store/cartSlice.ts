import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
    id: string,
    name: string,
    price: number
    quantity: number
    image: string
    flavor?: string
    size?: string
    product_id?: number
    product_variant_id?: string
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(i => i.id === action.payload.id)

            if (existingItem) {
                existingItem.quantity += action.payload.quantity
            } else {
                state.items.push(action.payload)
            }

        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(i => i.id !== action.payload)
        },
        clearCart: (state) => {
            state.items = []
        },
        updateQuantity: (state, action: PayloadAction<{
            id: string,
            quantity: number,

        }>) => {
            const item = state.items.find(i => i.id === action.payload.id)

            if (item) {
                item.quantity = Math.max(1, action.payload.quantity)
            }
        },
        setCartFromApi: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
        }
    }
})

export const { addItem, removeItem, clearCart, updateQuantity, setCartFromApi } = cartSlice.actions
export default cartSlice.reducer


export const selectCartItems = (state: { cart: CartState }) => state.cart.items
export const selectTotalItems = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)


export const selectTotalPrice = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)