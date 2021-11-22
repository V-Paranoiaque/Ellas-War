import { Component, Input } from '@angular/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-admin-left-menu',
  templateUrl: '../html/admin-left-menu.component.html'
})

export class AdminLeftMenuComponent {
  
  @Input()
  active: string;
  
  constructor(public user: User) {
    this.active = '';
  }
}
