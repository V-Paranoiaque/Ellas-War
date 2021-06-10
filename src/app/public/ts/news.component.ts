import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/news.component.html'
})

export class News implements OnInit {
  private newsList:any;
  
  constructor(public user: User, private socket: Socket, private http: HttpClient) {
    this.newsList = [];
  }
  
  ngOnInit() {
    let url = this.socket.url+'/api/news.json';
    this.http.get(url).subscribe(res => {
      this.newsList = res;
    });
  }
  
  getNews() {
    return this.newsList;
  }
}
