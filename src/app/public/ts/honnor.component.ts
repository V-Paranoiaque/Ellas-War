import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';

@Component({
  templateUrl: '../html/honnor.component.html',
  styleUrls: ['../css/honnor.component.css']
})

export class Honnor {
  private _url = environment.SOCKET_ENDPOINT+'/api/rankingHonnor/';
  public id: any;
  public list:any;
  public levels:any
  
  constructor(private router: Router, private route: ActivatedRoute, private socket: Socket, private http: HttpClient, public translate: TranslateService) {
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
      this.id = level;
    }
    else {
      this.id = 0;
    }
    this.http.get(this._url+this.id+'.json')
      .subscribe(res => {
        this.list = res;
      });
  }
}
