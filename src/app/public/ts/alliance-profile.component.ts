import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';
import { Title } from '@angular/platform-browser';

import userPlus from '@iconify/icons-fa-solid/user-plus';

@Component({
  templateUrl: '../html/alliance-profile.component.html'
})

export class AllianceProfile {
  
  allianceProfile:any;
  userPlus = userPlus;
  
  constructor(private http: HttpClient, private route: ActivatedRoute,
              private socket: Socket, public user: User,
              private titleService: Title, public translate: TranslateService) {
    this.allianceProfile = {};
  }
  
  ngOnInit() {
    this.getProfile()
    
    this.socket.on('allianceMembersRefresh', () => {
      this.getProfile()
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('allianceMembersRefresh');
  }
  
  getProfile() {
    let id = this.route.snapshot.paramMap.get('id');
    
    let url = this.socket.url+'/api/allianceProfile/'+id+'.json';
    
    this.http.get(url).subscribe((alli:any) => {
      if(alli) {
        this.allianceProfile = alli;
        
        this.translate.get('Alliance profile').subscribe((res1: string) => {
          this.translate.get(':').subscribe((res2: string) => {
            this.titleService.setTitle(res1+res2+alli.alliance_name);
          });
        });
      }
    });
  }
}
