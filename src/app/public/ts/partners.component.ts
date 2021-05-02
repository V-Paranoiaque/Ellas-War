import { Component } from '@angular/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/partners.component.html'
})

export class Partners {

  constructor(public user: User) {
  }
}
