import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: [],
    cartTotalQty: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQty += 1;
            } else {
                const tempProduct = { ...action.payload, cartQty: 1 };

                state.cartItems.push(tempProduct);
            }

        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id);

            if (state.cartItems[itemIndex].cartQty > 1) {
                state.cartItems[itemIndex].cartQty -= 1;
            } else {
                const nextCartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);

                state.cartItems = nextCartItems;
            }
        },
        getCartTotal: (state, action) => {
            let { total, qty } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQty } = cartItem;

                const itemTotal = price * cartQty;

                cartTotal.total += itemTotal;
                cartTotal.qty += cartQty;

                return cartTotal
            }, { total: 0, qty: 0 })
            
            state.cartTotalQty = qty;
            state.cartTotalAmount = total;
        }
    }
})

export const { addToCart, decreaseCart, getCartTotal } = cartSlice.actions;

export default cartSlice.reducer;