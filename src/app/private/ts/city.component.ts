import { Component } from '@angular/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/city.component.html',
  styleUrls: ['../css/city.component.css']
})

export class City {
  constructor(public user: User) {
    
  }
}
