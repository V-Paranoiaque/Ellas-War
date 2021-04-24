import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  templateUrl: '../html/quests.component.html',
  styleUrls: ['../css/quests.component.css']
})

export class Quests {
  
  private myQuestList:any;
  public selectedQuest:any;
  
  treasureChest = treasureChest;
  
  constructor(protected socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
    
    this.socket.on('myQuestList', (data:any) => {
      this.myQuestList = data;
    });
    this.socket.on('myQuestListRefresh', () => {
      this.socket.emit('myQuestList');
    });
    
    setTimeout(()=> {
      this.socket.emit("questCheck");
      this.socket.emit("statsTmp");
      this.socket.emit('myQuestList');
      
      this.socket.emit("altarConditionDivineunits");
      this.socket.emit("altarConditionPrometheus");
      this.socket.emit("altarConditionHestia");
      this.socket.emit("altarConditionGaia");
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('myQuestList');
    this.socket.removeListener('myQuestListRefresh');
  }
  
  getMyQuestList() {
    return this.myQuestList;
  }
}
