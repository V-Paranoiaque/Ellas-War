import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/honnor.component.html',
  styleUrls: ['../css/honnor.component.css']
})

export class HonnorComponent implements OnInit, OnDestroy {
  public id: any;
  public list:any;
  public levels:any
  
  private subRank:Subscription;
  private subTitle:Subscription;
  
  constructor(private router: Router, private route: ActivatedRoute,
              private socket: Socket, private http: HttpClient,
              public user: User, public translate: TranslateService,
              private titleService: Title) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.levels = Array(10);
    this.subRank = new Subscription();
    this.subTitle = new Subscription();
    this.list = [];
  }
  
  ngOnInit() {  
    let id = this.route.snapshot.paramMap.get('id');
    
    if(!id) {
      id = '0';
    }
    
    this.load(id);
    
    this.socket.on('rankingHonnorRefresh', () => {
      this.load(this.id);
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('rankingHonnorRefresh');
    this.subRank.unsubscribe();
    this.subTitle.unsubscribe();
  }
  
  load(level:any) {
    if(level > 0 && level <= 10) {
      this.id = parseInt(level);
    }
    else {
      this.id = 0;
    }
    
    if(this.id > 0) {
      this.subTitle = this.translate.get('Ranking of Honor, page').subscribe((res: string) => {
        this.titleService.setTitle(res+' '+this.id);
      });
    }
    else {
      this.subTitle = this.translate.get('Honnor ranking, the best fighters').subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    }
    
    let url = this.socket.url+'/api/rankingHonnor/'+this.id+'.json';
    this.subRank = this.http.get(url).subscribe((res: any) => {
      this.list = res;
    });
  }
}
