import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/connectedplayers.component.html'
})

export class ConnectedPlayers {
  
  public connected:any;
  
  constructor(public user: User, private http: HttpClient, private socket: Socket, 
              public translate: TranslateService, private titleService: Title) {
    this.connected = [];
  }
  
  ngOnInit() {
    this.getPage();
    
    this.socket.on('chatUserPlayersRefresh', () => {
      this.getPage();
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('chatUserPlayersRefresh');
  }
  
  getPage() {
    if(this.user.config.url) {
      let url = this.user.config.url+'/api/connected.json';
      
      this.http.get(url).subscribe((result:any) => {
        this.connected = result;
      });
      this.translate.get('Connected players on the Ancient Greece').subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    }
  }
  
}


