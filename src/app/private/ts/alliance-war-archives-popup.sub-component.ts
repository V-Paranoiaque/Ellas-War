import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'alliance-war-archives-popup',
  templateUrl: '../html/alliance-war-archives-popup.sub-component.html'
})

export class AllianceWarArchivesPopup {
  
  @Input() info:any;
  
  public list:any;
  
  shieldShaded = shieldShaded;
  swordIcon = swordIcon;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.list = []
  }
  
  ngOnInit() {

    this.socket.on('myAllianceWarHistory', (data:any) => {
      this.list = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('myAllianceWarHistory');
  }
}
