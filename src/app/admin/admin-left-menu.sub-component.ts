import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import { TranslateDirective } from '@ngx-translate/core';

import { IcIconComponent } from '../../services/ic-icon.service';

import fileLines from '@iconify/icons-fa6-regular/file-lines';

@Component({
  selector: 'app-admin-left-menu',
  templateUrl: './admin-left-menu.sub-component.html',
  styleUrls: [
    '../main-private/main-private.component.css',
    './admin.component.css',
  ],
  imports: [IcIconComponent, RouterModule, TranslateDirective],
})
export class AdminLeftMenuSubComponent {
  user = inject(User);

  fileLines = fileLines;
}
