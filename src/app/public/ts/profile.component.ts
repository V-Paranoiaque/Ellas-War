import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import brushIcon from '@iconify/icons-bi/brush';
import userCircle from '@iconify/icons-fa-solid/user-circle';
import userShield from '@iconify/icons-fa-solid/user-shield';

type profile = {
  membre_id:number, username:'', level: number, xp:number, victory:number,
  field: number, featsofstrength: number, alliance:number, alliance_name: string,
  rank_name: string, location: string, inscription:number, description: string,
  membre_img: string
};

@Component({
  templateUrl: '../html/profile.component.html'
})

export class ProfileComponent implements OnInit, OnDestroy {
  public onChange: EventEmitter<any> = new EventEmitter<any>();
  
  public id: any;
  public profile: profile;
  
  private subPlayer:Subscription;
  private subTitle:Subscription;
  
  brushIcon  = brushIcon;
  userCircle = userCircle;
  userShield = userShield;
  
  constructor(protected http: HttpClient, public user: User,
              protected socket: Socket, public translate: TranslateService,
              private route: ActivatedRoute, private titleService: Title) {
    this.profile = {
      membre_id: 0, username:'', level:  0, xp: 0, victory: 0,
      field: 0, featsofstrength: 0, alliance: 0, alliance_name: '',
      rank_name: '', location: '', inscription: 0, description: '',
      membre_img: ''
    }
    this.subPlayer = new Subscription();
    this.subTitle = new Subscription();
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') ?? '';
      this.load(parseInt(id));
    });
    this.socket.on('accountRefresh', () => {
      const userId = this.route.snapshot.paramMap.get('id') ?? '';
      this.load(parseInt(userId));
    });
  }
  
  ngOnDestroy() {
    this.subPlayer.unsubscribe();
    
    if(this.subTitle) {
      this.subTitle.unsubscribe();
    }
    
    this.socket.removeListener('accountRefresh');
  }
  
  load(userId:number) {
    let url = this.socket.url+'/api/playerProfile/'+userId+'.json';
    this.socket.emit('accountInfo');
    
    this.subPlayer = this.http.get(url).subscribe((resPlayer:object) => {
      const player = resPlayer as profile;
      if(player?.membre_id) {
        this.profile = player;
        
        this.subTitle = this.translate.get('Player profile:').subscribe((res: string) => {
          this.titleService.setTitle(res+' '+player.username);
        });
        this.socket.onChange.emit({action: 'addDest', username: player.username});
      }
    });
  }
}
