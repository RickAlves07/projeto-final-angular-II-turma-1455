import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  removeAllFromCart,
  removeAllQuantityFromCart,
  removeFromCart,
} from './cart.actions';
import { initialCartState } from './cart.state';

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { movie }) => {
    console.log('Movie added to cart:', 'movieId:', movie.id);
    const existingItem = state.items.find((item) =>
      item.id === movie.id
    );
    let newItems;
    if (existingItem) {
      newItems = state.items.map((item) =>
        item.id === movie.id ? { ...item, quantity: (item.quantity || 1) + (1) } : item
      );
    } else {
      newItems = [
        ...state.items, { ...movie, quantity: movie.quantity || 1 },
      ];
    }
    return {
      ...state,
      items: newItems,
      totalItems: calculateTotalItems(newItems),
      total: calculateTotal(newItems),
    };
  }),

  on(removeFromCart, (state, { movieId }) => {
    console.log('Movie subtracted from cart:', 'movieId:', movieId);
    const updatedItems = state.items.map((item) =>
        item.id === movieId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0);
    return {
      ...state,
      items: updatedItems,
      totalItems: calculateTotalItems(updatedItems),
      total: calculateTotal(updatedItems),
    };
  }),

  on(removeAllQuantityFromCart, (state, { movieId }) => {
    console.log('Movie removed from cart:', 'movieId:', movieId);
    const updatedItems = state.items.filter((item) => item.id !== movieId);
    return {
      ...state,
      items: updatedItems,
      totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      total: calculateTotal(updatedItems),
    };
  }),

  on(removeAllFromCart, (state) => {
    console.log('All movies removed from cart');
    return {
      ...state,
      items: [],
      totalItems: 0,
      total: 0,
    };
  }),
);

function calculateTotal(items: any[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateTotalItems(items: any[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
