import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import facebookIcon from '@iconify-icons/logos/facebook';

@Component({
  selector: 'quests-missions',
  templateUrl: '../html/quests-missions.sub-component.html',
  styleUrls: ['../css/quests-missions.sub-component.css']
})

export class QuestsMissions {
  public localevars:any;
  
  facebookIcon = facebookIcon;
  
  constructor(private socket: Socket, public user: User,
              private http: HttpClient, public translate: TranslateService) {
    this.localevars = {}
  }
  
  ngOnInit() {
    this.http.get('./assets/i18n/'+this.translate.currentLang+'/localevars.json').subscribe(data =>{
      this.localevars = data;
    });
    
  }
  
  getDefenseCurrent() {
    let def = 0;
    
    for(let i in this.user.info.datas.army) {
      if(this.user.info.datas.army[i].defense) {
        def += this.user.getPropertyNb(i)*this.user.info.datas.army[i].defense;
      }
    }
    for(let i in this.user.info.datas.building) {
      if(this.user.info.datas.building[i].defense && this.user.info.datas.building[i].type == 2) {
        def += this.user.getPropertyNb(i)*this.user.info.datas.building[i].defense;
      }
    }
    
    return def;
  }
  
  questValidate() {
    this.socket.emit("questValidate");
  }
}
