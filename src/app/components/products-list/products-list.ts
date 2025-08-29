import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { ProductCard } from '../product-card/product-card';
import { IProduct } from '../../models/interfaces/iproduct';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard, ɵInternalFormsSharedModule, FormsModule, CommonModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  private productService = inject(ProductsService);
  productFilterName: string = '';
  selectedCategoryFilter: string = '';
  isFiltered: boolean = false;
  allProductsList = signal<IProduct[]>([]);
  products = signal<IProduct[]>([]);
  categories = signal<string[]>([]);


  constructor() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.allProductsList.set(products);
      this.products.set(this.allProductsList());
      const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
      this.categories.set(uniqueCategories);
    });
  }

  filterProductsByName(name: string) {
    this.productFilterName = name;
    this.applyFilters();
  }

  filterProductsByCategory(category: string) {
    this.selectedCategoryFilter = category;
    this.applyFilters();
  }

  applyFilters() {
    this.isFiltered = true;
    const filtered = (this.allProductsList() ?? []).filter((product) =>
      product.title.toLocaleLowerCase().includes(this.productFilterName.toLocaleLowerCase()) &&
      (this.selectedCategoryFilter === '' || product.category.toLocaleLowerCase().includes(this.selectedCategoryFilter.toLocaleLowerCase()))
    );
    this.products.set(filtered);
  }

  resetFilters() {
    this.isFiltered = false;
    this.productFilterName = '';
    this.selectedCategoryFilter = '';
    this.products.set(this.allProductsList());
  }
}
