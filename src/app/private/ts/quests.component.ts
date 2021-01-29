import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/quests.component.html',
  styleUrls: ['../css/quests.component.css']
})

export class Quests {
  
  private myQuestList:any;
  
  constructor(private socket: Socket, public user: User) {
    
    this.socket.socket.on('myQuestList', (data:any) => {
      this.myQuestList = data;
    });
    this.socket.socket.on('myQuestListRefresh', () => {
      this.socket.emit('myQuestList');
    });
  }
  
  ngOnInit() {
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
  
  getMyQuestList() {
    return this.myQuestList;
  }
  
  myQuestValidate(id:number) {
    this.socket.emit('myQuestValidate', id);
  }
}
