import { Component } from '@angular/core';

import { UserComponent as User } from 'src/services/user.service';

import fileLines from '@iconify/icons-fa6-regular/file-lines';

@Component({
  selector: 'app-admin-left-menu',
  templateUrl: './admin-left-menu.sub-component.html',
  styleUrls: ['../main-private/main-private.component.css', './admin.component.css'],
})
export class AdminLeftMenuSubComponent {
  fileLines = fileLines;
  constructor(public user: User) { }
}
