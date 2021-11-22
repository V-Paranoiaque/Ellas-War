import { Component, OnInit, OnDestroy  } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-archives-popup',
  templateUrl: '../html/alliance-archives-popup.sub-component.html'
})

export class AllianceArchivesPopupSubComponent implements OnInit, OnDestroy {
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
