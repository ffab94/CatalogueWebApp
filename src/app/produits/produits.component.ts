import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  public products;

  constructor(private catService: CatalogueService,
              private router:Router,
              private route: ActivatedRoute) {
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        let url = atob(route.snapshot.params.urlProds);
        this.getProducts(url);
      }
    });
  }

  ngOnInit(): void {
  }

  getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data=>{
        this.products=data;
      },err=>{
        console.log(err);
      });
  }
}
