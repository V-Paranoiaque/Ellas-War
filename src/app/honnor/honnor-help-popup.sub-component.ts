import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SocketComponent as Socket } from '../../services/socketio.service';

@Component({
  selector: 'app-honnor-help-popup',
  templateUrl: './honnor-help-popup.sub-component.html',
})
export class HonnorHelpPopupSubComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public list: {
    id: number;
    player_id: number;
    username: string;
    honnor: number;
  }[] = [];

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    const url = this.socket.url + '/api/historyHonnor.json';

    this.sub = this.http.get(url).subscribe(result => {
      this.list = result as typeof this.list;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
