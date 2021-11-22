import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-taxes-popup',
  templateUrl: '../html/alliance-taxes-popup.sub-component.html'
})

export class AllianceTaxesPopupSubComponent implements OnInit, OnDestroy {
  
  @Input() taxes:any;
  
  public level_min:number;
  public myAllianceProfile:any;
  public ressList:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.level_min = 0;
    this.myAllianceProfile = {};
    this.ressList = environment.resources;
  }
  
  ngOnInit() {
    this.socket.emit('myAllianceProfile');
    
    this.socket.on('myAllianceProfile', (data:any) => {
      this.myAllianceProfile = data;
      this.level_min = data.fee_min;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('myAllianceProfile');
  }
  
  getMax(res:any) {
    return this.user.info.datas.alliance.ress[res];
  }
  
  saveTaxes() {
    let ress = {
      'lvlmin': this.level_min,
      'drachma': this.taxes.drachma,
      'food': this.taxes.food,
      'water': this.taxes.water,
      'wood': this.taxes.wood,
      'stone': this.taxes.stone,
      'iron': this.taxes.iron,
      'marble': this.taxes.marble,
      'grapes': this.taxes.grapes,
      'wine': this.taxes.wine,
      'gold': this.taxes.gold
    };
    this.socket.emit('myAllianceTax', ress);
  }
}
