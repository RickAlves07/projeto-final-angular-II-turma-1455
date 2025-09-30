import { Component } from '@angular/core';
import { MoviesList } from '../../components/movies-list/movies-list';

@Component({
  selector: 'app-home',
  imports: [MoviesList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
