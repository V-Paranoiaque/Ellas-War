import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/confirm.component.html'
})

export class Confirm {
  public confirmResult:number;
  
  constructor(public user: User, private http: HttpClient,
              private route: ActivatedRoute,
              private socket: Socket) {
    this.confirmResult = 0;
  }
  
  ngOnInit() {
    let id:any   = this.route.snapshot.paramMap.get('id');
    let check:any = this.route.snapshot.paramMap.get('check');
    
    let url = this.socket.url+'/api/confirmcheck/'+
        encodeURIComponent(id)+'/'+
        encodeURIComponent(check)+'.json';
  
    this.http.get(url).subscribe((result:any) => {
      this.confirmResult = result.error;
    });
  }
}
