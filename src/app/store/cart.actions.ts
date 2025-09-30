import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ movie: any }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ movieId: number }>()
);

export const removeAllQuantityFromCart = createAction(
  '[Cart] Remove All Quantity Item',
  props<{ movieId: number }>()
);

export const removeAllFromCart = createAction(
  '[Cart] Remove All'
);
