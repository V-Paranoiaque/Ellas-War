import { Component } from '@angular/core';

import { UserComponent as User } from 'src/services/user.service';

@Component({
  selector: 'app-admin-left-menu',
  templateUrl: './admin-left-menu.sub-component.html',
  styleUrls: ['../main-private/main-private.component.css'],
})
export class AdminLeftMenuSubComponent {
  constructor(public user: User) {}
}
