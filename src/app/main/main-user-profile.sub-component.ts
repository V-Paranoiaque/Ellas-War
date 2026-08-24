import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './main-user-profile.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, RouterModule],
})
export class UserProfileSubComponent {
  @Input() id!: number | string;
  @Input() username!: string;
  @Input() status!: number | string;
}
