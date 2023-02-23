import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: '../html/lostpassword.component.html'
})

export class LostPasswordComponent implements OnInit, OnDestroy {
  public lostpasswordError:number;
  public lostvalue:string;
  
  private subLost:Subscription;
  private subTitle:Subscription;
  
  constructor(private http: HttpClient, private titleService: Title,
              public user: User, public translate: TranslateService,
              private socket: Socket) {
    this.lostpasswordError = 0;
    this.lostvalue = '';
    this.subLost = new Subscription();
    this.subTitle = new Subscription();
  }
  
  ngOnInit() {
    this.subTitle = this.translate.get('Forgot your password').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    if(this.subLost) {
      this.subLost.unsubscribe();
    }
    this.subTitle.unsubscribe();
  }
  
  lostpassword() {
    if(!this.lostvalue) {
      this.lostpasswordError = 4;
      return;
    }
    
    let url = this.socket.url+'/api/lostpassword/'+encodeURIComponent(this.lostvalue)+'.json';
    
    this.subLost = this.http.get(url).subscribe((res) => {
      const result = res as {error:number};
      if(result) {
        this.lostpasswordError = result.error;
      }
      else {
        this.lostpasswordError = 0;
      }
    });
  }
}
