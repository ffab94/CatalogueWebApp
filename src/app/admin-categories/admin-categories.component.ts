import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  public categories: Object;
  public mode: string="list-cat";
  public currentCategory;

  constructor(private catService:CatalogueService) { }

  ngOnInit(): void {
    this.onGetAllCategories();
  }

  onGetAllCategories(){
    this.catService.getAllCategories()
      .subscribe(data=>{
        this.categories=data;
      },err=>{
        console.log(err);
      });
  }

  onDeleteCat(cat) {
    let c=confirm("Etes-vous sûr?");
    if(!c) return;
    this.catService.deleteResource(cat._links.self.href)
      .subscribe(data=>{
        this.onGetAllCategories();
      },err=>{
        console.log(err);
      });
  }

  onNewCategory() {
    this.mode="new-cat";
  }

  onSaveCategory(cat) {
    let url=this.catService.host+"/categories";
    this.catService.postResource(url,cat)
      .subscribe(data=>{
        this.mode="list-cat";
        this.onGetAllCategories();
      },err=>{
        console.log(err);
      });
  }

  onEditCat(cat) {
    this.catService.getResource(cat._links.self.href)
  .subscribe(data=>{
      this.currentCategory=data;
      this.mode="edit-cat";
    },err=>{
      console.log(err);
    });
  }

  onUpdateCategory(data) {
    this.catService.putResource(this.currentCategory._links.self.href,data)
      .subscribe(data=>{
        this.mode="list-cat";
        this.onGetAllCategories();
      },err=>{
        console.log(err);
      });
  }
}
