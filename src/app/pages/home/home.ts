import { Component } from '@angular/core';
import { ProductsList } from '../../components/products-list/products-list';
import { MoviesList } from '../../components/movies-list/movies-list';

@Component({
  selector: 'app-home',
  imports: [ProductsList, MoviesList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
