import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-pact-ask-popup',
  templateUrl: '../html/alliance-pact-ask-popup.sub-component.html'
})

export class AlliancePactAskPopupSubComponent implements OnInit, OnDestroy {
  
  @Input() info:any;
  
  public myAllianceProfile:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.socket.emit('myAllianceProfile');
    
    this.socket.on('myAllianceProfile', (data:any) => {
      this.myAllianceProfile = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('myAllianceProfile');
  }
  
  pactAsk() {
    this.socket.emit('alliancePactAsk', this.info.alliance_id);
  }
  pactPossible() {
    if(this.user.getPropertyNb('alliance') == this.info.alliance_id) {
      return false;
    }
    
    if(!this.myAllianceProfile || this.myAllianceProfile['stock_drachma'] < 750000) {
      return false;
    }
    
    return true;
  }
}
