import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-defense-empty-popup',
  templateUrl: './defense-empty-popup.sub-component.html',
})
export class DefenseEmptyPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
