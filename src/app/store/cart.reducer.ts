import { createReducer, on } from '@ngrx/store';
import { addProductToCart, removeProductFromCart } from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
    initialCartState,
    on(addProductToCart, (state, { product }) => {
        const newItems = [...state.items, product];
        return {
            ...state,
            items: newItems,
            total: newItems.reduce((sum, item) => sum + item.price, 0)
        };
    }),

    on(removeProductFromCart, (state, { productId }) => {
    const updatedItems = state.items.filter(item => item.productId !== productId);
    return {
      ...state,
      items: updatedItems,
      total: updatedItems.reduce((sum, item) => sum + item.price, 0)
    };
  })
)
