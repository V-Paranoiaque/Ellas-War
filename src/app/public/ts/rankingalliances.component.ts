import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { ToolsComponent as Tools } from '../../../services/tools.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import users from '@iconify/icons-fa-solid/users';
import sortUP from '@iconify/icons-fa-solid/sort-up';

@Component({
  templateUrl: '../html/rankingalliances.component.html'
})

export class RankingAlliancesComponent implements OnInit, OnDestroy {
  public rankingList:any;
  public rankingMax:number;
  public rankingOrder:string;
  public rankingPage:number;
  
  private subRank:Subscription;
  private subTitle:Subscription;
  
  Tools = Tools;
  
  sortUP = sortUP;
  users  = users;
  
  constructor(public http: HttpClient, private route: ActivatedRoute, 
              private router: Router, public user: User,
              private socket: Socket, private titleService: Title, 
              public translate: TranslateService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
    this.rankingList = [];
    this.rankingMax = 1;
    this.rankingOrder = 'level';
    this.rankingPage = 1;
    this.subRank = new Subscription();
    this.subTitle = new Subscription();
  }
  
  ngOnInit() {
    let page = this.route.snapshot.paramMap.get('id');
    
    if(page) {
      this.rankingPage = parseInt(page);
    }
    
    this.getPage();
    
    this.socket.on('rankingAlliancesRefresh', () => {
      this.getPage();
    });
    
    this.subTitle = this.translate.get('Watch the power of other alliances').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('rankingAlliancesRefresh');
    this.subRank.unsubscribe();
    this.subTitle.unsubscribe();
  }
  
  getPage() {
    let url = this.socket.url+'/api/rankingAlliances/'+this.rankingPage+'/'+this.rankingOrder+'.json';
    
    this.subRank = this.http.get(url).subscribe((result:any) => {
      this.rankingPage = result.cPage;
      this.rankingMax  = result.max;
      this.rankingList = result.ranking;
      this.rankingOrder= result.order
    });
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
      this.router.navigate(['/rankingalliances/'+page+'/'+this.rankingOrder])
    }
    else {
      this.router.navigate(['/rankingalliances/'+page])
    }
  }
}
