import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/alliance-members.component.html'
})

export class AllianceMembers {
  
  allianceMembers:any;
  allianceProfile:any;
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private socket: Socket, public user: User, public translate: TranslateService) {
    this.allianceMembers = [];
    this.allianceProfile = '';
  }
  
  ngOnInit() {
    this.getMembers();
    this.getProfile()
    
    this.socket.on('allianceMembersRefresh', () => {
      this.getProfile()
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('allianceMembersRefresh');
  }
  
  getMembers() {
    let id = this.route.snapshot.paramMap.get('id');
    
    if(this.user.config.url) {
      let url = this.user.config.url+'/api/allianceMembers/'+id+'.json';
      
      this.http.get(url).subscribe((res:any) => {
        if(res) {
          this.allianceMembers = res;
        }
      });
    }
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
