import { Component, inject } from '@angular/core';
import { UserComponent as User } from 'src/services/user.service';
import { TranslateModule } from '@ngx-translate/core';

import { MainPrivateLeftMenuSubComponent } from '../main-private/main-private-left-menu.sub-component';
import { MainPublicTopMenuSubComponent } from '../main-public/main-public-top-menu.sub-component';

@Component({
  selector: 'app-main-left',
  templateUrl: './main-left.sub-component.html',
  imports: [
    MainPrivateLeftMenuSubComponent,
    MainPublicTopMenuSubComponent,
    TranslateModule,
  ],
})
export class MainLeftSubComponent {
  user = inject(User);
}
