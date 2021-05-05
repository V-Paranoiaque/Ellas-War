import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { environment } from './../../../environments/environment';

@Component({
  templateUrl: '../html/unsubscribe.component.html'
})

export class Unsubscribe {
  public id:any;
  public check:any;
  public unsubscribeResult:any;
  
  constructor(private socket: Socket, private http: HttpClient,
              private route: ActivatedRoute) {
    this.unsubscribeResult = {
      error: 0
    }
  }
  
  ngOnInit() {
    this.id    = this.route.snapshot.paramMap.get('id');
    this.check = this.route.snapshot.paramMap.get('check');
    
    let url:string;
    url = environment.SOCKET_ENDPOINT+'/api/unsubscribe/'+
          encodeURIComponent(this.id)+'/'+
          encodeURIComponent(this.check)+'.json';
    
    this.http.get(url).subscribe((result:any) => {
      this.unsubscribeResult = result;
    });
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
