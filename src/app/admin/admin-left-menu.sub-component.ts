import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { UserComponent as User } from 'src/services/user.service';
import { TranslateModule } from '@ngx-translate/core';

import { IcIconComponent } from 'src/services/ic-icon.service';

import fileLines from '@iconify/icons-fa6-regular/file-lines';

@Component({
  selector: 'app-admin-left-menu',
  templateUrl: './admin-left-menu.sub-component.html',
  styleUrls: [
    '../main-private/main-private.component.css',
    './admin.component.css',
  ],
  imports: [IcIconComponent, RouterModule, TranslateModule],
})
export class AdminLeftMenuSubComponent {
  fileLines = fileLines;
  constructor(public user: User) {}
}
