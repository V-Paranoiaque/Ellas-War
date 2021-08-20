import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/confirm.component.html'
})

export class ConfirmComponent implements OnInit, OnDestroy {
  public confirmResult:number;
  private sub:any;
  
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
  
    this.sub = this.http.get(url).subscribe((result:any) => {
      this.confirmResult = result.error;
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
