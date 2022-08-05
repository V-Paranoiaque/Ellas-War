import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { Title } from '@angular/platform-browser';

import userPlus from '@iconify/icons-fa-solid/user-plus';

@Component({
  templateUrl: '../html/alliance-profile.component.html'
})

export class AllianceProfileComponent implements OnInit, OnDestroy {
  private subMembers:Subscription;
  private subProfile1:Subscription;
  private subProfile2:Subscription;
  
  allianceProfile:any;
  userPlus = userPlus;
  
  constructor(public http: HttpClient, private route: ActivatedRoute,
              private socket: Socket, public user: User,
              private titleService: Title, public translate: TranslateService) {
    this.allianceProfile = {};
    this.subMembers  = new Subscription();
    this.subProfile1 = new Subscription();
    this.subProfile2 = new Subscription();
  }
  
  ngOnInit() {
    this.getProfile()
    
    this.socket.on('allianceMembersRefresh', () => {
      this.getProfile()
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('allianceMembersRefresh');
    
    if(this.subMembers) {
      this.subMembers.unsubscribe();
    }
    
    if(this.subProfile1) {
      this.subProfile1.unsubscribe();
      this.subProfile2.unsubscribe();
    }
  }
  
  getProfile() {
    let id = this.route.snapshot.paramMap.get('id');
    
    let url = this.socket.url+'/api/allianceProfile/'+id+'.json';
    
    if(id) {
      this.subMembers = this.http.get(url).subscribe((alli:any) => {
        if(alli) {
          this.allianceProfile = alli;
          
          this.subProfile1 = this.translate.get('Alliance profile').subscribe((res1: string) => {
            this.subProfile2 = this.translate.get(':').subscribe((res2: string) => {
              this.titleService.setTitle(res1+res2+' '+alli.alliance_name);
            });
          });
        }
      });
    }
  }
}
