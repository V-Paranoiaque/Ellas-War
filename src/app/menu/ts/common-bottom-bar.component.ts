import { Component } from '@angular/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'common-bottom-bar',
  templateUrl: '../html/common-bottom-bar.component.html'
})

export class CommonBottomBar {

  constructor(public user: User) {
  }
}
