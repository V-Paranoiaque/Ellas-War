import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core';

@Component({
  templateUrl: '../html/discoverthegame.component.html'
})

export class DiscoverTheGame {
  
  public page:string;
  
  constructor(private route: ActivatedRoute) {
    this.page = '';
  }
  
  ngOnInit() {
    let page = this.route.snapshot.paramMap.get('page');
    if(page) {
      this.page = page;
    }
  }
}
