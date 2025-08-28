import { createAction, props } from '@ngrx/store';

export const addProductToCart = createAction(
  '[Product Detail] Add Product to Cart',
  props<{ product: any }>()
);

export const removeProductFromCart = createAction(
  '[Cart] Remove Product',
  props<{ productId: number }>()
);

export const removeAllQuantityProductFromCart = createAction(
  '[Cart] Remove All Quantity Product',
  props<{ productId: number }>()
);
