import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Checkout } from './pages/checkout/checkout';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NewMovie } from './pages/new-movie/new-movie';
import { authGuard } from './guards/auth-guard-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', redirectTo: '' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'movie/new', component: NewMovie, canActivate: [authGuard] },
  { path: 'movie/edit/:id',component: NewMovie, canActivate: [authGuard] },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
