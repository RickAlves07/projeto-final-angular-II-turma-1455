import { ProductDetails } from './pages/product-details/product-details';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', redirectTo: '' },
  { path: 'product-detail:id', component: ProductDetails },
  { path: 'checkout', component: Checkout },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
