import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import clipboardCheck from '@iconify/icons-fa-solid/clipboard-check';

@Component({
  selector: 'app-options-sponsoring-information-popup',
  templateUrl: '../html/options-sponsoring-information-popup.sub-component.html'
})

export class OptionsSponsoringInformationPopupSubComponent implements OnInit, OnDestroy {
  
  public sponsorList:object[] = [];
  public linkSaved: number;
  public sponsorError = 0;
  public sponsorNew = '';
  public sponsorUsername = '';

  private subPlayer:Subscription;
  
  //Icons
  clipboardCheck = clipboardCheck;

  constructor(private http: HttpClient, private socket: Socket, public user: User, public translate: TranslateService) {
    this.linkSaved = 0;
    this.subPlayer = new Subscription();
  }
  
  ngOnInit() {
    this.socket.emit('sponsorList');
    
    this.socket.on('sponsorChoose', (data:number) => {
      this.sponsorError = data;
    });
    this.socket.on('sponsorList', (data:object[]) => {
      this.sponsorList = data;
    });
    this.socket.on('sponsorPlayer', (data:number) => {
      this.getSponsor(data);
    });
    this.getSponsor(this.user.getPropertyNb('sponsor'));
  }
  
  ngOnDestroy() {
    this.socket.removeListener('sponsorChoose');
    this.socket.removeListener('sponsorList');
    this.socket.removeListener('sponsorPlayer');
    this.subPlayer.unsubscribe();
  }

  sponsorChoose() {
    this.socket.emit('sponsorChoose', this.sponsorNew)
  }

  getSponsor(id:number) {
    let url = this.socket.url+'/api/playerProfile/'+id.toString()+'.json';
    this.subPlayer = this.http.get(url).subscribe((res:object) => {
      const player = res as {membre_id:number, username:string}
      if(player && player.membre_id) {
        this.sponsorUsername = player.username;
      }
    });
  }
  
  copyLink() {
    this.linkSaved = 1;
    
    setTimeout(() => {
      this.linkSaved = 0;
    }, 2000);
  }
}
