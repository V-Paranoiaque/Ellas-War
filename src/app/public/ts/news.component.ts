import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/news.component.html'
})

export class News implements OnInit {
  private newsList:any;
  
  constructor(public user: User, private http: HttpClient) {
    this.newsList = [];
  }
  
  ngOnInit() {
    if(this.user.config.url) {
      let url = this.user.config.url+'/api/news.json';
      this.http.get(url).subscribe(res => {
        this.newsList = res;
      });
    }
  }
  
  getNews() {
    return this.newsList;
  }
}
