import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserComponent as User } from '../../../services/user.service';

import facebookIcon from '@iconify-icons/logos/facebook';
import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  selector: 'app-quests-missions',
  templateUrl: '../html/quests-missions.sub-component.html',
  styleUrls: ['../css/quests-missions.sub-component.css']
})

export class QuestsMissionsSubComponent implements OnInit, OnDestroy {
  public localevars:any;
  private sub:Subscription;
  
  facebookIcon = facebookIcon;
  questionCircle = questionCircle;
  
  constructor(private socket: Socket, public user: User,
              private http: HttpClient, public translate: TranslateService) {
    this.localevars = {}
    this.sub = new Subscription();
  }
  
  ngOnInit() {
    this.sub = this.http.get('./assets/i18n/'+this.translate.currentLang+'/localevars.json').subscribe((data:any) =>{
      this.localevars = data;
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
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
    this.socket.emit('questValidate');
  }
}
