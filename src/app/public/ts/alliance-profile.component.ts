import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import userPlus from '@iconify/icons-fa-solid/user-plus';

@Component({
  templateUrl: '../html/alliance-profile.component.html'
})

export class AllianceProfile {
  
  allianceProfile:any;
  userPlus = userPlus;
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private socket: Socket, public user: User, public translate: TranslateService) {
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
    
    if(this.user.config.url) {
      let url = this.user.config.url+'/api/allianceProfile/'+id+'.json';
      
      this.http.get(url).subscribe((res:any) => {
        if(res) {
          this.allianceProfile = res;
        }
      });
    }
  }
}
