export interface CartState {
  items: any[];
  total: number;
}

export const initialCartState: CartState = {
  items: [],
  total: 0,
};