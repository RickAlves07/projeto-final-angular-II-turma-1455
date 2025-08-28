import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/interfaces/iproduct';
import { RouterModule } from '@angular/router';
import { CurrencyBRLPipe } from "../../pipes/currency-brl.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule, CurrencyBRLPipe, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
 @Input() product! : IProduct;
}
