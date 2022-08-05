import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: '../html/unsubscribe.component.html'
})

export class UnsubscribeComponent implements OnInit, OnDestroy {
  public id:any;
  public check:any;
  public sub:Subscription;
  public unsubscribeResult:any;
  
  constructor(public user: User, private socket: Socket,
              private http: HttpClient, private route: ActivatedRoute) {
    this.unsubscribeResult = {
      error: 0
    }
    this.sub = new Subscription();
  }
  
  ngOnInit() {
    this.id    = this.route.snapshot.paramMap.get('id');
    this.check = this.route.snapshot.paramMap.get('check');
    
    let url:string;
    url = this.socket.url+'/api/unsubscribe/'+
          encodeURIComponent(this.id)+'/'+
          encodeURIComponent(this.check)+'.json';
    
    this.sub = this.http.get(url).subscribe((result:any) => {
      this.unsubscribeResult = result;
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  unsubscribeConfirm() {
    let msg = {
      'id': this.id,
      'code': this.check
    }
    this.socket.emit('unsubscribeValidate', msg);
    this.unsubscribeResult.error = 5;
  }
}
