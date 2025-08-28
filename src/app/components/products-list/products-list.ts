import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { ProductCard } from '../product-card/product-card';
import { IProduct } from '../../models/interfaces/iproduct';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-products-list',
  imports: [ProductCard, ɵInternalFormsSharedModule, FormsModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  private productService = inject(ProductsService);
  productFilterName: string = '';
  selectedCategoryFilter: string = '';
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
    const filtered = (this.allProductsList() ?? []).filter((product) =>
      product.title.includes(this.productFilterName) &&
      (this.selectedCategoryFilter === '' || product.category.includes(this.selectedCategoryFilter))
    );
    this.products.set(filtered);
  }

  resetFilters() {
    this.productFilterName = '';
    this.selectedCategoryFilter = '';
    this.products.set(this.allProductsList());
  }
}
