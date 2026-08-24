import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';

import { MainPrivateLeftMenuSubComponent } from '../main-private/main-private-left-menu.sub-component';
import { MainPublicTopMenuSubComponent } from '../main-public/main-public-top-menu.sub-component';

@Component({
  selector: 'app-main-left',
  templateUrl: './main-left.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MainPrivateLeftMenuSubComponent, MainPublicTopMenuSubComponent],
})
export class MainLeftSubComponent {
  user = inject(User);
}
