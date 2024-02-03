import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './main-user-profile.sub-component.html',
})
export class UserProfileSubComponent {
  @Input() id!: number | string;
  @Input() username!: string;
  @Input() status!: number | string;
}
