import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Component({
  templateUrl: '../html/news.component.html'
})

export class News implements OnInit {
  private _newsUrl = environment.SOCKET_ENDPOINT+'/api/news.json';
  private newsList:any;
  
  constructor(private http: HttpClient) {
    this.newsList = [];
  }
  
  ngOnInit() {
    this.http.get(this._newsUrl)
      .subscribe(res => {
        this.newsList = res;
      });
  }
  
  getNews() {
    return this.newsList;
  }
};
