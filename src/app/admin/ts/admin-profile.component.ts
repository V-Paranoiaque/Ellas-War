import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import bomb from '@iconify/icons-fa-solid/bomb';
import eye from '@iconify/icons-fa-solid/eye';
import comments from '@iconify/icons-fa-solid/comments';
import users from '@iconify/icons-fa-solid/users';

@Component({
  templateUrl: '../html/admin-profile.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminProfileComponent implements OnInit, OnDestroy {
  
  public profile: any;
  
  private subPlayer:Subscription;
  private subTitle:Subscription;
  
  bomb = bomb;
  comments = comments;
  eye = eye;
  users = users;
  
  constructor(private http: HttpClient, public user: User,
              private route: ActivatedRoute, public translate: TranslateService,
              private titleService: Title, private socket: Socket) {
    this.profile = {
      'username': ''
    }
    this.subPlayer = new Subscription();
    this.subTitle = new Subscription();
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    let userId = this.route.snapshot.paramMap.get('id');
    
    this.profile = {
      'membre_id': userId
    };
    
    this.socket.emit('adminProfile', this.profile.membre_id);
    
    this.getProfile();
    
    this.socket.on('adminProfile', (data) => {
      console.log(data);
    });
    
    this.socket.on('adminUserBlock', () => {
      this.getProfile();
    });
    this.socket.on('adminUserUnblock', () => {
      this.getProfile();
    });
    this.socket.on('adminChatBlock', () => {
      this.getProfile();
    });
    this.socket.on('adminChatUnblock', () => {
      this.getProfile();
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminProfile');
    this.socket.removeListener('adminUserBlock');
    this.socket.removeListener('adminUserUnblock');
    this.socket.removeListener('adminChatBlock');
    this.socket.removeListener('adminChatUnblock');
    
    this.subPlayer.unsubscribe();
    
    if(this.subTitle) {
      this.subTitle.unsubscribe();
    }
  }
  
  getProfile() {
    let url = this.socket.url+'/api/playerProfile/'+this.profile.membre_id+'.json';
    this.subPlayer = this.http.get(url).subscribe((res:object) => {
      const player = res as {membre_id:number, username:string}
      if(player && player.membre_id) {
        this.profile = player;
        
        this.subTitle = this.translate.get('Player profile:').subscribe((res: string) => {
          this.titleService.setTitle(res+' '+player.username);
        });
      }
    });
  }
  
  adminUserBlock() {
    if(this.profile.membre_status === 1) {
      this.socket.emit('adminUserBlock', this.profile.membre_id);
    }
    else if(this.profile.membre_status === 3) {
      this.socket.emit('adminUserUnblock', this.profile.membre_id);
    }
  }
  
  adminChatBlock() {
    if(this.profile.chat_allowed === 1) {
      this.socket.emit('adminChatBlock', this.profile.membre_id);
    }
    else {
      this.socket.emit('adminChatUnblock', this.profile.membre_id);
    }
  }
  
  adminAllianceChief() {
    this.socket.emit('adminAllianceChief', this.profile.membre_id);
  }
}
