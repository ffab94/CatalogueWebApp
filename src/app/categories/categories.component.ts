import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: Object;
  public currentCategory;

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit(): void {
    this.catService.getAllCategories()
      .subscribe(data=>{
        this.categories=data;
      },err=>{
        console.log(err);
      });
  }

  onGetProducts(cat) {
    this.currentCategory=cat;
    let url=cat._links.products.href;
    this.router.navigateByUrl("/products/"+btoa(url));
  }
}
