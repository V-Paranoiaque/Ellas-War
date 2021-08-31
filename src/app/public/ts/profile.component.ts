import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/profile.component.html'
})

export class ProfileComponent implements OnInit, OnDestroy {
  public id: any;
  public profile: any;
  
  private subPlayer:any;
  private subTitle:any;
  
  constructor(private http: HttpClient, public user: User,
              private route: ActivatedRoute, public translate: TranslateService,
              private titleService: Title, private socket: Socket) {
    this.profile = {
      'username': ''
    }
  }
  
  ngOnInit() {
    let userId = this.route.snapshot.paramMap.get('id');
    let url = this.socket.url+'/api/playerProfile/'+userId+'.json';
    
    this.subPlayer = this.http.get(url).subscribe((player:any) => {
      if(player && player.membre_id) {
        this.profile = player;
        
        this.subTitle = this.translate.get('Player profile:').subscribe((res: string) => {
          this.titleService.setTitle(res+' '+player.username);
        });
      }
    });
  }
  
  ngOnDestroy() {
    this.subPlayer.unsubscribe();
    
    if(this.subTitle) {
      this.subTitle.unsubscribe();
    }
  }
}
