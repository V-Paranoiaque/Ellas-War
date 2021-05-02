import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';

@Component({
  templateUrl: '../html/connectedplayers.component.html'
})

export class ConnectedPlayers {
  
  public connected:any;
  
  constructor(private http: HttpClient, private socket: Socket, 
              public translate: TranslateService) {
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
    let url:string;
   
    url = environment.SOCKET_ENDPOINT+'/api/connected.json';
    
    this.http.get(url).subscribe((result:any) => {
      this.connected = result;
    });
  }
  
}
