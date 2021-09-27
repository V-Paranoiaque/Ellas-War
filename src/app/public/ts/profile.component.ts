import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import brushIcon from '@iconify/icons-bi/brush';
import userCircle from '@iconify/icons-fa-solid/user-circle';
import userShield from '@iconify/icons-fa-solid/user-shield';

@Component({
  templateUrl: '../html/profile.component.html'
})

export class ProfileComponent implements OnInit, OnDestroy {
  public onChange: EventEmitter<any> = new EventEmitter<any>();
  
  public id: any;
  public profile: any;
  
  private subPlayer:any;
  private subTitle:any;
  
  brushIcon  = brushIcon;
  userCircle = userCircle;
  userShield = userShield;
  
  constructor(protected http: HttpClient, public user: User,
              protected socket: Socket, public translate: TranslateService,
              private route: ActivatedRoute, private titleService: Title) {
    this.profile = {
      'username': ''
    }
  }
  
  ngOnInit() {
    this.load();
    
    this.socket.on('accountRefresh', () => {
      this.load();
    });
  }
  
  ngOnDestroy() {
    this.subPlayer.unsubscribe();
    
    if(this.subTitle) {
      this.subTitle.unsubscribe();
    }
    
    this.socket.removeListener('accountRefresh');
  }
  
  load() {
    let userId = this.route.snapshot.paramMap.get('id');
    let url = this.socket.url+'/api/playerProfile/'+userId+'.json';
    this.socket.emit('accountInfo');
    
    this.subPlayer = this.http.get(url).subscribe((player:any) => {
      if(player && player.membre_id) {
        this.profile = player;
        
        this.subTitle = this.translate.get('Player profile:').subscribe((res: string) => {
          this.titleService.setTitle(res+' '+player.username);
        });
        this.socket.onChange.emit({action: 'addDest', username: player.username});
      }
    });
  }
}
