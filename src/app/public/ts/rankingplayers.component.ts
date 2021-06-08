import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';
import { environment } from './../../../environments/environment';

import sortUP from '@iconify/icons-fa-solid/sort-up';

@Component({
  templateUrl: '../html/rankingplayers.component.html'
})

export class RankingPlayers implements OnInit {
  public rankingList:any;
  public rankingMax:number;
  public rankingOrder:string;
  public rankingPage:number;
  
  sortUP = sortUP;
  
  constructor(private http: HttpClient, private route: ActivatedRoute, 
              private router: Router, public user: User, 
              public translate: TranslateService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
    this.rankingList = [];
    this.rankingMax = 1;
    this.rankingOrder = 'level';
    this.rankingPage = 1;
  }
  
  ngOnInit() {
    let page = this.route.snapshot.paramMap.get('id');
    
    if(page) {
      this.rankingPage = parseInt(page);
    }
    
    this.getPage();
  }
  
  getPage() {
    let url:string;
   
    url = environment.SOCKET_ENDPOINT+'/api/rankingPlayers/'+this.rankingPage+'/'+this.rankingOrder+'.json';
    
    this.http.get(url).subscribe((result:any) => {
      this.rankingPage = result.cPage;
      this.rankingMax  = result.max;
      this.rankingList = result.ranking;
      this.rankingOrder= result.order
    });
  }
  
  range(a:number, b:number) {
    let list = []
    for(a;a<=b;a++) {
      list.push(a);
    }
    return list;
  }
  
  rankingChooseOrder(order:string) {
    this.rankingOrder = order;
    this.getPage();
  }
  
  rankingPageChange(page:any) {
    if(!page || page < 1) {
      page = 1;
    }
    
    if(page > this.rankingMax) {
      page = this.rankingMax;
    }
    
    if(this.rankingOrder && this.rankingOrder != 'level') {
      this.router.navigate(['/rankingplayers/'+page+'/'+this.rankingOrder])
    }
    else {
      this.router.navigate(['/rankingplayers/'+page])
    }
  }
}
