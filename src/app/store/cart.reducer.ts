import { createReducer, on } from '@ngrx/store';
import {
  addProductToCart,
  removeAllQuantityProductFromCart,
  removeProductFromCart,
} from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
  initialCartState,
  on(addProductToCart, (state, { product }) => {
    const existingItem = state.items.find((item) =>
      item.id === product.id
    );
    let newItems;
    if (existingItem) {
      newItems = state.items.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) } : item
      );
    } else {
      newItems = [
        ...state.items, { ...product, quantity: product.quantity || 1 },
      ];
    }
    return {
      ...state,
      items: newItems,
      totalItems: calculateTotalItems(newItems),
      total: calculateTotal(newItems),
    };
  }),

  on(removeProductFromCart, (state, { productId }) => {
    const updatedItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0);
    return {
      ...state,
      items: updatedItems,
      totalItems: calculateTotalItems(updatedItems),
      total: calculateTotal(updatedItems),
    };
  }),

  on(removeAllQuantityProductFromCart, (state, { productId }) => {
    const updatedItems = state.items.filter((item) => item.id !== productId);
    return {
      ...state,
      items: updatedItems,
      totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      total: calculateTotal(updatedItems),
    };
  })
);

function calculateTotal(items: any[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateTotalItems(items: any[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
