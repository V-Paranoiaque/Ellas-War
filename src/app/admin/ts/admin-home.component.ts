import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-home.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminHomeComponent implements OnInit, OnDestroy {
  
  public adminStats:any;
  public apiInfo:any;
  
  private sub:any;
  
  constructor(protected http: HttpClient, private socket: Socket,
              public user: User, public translate: TranslateService) {
    this.adminStats = {};
    this.apiInfo = {};
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminStats');
    
    let url = this.socket.url+'/api.json';
    this.sub = this.http.get(url).subscribe((result:any) => {
      this.apiInfo = result;
    });
    
    this.socket.on('adminStats', (msg:any) => {
      this.adminStats = msg;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminStats');
    
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
