import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-defense-empty-popup',
  templateUrl: './defense-empty-popup.sub-component.html',
  imports: [TranslateModule],
})
export class DefenseEmptyPopupSubComponent {
  translate = inject(TranslateService);
}
