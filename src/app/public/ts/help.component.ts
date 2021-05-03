import { Component } from '@angular/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/help.component.html',
  styleUrls: ['../css/help.component.css']
})

export class Help {

  constructor(public user: User) {
  }
}
