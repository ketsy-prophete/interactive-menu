import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  productList: Product[] = [];

  id: number = 0;

  currentProduct: Product = new Product()

  constructor(private productService: ProductService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProducts();

    const routeID = this.actRoute.snapshot.paramMap.get("id") ?? "";
    this.id = parseInt(routeID);
    this.productService.getProductByID(this.id).subscribe(foundProduct => {
      console.log(foundProduct);
      this.currentProduct = foundProduct;
    });
  }

  onDelete(id: number) {
    this.productService.deleteProductByID(id).subscribe(response => {
      console.log(response);
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(foundProducts => {
      console.log(foundProducts);
      this.productList = foundProducts;
    });
  }
}

