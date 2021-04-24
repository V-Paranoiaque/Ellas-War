import { Component, Input } from '@angular/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'admin-left-menu',
  templateUrl: '../html/admin-left-menu.component.html'
})

export class AdminLeftMenu {
  
  @Input()
  active: string;
  
  constructor(public user: User) {
    this.active = '';
  }
}
