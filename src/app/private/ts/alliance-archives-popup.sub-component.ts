import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'alliance-archives-popup',
  templateUrl: '../html/alliance-archives-popup.sub-component.html'
})

export class AllianceArchivesPopup {
  public archiveCurrent:number;
  public archivePages:number;
  public archiveList:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.archiveCurrent = 1;
    this.archivePages = 1;
    this.archiveList = [];
  }
  
  ngOnInit() {
    this.socket.emit('archivePage');
    this.socket.emit('archiveList', this.archiveCurrent);
    
    this.socket.on('archiveList', (data:any) => {
      this.archiveList = data;
    });
    this.socket.on('archivePage', (data:number) => {
      this.archivePages = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('archiveList');
    this.socket.removeListener('archivePage');
  }
}
