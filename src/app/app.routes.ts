import { ProductDetails } from './pages/product-details/product-details';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Checkout } from './pages/checkout/checkout';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NewMovie } from './pages/new-movie/new-movie';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', redirectTo: '' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'movies/new', component: NewMovie },
  { path: 'movies/edit/:id',component: NewMovie },
  { path: 'product-detail/:id', component: ProductDetails },
  { path: 'checkout', component: Checkout },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
