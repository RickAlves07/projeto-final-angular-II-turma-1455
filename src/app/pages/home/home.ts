import { Component } from '@angular/core';
import { ProductsList } from '../../components/products-list/products-list';

@Component({
  selector: 'app-home',
  imports: [ProductsList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
