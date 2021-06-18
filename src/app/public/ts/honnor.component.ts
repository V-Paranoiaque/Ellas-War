import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/honnor.component.html',
  styleUrls: ['../css/honnor.component.css']
})

export class Honnor {
  public id: any;
  public list:any;
  public levels:any
  
  constructor(private router: Router, private route: ActivatedRoute,
              private socket: Socket, private http: HttpClient,
              public user: User, public translate: TranslateService,
              private titleService: Title) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.levels = Array(10);
  }
  
  ngOnInit() {  
    let id = this.route.snapshot.paramMap.get('id');
    
    if(!id) {
      id = '0';
    }
    
    setTimeout(() => {
      this.load(id);
    }, 0);
    
    this.socket.on('rankingHonnorRefresh', () => {
      this.load(this.id);
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('rankingHonnorRefresh');
  }
  
  load(level:any) {
    if(level > 0 && level <= 10) {
      this.id = parseInt(level);
    }
    else {
      this.id = 0;
    }
    
    if(this.id > 0) {
      this.translate.get('Ranking of Honor, page').subscribe((res: string) => {
        this.titleService.setTitle(res+' '+this.id);
      });
    }
    else {
      this.translate.get('Honnor ranking, the best fighters').subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    }
    
    let url = this.socket.url+'/api/rankingHonnor/'+this.id+'.json';
    this.http.get(url).subscribe(res => {
      this.list = res;
    });
  }
}
