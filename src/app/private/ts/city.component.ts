import { Component, Output } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/city.component.html',
  styleUrls: ['../css/city.component.css']
})

export class City {

  @Output() public buildingInfo:any;

  constructor(private socket: Socket, public user: User) {
    //We set a default building to avoid errors
    this.buildingInfo = { code: 'mint' };
  }
  
  ngOnInit() {
    setTimeout(() => {

    }, 0);
  }
  
  selectBuilding(name:string) {
    this.buildingInfo = this.user.info.datas.building[name];
    this.buildingInfo.destruct = {};
    
    for(let res in this.buildingInfo.cost) {
      this.buildingInfo.destruct[res] = this.buildingInfo.cost[res]*0.6;
    }
  }
}
