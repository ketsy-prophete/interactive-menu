import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: number = 0;

  currentProduct: Product = new Product()

  constructor(private productService: ProductService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const routeID = this.actRoute.snapshot.paramMap.get("id") ?? "";
    this.id = parseInt(routeID);
    this.productService.getProductByID(this.id).subscribe(foundProduct => {
      console.log(foundProduct);
      this.currentProduct = foundProduct;
    })
  }

  onSubmit() {
    this.productService.updateProductByID(this.id, this.currentProduct).subscribe(edittedProduct => {
      console.log(edittedProduct);
      this.router.navigateByUrl("/products" + `/${this.id}`);
    })
  }
}
