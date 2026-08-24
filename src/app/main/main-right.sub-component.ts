import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';

import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';
import { MainPrivateRightMenuSubComponent } from '../main-private/main-private-right-menu.sub-component';
import { MainPublicBottomMenuSubComponent } from '../main-public/main-public-bottom-menu.sub-component';

@Component({
  selector: 'app-main-right',
  templateUrl: './main-right.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MainPrivateBottomMenuSubComponent,
    MainPrivateRightMenuSubComponent,
    MainPublicBottomMenuSubComponent,
  ],
})
export class MainRightSubComponent {
  user = inject(User);
}
