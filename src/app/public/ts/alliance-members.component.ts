import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: '../html/alliance-members.component.html'
})

export class AllianceMembersComponent implements OnInit, OnDestroy {
  
  public allianceMembers:any;
  public allianceProfile:any;
  
  private subMembers:Subscription;
  private subProfile:Subscription;
  private subTitle:Subscription;
  
  constructor(public http: HttpClient, private route: ActivatedRoute,
              private socket: Socket, public user: User,
              private titleService: Title, public translate: TranslateService) {
    this.allianceMembers = [];
    this.allianceProfile = '';
    this.subMembers = new Subscription();
    this.subProfile = new Subscription();
    this.subTitle = new Subscription();
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
    this.subMembers.unsubscribe();
    this.subProfile.unsubscribe();
    
    if(this.subTitle) {
      this.subTitle.unsubscribe();
    }
  }
  
  getMembers() {
    let id = this.route.snapshot.paramMap.get('id');
    
    let url = this.socket.url+'/api/allianceMembers/'+id+'.json';
    
    this.subMembers = this.http.get(url).subscribe((res) => {
      if(res) {
        this.allianceMembers = res as typeof this.allianceMembers;
      }
    });
  }
  
  getProfile() {
    let id = this.route.snapshot.paramMap.get('id');
    
    let url = this.socket.url+'/api/allianceProfile/'+id+'.json';
    
    this.subProfile = this.http.get(url).subscribe((alli) => {
      if(alli) {
        this.allianceProfile = alli as typeof this.allianceProfile;
        
        this.subTitle = this.translate.get('Alliance members:').subscribe((res: string) => {
          this.titleService.setTitle(res+' '+this.allianceProfile.alliance_name);
        });
      }
    });
  }
}
