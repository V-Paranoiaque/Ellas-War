import { Component } from '@angular/core';
import { UserComponent as User } from 'src/services/user.service';

@Component({
  selector: 'app-main-right',
  templateUrl: './main-right.sub-component.html',
})
export class MainRightSubComponent {
  constructor(public user: User) {}
}
