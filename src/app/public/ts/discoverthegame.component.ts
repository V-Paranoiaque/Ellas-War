import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core';

import arrowLeft from '@iconify/icons-fa-solid/arrow-left';
import arrowRight from '@iconify/icons-fa-solid/arrow-right';

@Component({
  templateUrl: '../html/discoverthegame.component.html',
  styleUrls: ['../css/discoverthegame.component.css']
})

export class DiscoverTheGame {
  
  public page:string;
  
  arrowLeft = arrowLeft;
  arrowRight= arrowRight;
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.page = '';
  }
  
  ngOnInit() {
    let page = this.route.snapshot.paramMap.get('page');
    if(page) {
      this.page = page;
    }
  }
}
