import { Component } from '@angular/core';
import { UserComponent as User } from 'src/services/user.service';

@Component({
  selector: 'app-main-left',
  templateUrl: './main-left.sub-component.html',
})
export class MainLeftSubComponent {
  constructor(public user: User) {}
}
