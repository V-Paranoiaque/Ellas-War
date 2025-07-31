import { Component, inject } from '@angular/core';
import { UserComponent as User } from 'src/services/user.service';
import { TranslateModule } from '@ngx-translate/core';

import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';
import { MainPrivateRightMenuSubComponent } from '../main-private/main-private-right-menu.sub-component';
import { MainPublicBottomMenuSubComponent } from '../main-public/main-public-bottom-menu.sub-component';

@Component({
  selector: 'app-main-right',
  templateUrl: './main-right.sub-component.html',
  imports: [
    MainPrivateBottomMenuSubComponent,
    MainPrivateRightMenuSubComponent,
    MainPublicBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class MainRightSubComponent {
  user = inject(User);
}
