import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-pact-manage-popup',
  templateUrl: '../html/alliance-pact-manage-popup.sub-component.html'
})

export class AlliancePactManagePopupSubComponent implements OnInit, OnDestroy {
  
  @Input() info:any;
  
  public alliancePactInfo:any;
  public myAllianceProfile:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.alliancePactInfo = {};
  }
  
  ngOnInit() {
    this.socket.emit('myAllianceProfile');
    
    this.socket.on('myAllianceProfile', (data) => {
      this.myAllianceProfile = data as typeof this.myAllianceProfile;
    });
    this.socket.on('alliancePactInfo', (data) => {
      this.alliancePactInfo = data as typeof this.alliancePactInfo;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('alliancePactInfo');
    this.socket.removeListener('myAllianceProfile');
  }
  
  pactAccept() {
    this.socket.emit('alliancePactAccept', this.info.pact_id);
  }
  
  pactBreak() {
    this.socket.emit('alliancePactBreak', this.info.pact_id);
  }
  
  pactPossible() {
    if(this.user.getPropertyNb('alliance') == this.info.alliance_id) {
      return false;
    }
    
    if(!this.myAllianceProfile || this.myAllianceProfile['stock_drachma'] < 250000) {
      return false;
    }
    
    return true;
  }
  
  pactRefuse() {
    this.socket.emit('alliancePactRefuse', this.info.pact_id);
  }
}
