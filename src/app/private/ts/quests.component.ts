import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import questionCircle from '@iconify/icons-fa-regular/question-circle';
import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  templateUrl: '../html/quests.component.html',
  styleUrls: ['../css/quests.component.css']
})

export class QuestsComponent implements OnInit, OnDestroy {
  
  public altarConditionDivineunits:any;
  public altarConditionPrometheus:any;
  public altarConditionHestia:any;
  public altarConditionGaia:any;
  
  private myQuestList:any;
  public selectedQuest:any;
  public page:number=0;
  
  questionCircle = questionCircle;
  treasureChest = treasureChest;
  
  constructor(protected socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.on('myQuestList', (data) => {
      this.myQuestList = data;
    });
    this.socket.on('myQuestListRefresh', () => {
      this.socket.emit('myQuestList');
    });
    
    this.socket.emit('questCheck');
    this.socket.emit('statsTmp');
    this.socket.emit('myQuestList');
    
    this.socket.emit('altarConditionDivineunits');
    this.socket.emit('altarConditionPrometheus');
    this.socket.emit('altarConditionHestia');
    this.socket.emit('altarConditionGaia');
    
    this.socket.on('altarConditionDivineunits', (data) => {
      this.altarConditionDivineunits = data;
    });
    this.socket.on('altarConditionPrometheus', (data) => {
      this.altarConditionPrometheus = data;
    });
    this.socket.on('altarConditionHestia', (data) => {
      this.altarConditionHestia = data;
    });
    this.socket.on('altarConditionGaia', (data) => {
      this.altarConditionGaia = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('altarConditionDivineunits');
    this.socket.removeListener('altarConditionPrometheus');
    this.socket.removeListener('altarConditionHestia');
    this.socket.removeListener('altarConditionGaia');
    
    this.socket.removeListener('myQuestList');
    this.socket.removeListener('myQuestListRefresh');
  }
  
  getMyQuestList() {
    return this.myQuestList;
  }
  
  setPage(page:number) {
    this.page = page;
  }
}
